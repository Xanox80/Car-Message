import { Module } from '@nestjs/common';
import { GoogleSheetsService } from './googleSheet.servise';

@Module({
  providers: [GoogleSheetsService],
  exports: [GoogleSheetsService], // Exporting the service for use in other modules
})
export class GoogleSheetsModule {}
