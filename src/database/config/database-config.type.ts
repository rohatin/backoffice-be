export type DatabaseConfig = {
  url?: string
  host?: string
  port?: number
  password?: string
  name?: string
  username?: string
  maxConnections: number
  sslEnabled?: boolean
  rejectUnauthorized?: boolean
  ca?: string
  key?: string
  cert?: string
}
