import express from 'express';
import request from 'supertest';
import {oilRigs} from './oil-rigs.db';
import oilRigsRoutes from './oil-rigs.routes';

const server = express();
oilRigsRoutes(server);

describe('Oil Rigs Controller Tests', () => {
  describe('GET:', () => {
    it('should get a list of Oil Rigs', async () => {
      const result = await request(server).get('/api/oil-rigs');
      expect(result.statusCode).toEqual(200);
      expect(result.body).toEqual(oilRigs);
    });
  })
});
