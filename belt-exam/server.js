const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const http = require('http');
const logger = require('morgan');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 8000;
const sessionConfig = {
  saveUninitialized: true,
  secret: 'sessionsecret',
  resave: false,
  name: 'session',
  rolling: true,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 3600000
  }
};

require('./server/config/database');

const server = http.createServer(app)
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(session(sessionConfig));
app.use(logger('dev'));
app.use(cookieParser('marcoismasterkey'));
app.use(function (request, response, next) {
  console.log(`incoming request for ${request.url}`);

  next();
})
app.use(express.static(path.resolve('dist/public'))); //ng build
app.use('/api', require('./server/routes'));
// use this code 맨 아래
app.use(require('./server/routes/catch-all.route'));




app.listen(port, () => console.log(`Express server listening on port ${port}`));
