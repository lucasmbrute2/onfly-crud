import { Transporter, createTransport } from 'nodemailer'
import { Mail, MailProps } from '../mail'
import { env } from '../../env'
import { readFileSync } from 'fs'
import Handlebars from 'handlebars'
import { injectable } from 'tsyringe'
import { resolve } from 'path'

@injectable()
export class NodeMailerAdapter implements Mail {
  public readonly client: Transporter

  constructor() {
    this.client = createTransport({
      host: env.MAIL_PORT,
      from: env.MAIL_HOST,
      auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASSWORD,
      },
    })
  }

  async sendMail({ context, subject, to }: MailProps): Promise<void> {
    const path = resolve(__dirname, '..', 'views', 'emails', 'expend.hbs')
    const templateFileContent = readFileSync(path).toString('utf-8')
    const templateParse = Handlebars.compile(templateFileContent)
    const templateHTML = templateParse(context)

    await this.client.sendMail({
      html: templateHTML,
      to,
      subject,
      from: env.MAIL_HOST,
    })
  }
}
