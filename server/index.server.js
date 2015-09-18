import express from 'express';
import morgan from 'morgan';
import open from 'open';
import serveStatic from 'serve-static';

const PORT = process.env.PORT || 8000;

express()
  .use(morgan('dev'))
  .use(serveStatic('dist'))
  .listen(PORT);

console.info(`server is ready: http://localhost:${ PORT }`);
open(`http://localhost:${ PORT }`);
