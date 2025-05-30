import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, LogType } from '@prisma/client';
import { google } from 'googleapis';

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

    // Step 2: Append to Google Sheet using service account
    const rawCredentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT as string);

    // Fix the escaped newlines in the private key
    rawCredentials.private_key = rawCredentials.private_key.replace(/\\n/g, '\n');

    const auth = new google.auth.GoogleAuth({
      credentials: rawCredentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = process.env.SPREADSHEET_ID;
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
