import "dotenv/config";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
    apiKey: process.env.EMAIL_API_KEY,
});

const sentFrom = new Sender("test-65qngkd2r8wlwr12.mlsender.net", "Temp email");

// const recipients = [new Recipient("esc72009@gmail.com", "Bok Choi"), new Recipient("kevinboriboonsomsin@gmail.com", "Kevin")];
const recipients = [new Recipient("kevinboriboonsomsin@gmail.com", "Kevin")];

const emailParams = new EmailParams()
						.setFrom(sentFrom)
						.setTo(recipients)
						.setReplyTo(sentFrom)
						.setSubject("Discussion on Tires")
						.setHtml("<strong> Hi Elliot, do you want to know more abou tires? Just let me know, I can go in-depth about tires, tires, and tires. </strong>")
						.setText("Hi Elliot, do you want to know more abou tires? Just let me know, I can go in-depth about tires, tires, and tires.");

await mailerSend.email.send(emailParams);