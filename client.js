/* eslint-disable no-unused-vars */
const { Client } = require('pg')
const {POSTGRESDB_USER,POSTGRESDB_ROOT_PASSWORD,POSTGRESDB_DB_HOST,POSTGRESDB_DOCKER_PORT,POSTGRESDB_DATABASE} = process.env;

const pgclient = new Client({
    host: POSTGRESDB_DB_HOST,
    port: POSTGRESDB_DOCKER_PORT,
    user: POSTGRESDB_USER,
    password: POSTGRESDB_ROOT_PASSWORD,
    database: POSTGRESDB_DATABASE,
    ssl: false
})

// user: POSTGRESDB_USER,
// password: POSTGRESDB_ROOT_PASSWORD,
// host: POSTGRESDB_DB_HOST,
// port: POSTGRESDB_DOCKER_PORT,
// database: POSTGRESDB_DATABASE,

pgclient.connect()

const table =
    'CREATE TABLE student(id SERIAL PRIMARY KEY, firstName VARCHAR(40) NOT NULL, lastName VARCHAR(40) NOT NULL, age INT, address VARCHAR(80), email VARCHAR(40))'
const text =
    'INSERT INTO student(firstname, lastname, age, address, email) VALUES($1, $2, $3, $4, $5) RETURNING *'
const values = [
    'Mona the',
    'Octocat',
    9,
    '88 Colin P Kelly Jr St, San Francisco, CA 94107, United States',
    'octocat@github.com',
]

pgclient.query(table, (err, res) => {
    if (err) throw err
})

pgclient.query(text, values, (err, res) => {
    if (err) throw err
})

pgclient.query('SELECT * FROM student', (err, res) => {
    if (err) throw err
    console.log(err, res.rows) // Print the data in student table
    pgclient.end()
})
