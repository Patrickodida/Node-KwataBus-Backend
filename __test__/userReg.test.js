const request = require('supertest');
const app = require('../server.js');
const { test, expect } = require('@jest/globals');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

let createdUserId;

// Cleanup before all tests
beforeAll(async () => {
    // Ensure no user with the same credentials exists
    await prisma.user.deleteMany({
        where: {
            userName: 'kettbrown', // Change to a unique userName for each test
            email: 'kett@email.com' // Change to a unique email for each test
        }
    });
});

// Cleanup after all tests
afterAll(async () => {
    // Clean up the user created during the test
    if (createdUserId) {
        await prisma.user.delete({
            where: {
                userId: createdUserId
            }
        });
    }
    await prisma.$disconnect(); // Disconnect Prisma client
});

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