require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const auth = require('authController');
const authCtrl = require('./controllers/authController')
const treasureCtrl = require('./controllers/treasureControllers')
const auth = require('./middleware/authMiddleWare')

const PORT = 4000;

const { SESSION_SECRECT, CONNECTION_STRING } = process.env;

const app = express()

app.use(express.json());
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.post('/auth/logout', authCtrl.logout);

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure);
app.get('/api/treasure/user', treasureCtrl.getUserTreasure);
app.get('/api/treasure/user', auth.userOnly, treasureCtrl.getUserTreasure);

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected')
});

app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRECT,

    })
);

app.listen(PORT, ()=> console.log(`Listing on port ${PORT}`))