export function dateToAmerican(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  return date.toLocaleTimeString('en-US', options)
}
