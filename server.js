require('dotenv').config()
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const helmet = require('helmet')
const compression = require('compression')
const session = require('express-session')
const connectSessionKnex = require('connect-session-knex')
const app = express()
const port = process.env.NODE_LOCAL_PORT || 7000
const isProd = process.env.NODE_ENV === 'production'
const KnexSessionStore = connectSessionKnex(session)
// const { createHttpTerminator } = require('http-terminator')

const apiRoutes = require('./routes/api')
const pageRoutes = require('./routes/pages')

const { knex } = require('./connections/db')

if (isProd) {
    app.use(compression())
}

app.set('port', port)
app.set('trust proxy', 1) // trust first proxy
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(helmet())

app.use(
    session({
        secret: 'akshay_login_app',
        resave: false,
        saveUninitialized: false,
        name: 'login_session_track',
        cookie: { secure: false, maxAge: 86400000 },
        store: new KnexSessionStore({
            knex,
            tablename: 'sessions', // optional. Defaults to 'sessions'
            createtable: true,
        }),
    })
)

app.disable('x-powered-by')

// eslint-disable-next-line no-unused-vars
app.get('/health', (_req, res, _next) => {
    return res.status(200).json({ message: 'All good' })
})

app.use('/api', apiRoutes)
app.use(pageRoutes)

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
    if (req.isApiError) {
        res.status(err.status || 500).json({
            message: err.message || 'Something went wrong',
        })
    } else {
        res.render(`error`)
    }
})

const server = app.listen(Number(port), '0.0.0.0', () => {
    console.log(`App is listening on http://localhost:${port}`)
})

module.exports = { server, app }
