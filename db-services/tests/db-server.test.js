const request = require('supertest');
const { app, startServer } = require('../src/db-server');

describe('Test api/issues/*', () => {
    let server;

    beforeAll(async () => {
        server = await startServer();
    });

    afterAll(async () => {
        await server.close();
    });

    test.skip('/test with success', async () => {
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

    test.skip('/test missing parameter', async () => {
        const response = await request(app)
            .get('/api/issues/test')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Missing searchParams in request body' });
    });

    test.skip('/api/issues/assigned_to', async () => {

    });


    test.skip.each([
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

    test.skip('/create new issue', async () => {
        const response = await request(app)
            .post('/api/issues/create')
            .send({
                title: "Issues 112",
                description: "This is not a real bug"
            });

        console.log(response.body);
        expect(response.status).toBe(201);
    });

    test.skip('/update issue', async () => {
        const response = await request(app)
            .post('/api/issues/update')
            .send({
                id: 4,
                position: 102030
            });

        console.log(response.body);
        expect(response.status).toBe(201);
    });

    test.skip('/find_all_issues with success', async () => {
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

    test.skip('/api/project/findAll with success', async () => {
        const response = await request(app)
            .get('/api/project/findAll')
            .send({});

        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(1);
        expect(response.body[0]).toHaveProperty('name', 'My project');
    });
});