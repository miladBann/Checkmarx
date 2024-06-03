const express = require('express');
const router = express.Router();
const path = require('path');
const { readJsonFile, writeJsonFile } = require('../controllers/fileController');

const resourcesFilePath = path.join(__dirname, '..', 'data', 'resources.json');

router.post('/', async (req, res) => {
    try {
        const { microserviceId, resourceName } = req.body;

        // Validate input
        if (!microserviceId || !resourceName) {
            return res.status(400).json({ error: 'Microservice ID and Resource Name are required' });
        }

        const microservicesData = await readJsonFile(path.join(__dirname, '..', 'data', 'microservices.json'));
        const resourcesData = await readJsonFile(resourcesFilePath);

        // Check if microserviceId is valid
        const microserviceExists = microservicesData.microservices.some(ms => ms.microserviceId === microserviceId);
        if (!microserviceExists) {
            return res.status(404).json({ error: 'Microservice not found' });
        }

        // Find the resource by name and add the microserviceId to its microservices array
        const resource = resourcesData.resources.find(res => res.name === resourceName);
        if (!resource) {
            return res.status(404).json({ error: 'Resource not found' });
        }

        if (!resource.microservices.includes(microserviceId)) {
            resource.microservices.push(microserviceId);

            await writeJsonFile(resourcesFilePath, resourcesData);

            res.status(200).json({ message: 'Connection added successfully' });
        } else {
            res.status(400).json({ error: 'Connection already exists' });
        }
    } catch (error) {
        console.error('Error adding connection:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
