const request = require('supertest');
const app = require('../server.js');
const { test, expect } = require('@jest/globals');

test('Get all the bus routes from the busRoutes endpoint', async function(){
    const response = await request(app).get('/api/v1/busRoutes');
    expect(response.status).toBe(200);
})