const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//tells server where to go when client navigates either to <ourhost>/api --> apiRoutes or / --> the html routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//tell it to listen for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});