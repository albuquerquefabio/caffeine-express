import { Server, Socket } from 'socket.io'
import { ISocketServer } from '../types/socket.type'

const socketRegister = (socket: Socket) => {
  socket.on('ping', (payload) => {
    console.log(`Ping at ${new Date().toISOString()}`, payload)
    socket.emit('pong', { pong: `Pong at ${new Date().toISOString()}` })
  })
}
export let io: Server

export const socketServer: ISocketServer = {
  connect: (server, { port = 3000, host = 'localhost' }) => {
    const IO = new Server(server)

    // TODO TASKS
    // Redis references of adpater and emitter
    // https://socket.io/docs/v4/redis-adapter/

    // Allows sending packets to the connected clients from another Node.js process
    // Set Redis emitter at object io -> @socket.io/redis-emitter
    // socketServer.io = Emitter goes here

    // Sent from clients to all matching clients connected to the current server
    // Set Redis Adapter @socket.io/redis-adapter
    // IO.adapter(createAdapter(Redis, Redis.duplicate()))

    io = IO

    IO.on('connection', (socket) => {
      socketRegister(socket)

      console.log(`Socket connected on http://${host}:${port}`)
      const count = IO.of('/').sockets.size
      console.log('Socket-> total clients', count)

      socket.on('disconnect', async () => {
        const count = IO.of('/').sockets.size
        console.log('Socket-> disconnect')
        console.log('Socket-> total clients', count)
      })
    })
  }
}
