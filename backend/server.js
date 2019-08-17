const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
   .then(r => {
      let {host, port} = r.connections[0];
      console.log(`Host: ${host} \nPort: ${port}`.trim())
   });

const connection = mongoose.connection;
connection.once('open', () => {
   console.log('MongoDB connection established successfully');
});

const exercisesRouters = require('./routes/exercises');
const usersRouters = require('./routes/users');

app.use('/exercises', exercisesRouters);
app.use('/users', usersRouters);

app.listen(port, () => {
   console.log(`Server is running on port: ${ port }`);
});