import SitesController from './sites.controller';

export default (server) => {
  const sitesController = new SitesController();
  server.get('/api/sites', sitesController.getSites);
  server.post('/api/sites', sitesController.addSite);
};
