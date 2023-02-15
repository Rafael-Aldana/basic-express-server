'use strict';

const supertest = require('supertest');
const { app } = require('../server');
const request = supertest(app);


describe('API Server', () => {
  it('should handle invalid requests', async () => {
    const response = await request.get('/invalid');
    expect(response.status).toEqual(404);
  })

  it('should handle bad method requests', async () => {
    const response = await request.post('/invalid');
    expect(response.status).toEqual(404);
  })

  it('if there is no name', async () => {
    const response = await request.get('/person').query({ name: '' });
    expect(response.status).toEqual(500);
  })
  it('if name exists', async () => {
    const response = await request.get('/person').query({ name: 'John' });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('John');
  });
});
