const express = require('express');
const mongoose = require('mongoose');
const { dbUrl, port } = require('./config');
const authRoutes = require('./routes/authRoutes');

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

const app = express();

app.use(express.json());
app.use('/api', authRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
