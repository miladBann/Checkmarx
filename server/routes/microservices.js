const express = require('express');
const router = express.Router();
const path = require('path');
const { readJsonFile, writeJsonFile } = require('../controllers/fileController');
const { isMicroserviceUnique } = require('../controllers/microserviceController');

router.get('/', async (req, res) => {
    try {
        const microservices = await readJsonFile(path.join(__dirname, '..', 'data', 'microservices.json'));
        res.json(microservices);
    } catch (error) {
        res.status(500).send('Error retrieving microservices data');
    }
});

router.post('/', async (req, res) => {
    try {
        const newMicroservice = req.body;
        
        if (!await isMicroserviceUnique(newMicroservice)) {
            return res.status(400).json({ error: 'Microservice with same microserviceId, language, or pic already exists.' });
        }

        const microservicesDataPath = path.join(__dirname, '..', 'data', 'microservices.json');
        const existingMicroservices = await readJsonFile(microservicesDataPath);
        existingMicroservices.microservices.push(newMicroservice);
        await writeJsonFile(microservicesDataPath, existingMicroservices);
        
        res.status(201).json({ message: 'Microservice added successfully.' });
    } catch (error) {
        res.status(500).send('Error adding microservice');
    }
});

module.exports = router;
