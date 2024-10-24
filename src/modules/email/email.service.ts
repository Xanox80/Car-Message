import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Ваш Gmail
        pass: process.env.GMAIL_PASSWORD, // Пароль або app password
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
