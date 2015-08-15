module.exports = {
  appTitle: process.env.SITE_TITLE || 'mean-pro',
  serverPort: process.env.PORT || '3000',
  dbName: 'meanpro',
  dbUrl: process.env.MONGODB || 'mongodb://localhost:27017/meanpro'
};
