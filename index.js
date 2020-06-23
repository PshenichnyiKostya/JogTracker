const express = require('express')
const mongoose = require('mongoose')
const passport = require("passport");
const configurePassport = require("./middlewares/passport")
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cors = require("cors")
const path = require('path')
// const logger = require("morgan")
const authRouter = require('./routes/authRouter')
const jogRouter = require('./routes/jogRouter')

configurePassport(passport)
const app = express()

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });
app.use(bodyParser.json());
app.use(passport.initialize());
// app.use(logger('dev'));
app.use(cors());
app.use('/v1/auth/', authRouter)
app.use('/v1/data/jog/', jogRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        req.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function start() {
    try {
        await mongoose.connect("mongodb+srv://kostya:123@jog-4efdr.mongodb.net/jog?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        app.listen(process.env.PORT || 5000), () => console.log('Server start')

    } catch (e) {
        console.error(e.message)
        process.exit(1)
    }
}

start()

