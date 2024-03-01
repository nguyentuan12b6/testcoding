import app from './config/app';
import config from './config/config';
import { createConnection } from 'typeorm';
import mysqlConnectionOptions from '../ormconfig';

createConnection(mysqlConnectionOptions)
  .then(() => {
  console.log('Successfully connected to database')
  app.listen(config.PORT, () => {
    console.log(`App starting at http://localhost:${config.PORT}`);
  });
})
  .catch(error => {
  console.error(error)
})
