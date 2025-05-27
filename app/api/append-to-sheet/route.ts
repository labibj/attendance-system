import { google } from 'googleapis';
import path from 'path';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

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
      values: [[body.name, body.email, body.message]],
    };

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption,
      requestBody: resource,
    });

    return NextResponse.json({ message: 'Success', data: response.data });
  } catch (error) {
    console.error('Google Sheets Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
