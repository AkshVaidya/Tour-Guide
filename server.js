const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! SHUTTING DOWN...!');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: `./config.env` });

const app = require('./app');

const DB = `mongodb+srv://akshayvaidya2003:Akshay1003@cluster0.ct2cqvx.mongodb.net/TOURGUIDE?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(DB, {
    ignoreUndefined: true,
  })
  .then(() => {
    console.log('DB connection Successful');
  });

const port = process.env.PORT || 7000;

const server = app.listen(port, () => {
  console.log(`App running on ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting DOWN !!');
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! SHUTTING DOWN...!');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
