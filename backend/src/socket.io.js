
module.exports = io => {
    io.on("connection", socket => {
        console.log("User connected to socket server");

        /* Escuchamos el evento socket */

        socket.on("joinRoom", (room) => {
            socket.join(room);
            console.log(`User joined room: ${room}`);
        });

        socket.on("newOrder", async data => {
            // Lógica para nueva orden
            io.to('kitchen').emit('newOrder', data);
            io.to('admin').emit('newOrder', data);
        });

        socket.on("orderUpdated", async data => {
            // Lógica para orden actualizada
            io.to('waiter').emit('orderUpdated', data);
            io.to('delivery').emit('orderUpdated', data);
        });

        socket.on("notification", async data => {
            // Lógica para notificación
            io.to(data.userId).emit('notification', data);
        });

        /* Emitir eventos */

        io.to(socket.id).emit("feedback", "string o variable"); //Evento dirigído a un socket específico

        io.emit("feedback", "string o variable"); //Evento dirigído a todos los sockets conectados

        socket.broadcast.emit("hello", "string o variable"); //Evento dirigído a todos los sockets a esepción del emisor

        /* Recibimos el evento cuando el usuario cierra secion*/

        socket.on("disconnect", () => {
            console.log("User disconnected to socket server");
        });
    });
};
