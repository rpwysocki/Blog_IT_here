const path = require('path');
const session = require('express-session');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars
const hbs = exphbs.create({  });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Load sessions
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true },
  store: new SequelizeStore({
    db: sequelize
  })
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Load Routes
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App is up and listening on ${PORT}`));
  });