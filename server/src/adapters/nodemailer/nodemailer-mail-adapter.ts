import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c7e097095e4dad",
    pass: "feceb7e43077b3",
  },
});

export class NodeMailerAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <teste@teste.com>",
      to: "Leandro <leeandro319@gmail.com>",
      subject,
      html: body,
    });
  }
}
