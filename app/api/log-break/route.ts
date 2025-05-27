import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, LogType } from '@prisma/client';
import { google } from 'googleapis';
import path from 'path';
import { promises as fs } from 'fs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { employeeEmail, type } = await req.json();

    const employee = await prisma.employee.findUnique({
      where: { email: employeeEmail },
    });

    if (!employee) {
      return NextResponse.json({ message: 'Employee not found' }, { status: 404 });
    }

    // Step 1: Log to database
    const log = await prisma.log.create({
      data: {
        employeeId: employee.id,
        type: type as LogType,
      },
    });

    // Step 2: Append to Google Sheet
    const filePath = path.join(process.cwd(), 'google-service-account.json');
    const content = await fs.readFile(filePath, 'utf8');
    const credentials = JSON.parse(content);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = '1p9-EZim2g6kfGPPo02Pvi_ZYmKF2DDCKMwCsLIzyUl4';
    const range = 'Sheet1!A1';
    const valueInputOption = 'RAW';

    const resource = {
      values: [[employee.email, type, new Date().toLocaleString()]],
    };

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption,
      requestBody: resource,
    });

    return NextResponse.json({ message: 'Break logged and synced to sheet' });
  } catch (error) {
    console.error('log-break error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
