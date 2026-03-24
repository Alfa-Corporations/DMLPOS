
const app = require("./app");
const http = require("http");
const swaggerDocs = require("../swagger");
const socketIO = require("socket.io");

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*"
  }
});

require("dotenv").config();
require("./socket.io")(io);

app.set("io", io);

const PORT = process.env.PORT || 8000;

swaggerDocs(app, PORT);

// 404 JSON fallback (después de Swagger y rutas definidas)
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: 'Recurso no encontrado',
    path: req.originalUrl,
  });
});

server.listen(PORT, () => {
  console.log("servidor corriendo");
});
