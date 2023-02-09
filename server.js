const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();


const htmlRoutes = require('./routes/html');
const apiRoutes = require('./routes/api');


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//routes  
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);