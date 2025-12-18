import express from 'express';
import serverLoader from './loaders/server.loader.js';

const app = express();
serverLoader(app);

process.on("uncaughtException", (ex) => {
  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  process.exit(1);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));

export default app;