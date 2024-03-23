const { pool } = require('../connections/db');
const { hash, compare } = require('bcrypt');
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10');


const addNewUser = async (payload) => {
    const { email, password, firstName, lastName } = payload;

    const passwordHash = await hash(password, SALT_ROUNDS);
    const text = `INSERT INTO public.users (firstname, lastname, email, passwordhash)
                VALUES( $1, $2, $3, $4);`

    const values = [firstName, lastName, email, passwordHash];

    await pool.query(text, values);

    return;
}

const loginUser = async (payload) => {
    const { email, password } = payload;
    const text = `SELECT id, firstname, lastname, email, passwordhash FROM public.users where email = $1;`
    const values = [email];

    const res = await pool.query(text, values);
    const userData = res.rows.length ? res.rows[0] : null;
    if (!userData) {
        throw new Error(`Incorrect email address`);
    }

    const passwordhash = userData.passwordhash;
    const passwordMatch = await compare(password, passwordhash);
    if (!passwordMatch) {
        throw new Error(`Incorrect password`);
    }

    return {id:userData.id,firstname:userData.firstname,lastname:userData.lastname,email:userData.email};
}

module.exports = {addNewUser,loginUser};