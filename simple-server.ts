import * as express from 'express';
import { join } from 'path';
import { existsSync } from 'fs';
import { env } from './server.env';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/hrh/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  server.set('views', distFolder);

  server.get('/environment', (req, res) => {
    res.send(env());
  });

  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y'
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.sendFile(indexHtml);
  });

  return server;
}

function run() {
  const port = process.env.PORT ?? 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
