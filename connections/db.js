'use strict'

const { Pool } = require('pg')
const Knex = require('knex')
const {
    POSTGRESDB_USER,
    POSTGRESDB_ROOT_PASSWORD,
    POSTGRESDB_DB_HOST,
    POSTGRESDB_DOCKER_PORT,
    POSTGRESDB_DATABASE,
} = process.env

console.log(
    POSTGRESDB_USER,
    POSTGRESDB_ROOT_PASSWORD,
    POSTGRESDB_DB_HOST,
    POSTGRESDB_DOCKER_PORT,
    POSTGRESDB_DATABASE
)

const pool = new Pool({
    user: POSTGRESDB_USER,
    password: POSTGRESDB_ROOT_PASSWORD,
    host: POSTGRESDB_DB_HOST,
    port: POSTGRESDB_DOCKER_PORT,
    database: POSTGRESDB_DATABASE,
    ssl: false,
})

const knex = Knex({
    client: 'pg',
    connection: {
        user: POSTGRESDB_USER,
        password: POSTGRESDB_ROOT_PASSWORD,
        host: POSTGRESDB_DB_HOST,
        port: POSTGRESDB_DOCKER_PORT,
        database: POSTGRESDB_DATABASE,
    },
})

// eslint-disable-next-line no-unused-vars
pool.on('connect', (_client) => {
    console.log(`Connected to database`)
    // eslint-disable-next-line no-unused-vars
}).on('error', (err, _client) => {
    console.log(`JAAP STAM`);
    console.error(err)
})

module.exports = { pool, knex }
