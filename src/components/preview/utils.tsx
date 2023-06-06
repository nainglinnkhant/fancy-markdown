export const generateUsernameInitials = (username: string) => {
  if (!username.includes('_')) return username.slice(0, 2)

  const [firstName, lastName] = username.split('_')
  return `${firstName[0]}${lastName[0]}`
}
