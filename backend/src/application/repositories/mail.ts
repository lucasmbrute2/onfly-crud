export interface MailProps {
  to: string
  subject: string
  context: {
    [name: string]: string
  }
}

export interface Mail {
  sendMail(mailData: MailProps): Promise<void>
}
