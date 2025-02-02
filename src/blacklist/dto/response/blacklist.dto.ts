export type BlacklistDTO = {
  id: number
  userId: number
  expiresAt: Date
  reason?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
