import type http from 'http'

interface IServerParams {
  port?: number
  host?: string
}

export interface ISocketServer {
  connect: (server: http.Server, { port, host }: IServerParams) => void
}
