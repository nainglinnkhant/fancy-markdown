import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const generateUsernameInitials = (username: string) => {
  if (!username.includes('_')) return username.slice(0, 2).toUpperCase()

  const [firstName, lastName] = username.toUpperCase().split('_')
  return `${firstName[0]}${lastName[0]}`
}
