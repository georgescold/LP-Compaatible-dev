/**
 * Generate a short, URL-friendly share token (10 alphanumeric characters)
 */
export function generateShareToken(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 10; i++) {
    token += chars[Math.floor(Math.random() * chars.length)]
  }
  return token
}
