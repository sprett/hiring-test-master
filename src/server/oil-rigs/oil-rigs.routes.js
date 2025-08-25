import OilRigsController from './oil-rigs.controller';

export default (server) => {
  const oilRigsController = new OilRigsController();
  server.get('/api/oil-rigs', oilRigsController.getOilRigs);
  server.post('/api/oil-rigs', oilRigsController.addOilRig);
};
