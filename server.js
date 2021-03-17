require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.emit('pronto');
  })
  .catch((e) => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');

const csrf = require('csurf');
const { global, checkCsrfError, applyCsrf } = require('./src/middlewares/global');

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
  secret: 'asdasdasdadasdasda',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(global);
app.use(checkCsrfError);
app.use(applyCsrf);
app.use(routes);

app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('Server On Air: http://localhost:3000');
  });
});
