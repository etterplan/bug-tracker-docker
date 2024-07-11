const request = require('supertest');
const { app, startServer } = require('../src/issues');

describe('Test api/issues/*', () => {
    let server;

    beforeAll(async () => {
        server = await startServer();
    });

    afterAll(async () => {
        await server.close();
    });

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
        expect(response.body).toEqual({message: 'Missing searchParams in request body'});
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