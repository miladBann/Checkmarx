const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 8081;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const microservicesRoutes = require('./routes/microservices');
const resourcesRoutes = require('./routes/resources');
const connectionsRoutes = require('./routes/connections');

app.use('/microservices', microservicesRoutes);
app.use('/resources', resourcesRoutes);
app.use('/add-connection', connectionsRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
