export type BanUserDTO = {
  userId: number
  expiresAt: Date
  reason?: string
}
