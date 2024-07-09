const request = require('supertest');
const { app, startServer } = require('../src/issues'); // Import both app and startServer functions

describe('GET /api/issues', () => {
  let server; // Define a variable to store the server instance

  beforeAll(async () => {
    server = await startServer(); // Start the server before running tests
  });

  afterAll(async () => {
    await server.close(); // Close the server after tests are done
  });

  it('responds with JSON containing list of issues', async () => {
    const response = await request(app)
      .post('/api/issues')
      .send({
        searchParams: {
          status: 'TODO',
          userId: '123',
          searchText: 'example',
          orderBy: 'title',
          page: 1,
          pageSize: 10,
        },
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
