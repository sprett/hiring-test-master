import express from 'express';
import request from 'supertest';
import {sites} from './sites.db';
import sitesRoutes from './sites.routes';

const server = express();
sitesRoutes(server);

describe('Sites Controller Tests', () => {
  describe('GET:', () => {
    it('should get a list of Oil Sites', async () => {
      const result = await request(server).get('/api/sites');
      expect(result.statusCode).toEqual(200);
      expect(result.body).toEqual(sites);
    });
  })
});
