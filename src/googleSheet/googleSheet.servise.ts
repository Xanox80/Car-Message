import { Injectable } from '@nestjs/common';
import { google, sheets_v4 } from 'googleapis';

@Injectable()
export class GoogleSheetsService {
  private sheets: sheets_v4.Sheets;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: `${process.cwd()}/sheets.json`, // Шлях до вашого файлу ключа
      scopes: ['https://www.googleapis.com/auth/spreadsheets'], // Вірний scope
    });

    this.sheets = google.sheets({ version: 'v4', auth });
  }

  // async appendData(spreadsheetId: string, range: string, values: any[][]) {
  //   // Використовуємо правильний формат для діапазону
  //   const requestRange = {
  //     spreadsheetId,
  //     range: {
  //       sheetId: '1ZLQuwVzs3E6uloI2t3JL2pdls0oCu1TigUc6wSSB-vo', // ID вашого аркуша
  //       startRowIndex: 1, // Початковий рядок (0-based)
  //       endRowIndex: 1, // Кінцевий рядок (0-based), але виключно
  //       startColumnIndex: 2, // Початковий стовпець (0-based)
  //       endColumnIndex: 3, // Кінцевий стовпець (0-based), але виключно
  //     },
  //     valueInputOption: 'ROW', // Використовуємо 'RAW', щоб уникнути перетворень
  //     insertDataOption: 'INSERT_ROWS', // Вставка нових рядків
  //     requestBody: {
  //       values,
  //     },
  //   };
  // }
  async appendData(spreadsheetId: string, range: string, values: any[][]) {
    try {
      await this.sheets.spreadsheets.values.append({
        spreadsheetId,
        range, // Наприклад, 'Sheet1!A1'
        valueInputOption: 'RAW', // Використовується, щоб зберегти дані "як є"
        insertDataOption: 'INSERT_ROWS', // Вставка нових рядків
        requestBody: {
          values,
        },
      });
      console.log('Діапазон для запису:', range);

      console.log('Дані успішно додані до Google Sheets');
    } catch (error) {
      console.error('Помилка при додаванні даних у Google Sheets:', error);
      throw error; // Передати помилку далі, якщо це необхідно
    }
  }
}
