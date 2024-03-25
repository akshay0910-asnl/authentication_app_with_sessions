const { pool } = require('../connections/db')

const initFixtures = async () => {
    try {
        await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
        await pool.query(`CREATE TABLE IF NOT EXISTS public.users (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            firstname varchar(255) NOT NULL,
            lastname varchar(255) NOT NULL,
            email varchar(255) NOT NULL,
            passwordhash text NULL,
            CONSTRAINT users_email_key UNIQUE (email),
            CONSTRAINT users_pkey PRIMARY KEY (id)
        );`)
    } catch (err) {
        console.error(err)
    }
}

const destroyFixtures = async () => {
    await pool.query(
        `DROP TABLE public.sessions CASCADE; DROP TABLE public.users CASCADE;`
    )
    await pool.end()
}

module.exports = { initFixtures, destroyFixtures }
