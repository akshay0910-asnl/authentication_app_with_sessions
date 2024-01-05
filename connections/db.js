"use strict";

const { Pool } = require('pg');
const Knex = require('knex');
const { DB_CONNECTION_STRING } = process.env;

const pool = new Pool({
    connectionString: DB_CONNECTION_STRING,
});

const knex = Knex({
    client: 'pg',
    connection: DB_CONNECTION_STRING,
});

module.exports = {pool, knex};


