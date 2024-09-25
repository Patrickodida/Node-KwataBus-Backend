const request = require('supertest');
const app = require('../server.js');
const { test, expect } = require('@jest/globals');

test("Register/create a user from the users/register endpoint", async function(){
    let response = await request(app).post("/api/v1/users/register").send({
        userName: 'kettbrown',
        firstName: 'Kett',
        lastName: 'Brown',
        email: 'kett@email.com',
        password: 'kett123',
        mobileNumber: '0800022345'
    });
    console.log(response);
    expect(response.status).toBe(201);
})