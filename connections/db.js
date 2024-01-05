"use strict";

const { Pool } = require('pg');
const Knex = require('knex');
const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } = process.env;

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: parseInt(DB_PORT),
});

const knex = Knex({
    client: 'pg',
    connection: {
        user: DB_USER,
        host: DB_HOST,
        database: DB_DATABASE,
        password: DB_PASSWORD,
        port: parseInt(DB_PORT),
    },
});

module.exports = {pool, knex};


