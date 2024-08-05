const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
const { app, startServer } = require('../src/db-services'); // Adjust the path as necessary

const TEST_PORT = 5100;

describe('Server Status', () => {
    let server;

    // Start the server before running the tests
    beforeAll(async () => {
        server = await startServer(TEST_PORT);
    }, 1000);

    // Close the server after tests are done
    afterAll(async () => {
        await server.close();
    }, 30000);

    test('/test with success', async () => {
        const response = await request(app)
            .get('/api/issues/test')
            .send({
                searchParams: {
                    status: 'active'
                }
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ Hello: "World" });
    });

    test('/test missing parameter', async () => {
        const response = await request(app)
            .get('/api/issues/test')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Missing searchParams in request body' });
    });

    test('/api/issues/assigned_to', async () => {

    });


    test.each([
        {status: "OPEN", userid: 123, result: 1},
        {status: "CLOSED", userid: 123, result: 0},
        {status: "OPEN", userid: 321, result: 0},
    ])('/api issues count', async ({status, userid, result}) => {
        const response = await request(app)
            .get('/api/issues/count')
            .query({
                status: status,
                assignedToUserId: userid
            });

        expect(response.status).toBe(200);
        expect(response.body).toBe(result);
    });

    test('/findUniqueId', async () => {
        const response = await request(app)
            .get('/api/issues/findUniqueId')
            .query({
                id: 4,
            });

        console.log(response.body);
        expect(response.status).toBe(200);
    });

    test('/create new issue', async () => {
        const response = await request(app)
            .post('/api/issues/create')
            .send({
                title: "Issues 112",
                description: "This is not a real bug"
            });

        console.log(response.body);
        expect(response.status).toBe(201);
    });

    test('/update issue', async () => {
        const response = await request(app)
            .post('/api/issues/update')
            .send({
                id: 4,
                position: 102030
            });

        console.log(response.body);
        expect(response.status).toBe(201);
    });

    test('/find_all_issues with success', async () => {
        const response = await request(app)
            .get('/api/issues/find_all_issues')
            .send({
                searchParams: {
                    //status: 'TODO',
                    //userId: '123',
                    searchText: 'bug',
                    //orderBy: 'title',
                    //page: 1,
                    //pageSize: 10,
                },
            });

        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(1);
        expect(response.body[0]).toHaveProperty('title', 'A bug');
    })

    test('/api/project/findAll with success', async () => {
        const response = await request(app)
            .get('/api/project/findAll')
            .send({});

        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(1);
        expect(response.body[0]).toHaveProperty('name', 'My project');
    });
});
