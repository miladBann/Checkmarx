const path = require('path');
const { readJsonFile, writeJsonFile } = require('./fileController');

const isMicroserviceUnique = async (microservice) => {
    try {
        const { microservices } = await readJsonFile(path.join(__dirname, '../data', 'microservices.json'));
        return !microservices.some(existingMicroservice => 
            existingMicroservice.microserviceId === microservice.microserviceId ||
            existingMicroservice.language === microservice.language ||
            existingMicroservice.pic === microservice.pic
        );
    } catch (error) {
        console.error(`Error checking uniqueness: ${error}`);
        throw error;
    }
};

module.exports = {
    isMicroserviceUnique
};
