require('dotenv').config();
const express= require('express'),
    session = require('express-session'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0'),
    students = require('../students.json');



const app = express();
app.use(express.static(`${__dirname}/../public/build`));

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL
} = process.env;

app.use(session(
{
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use( new Auth0Strategy(
{
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: '/login',
    scope: "openid email profile"
}, function(accessToken, refreshToken, extraParams, profile, done)
{
    done(null, profile);
}));

passport.serializeUser( (user, done) =>
{
    done(null, { clientID: user.id, email: user._json.email, name: user._json.name });
});
passport.deserializeUser( (obj, done) =>
{
    done(null, obj);
});

app.get('/login', passport.authenticate('auth0', 
{
    successRedirect: '/students', failureRedirect: '/login', connection: 'github'
}));

function authenticated(req, res, next)
{
    if (req.user)
    {
        next();
    }
    else
    {
        res.sendStatus(401);
    }
}

app.get('/students', (req, res, next) => 
{
    res.status(200).send(students);
});




app.listen(SERVER_PORT, () => console.log(`Listeny McListenerson on port: ${SERVER_PORT}`));