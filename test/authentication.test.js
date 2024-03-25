/* eslint-disable no-unused-vars */
require('dotenv').config({path:`./.env.test`});
const supertest = require('supertest');
const { createHttpTerminator } = require('http-terminator');
const { app, server } = require('../server');
const expect = require('expect.js');
const { initFixtures, destroyFixtures } = require('./fixtures');
const request = supertest.agent(app);
const httpTerminator = createHttpTerminator({ server });

console.log(process.env);


// describe('API checks', () => {
//     const userData = { email: 'akgunner0910@gmail.com', password: 'abcd1234', firstName: 'Akshay', lastName: 'Kumar' }
//     const { email, password, firstName, lastName } = userData;

//     before(async () => {
//         await initFixtures();
//     });

//     it('responds to health check', async () => {
//         const response = await request.get('/health').set('Accept', 'application/json');
//         expect(response.statusCode).to.be(200);
//         expect(response._body.message).to.be('All good');

//     });

//     it('registers a new user', async () => {
//         const response = await request.post('/api/register').send(userData)
//             .set('Accept', 'application/json');
//         expect(response.statusCode).to.be(200);
//         expect(response._body.message).to.be('User registered successfully');

//     });

//     it('should not allow a non-logged in user to access home page', async () => {
//         const response = await request.get('/');
//         expect(response.statusCode).to.be(302);
//         expect(response.headers.location).to.be('/login');

//     });

//     it('logs in a registered user', async () => {
//         const response = await request.post('/api/login').send({ email, password })
//             .set('Accept', 'application/json');
//         expect(response.statusCode).to.be(200);
//         expect(response._body.message).to.be('User logged in successfully');
//     });

//     it('should allow a logged in user to access home page', async () => {
//         const response = await request.get('/')
//         expect(response.statusCode).to.be(200);
//         expect(response.text.includes(firstName)).to.be(true);
//         expect(response.text.includes(lastName)).to.be(true);
//     });

//     after(async () => {
//         await httpTerminator.terminate();
//         await destroyFixtures();
//         process.exit(0);
//     });

// });








