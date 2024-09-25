const request = require('supertest');
const app = require('../server.js');
const { test, expect } = require('@jest/globals');

test('Get all the bus services from the busServices endpoint', async function(){
    let response = await request(app).get('/api/v1/busServices');
    expect(response.status).toBe(200);
})