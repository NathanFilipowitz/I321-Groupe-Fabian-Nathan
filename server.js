import express from 'express';
import serverLoader from './loaders/server.loader.js';

// require("dotenv").config({
//   path: process.env.NODE_ENV ? ".env" : ".env.development",
// });
const app = express();
serverLoader(app);

process.on("uncaughtException", (ex) => {
  // log uncaught exceptions here
  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  // log unhandled rejections here
  process.exit(1);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;