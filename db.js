const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mubeen:mubeen@cluster0.acbzdnx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Error connecting to MongoDB', err);
});

