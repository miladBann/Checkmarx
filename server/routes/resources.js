const express = require('express');
const router = express.Router();
const path = require('path');
const { readJsonFile, writeJsonFile } = require('../controllers/fileController');

const resourcesFilePath = path.join(__dirname, '..', 'data', 'resources.json');
const accessIconMap = {
    public: "https://cdn-icons-png.flaticon.com/512/1040/1040005.png",
    private: "https://th.bing.com/th/id/OIP.g89-VXdv9YYURqSbgJSxBgHaHa?w=512&h=512&rs=1&pid=ImgDetMain",
    unknown: "https://cdn1.iconfinder.com/data/icons/rounded-flat-country-flag-collection-1/2000/_Unknown.png"
};

router.post('/', async (req, res) => {
    try {
        const { name, access, type, type_icon, microservices } = req.body;

        const resourcesData = await readJsonFile(resourcesFilePath);
        const existingResources = resourcesData.resources;

        // Check if resource name already exists
        const existingResource = existingResources.find(resource => resource.name === name);
        if (existingResource) {
            return res.status(400).json({ error: 'Resource name already exists' });
        }

        // Create new resource object
        const newResource = {
            "name": name,
            "access": access,
            "access_icon": accessIconMap[access], 
            "fileName": "tmp/936296693/InfraForShop/el_ache_2.tf",
            "type": type,
            "type_icon": type_icon,
            category: "Storage",
            actions: ["Read", "Write"],
            "microservices": [microservices],
        };

        // Add new resource to existing resources
        existingResources.push(newResource);

        // Update resources data with the new resource
        resourcesData.resources = existingResources;

        // Write updated resources data back to the JSON file
        await writeJsonFile(resourcesFilePath, resourcesData);

        res.json(newResource);
    } catch (error) {
        console.error('Error adding resource:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const resources = await readJsonFile(resourcesFilePath);
        res.json(resources);
    } catch (error) {
        res.status(500).send('Error retrieving resources data');
    }
});

module.exports = router;
