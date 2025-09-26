import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Zoo Map API',
            version: '1.0.0',
        },
        components: {
            schemas: {
                Animal: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        adopter: { type: 'string' },
                    },
                },
                AnimalInput: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        description: { type: 'string' },
                        adopter: { type: 'string' },
                    },
                    required: ['name', 'description'],
                },
                AnimalType: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        animalId: { type: 'number' },
                    },
                },
                AnimalTypeInput: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        animalId: { type: 'number' },
                    },
                    required: ['name', 'animalId'],
                },
                Buffet: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        menuId: { type: 'number' },
                        spotId: { type: 'number' },
                    },
                },
                BuffetInput: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        menuId: { type: 'number' },
                        spotId: { type: 'number' },
                    },
                    required: ['name', 'menulId', 'spotId'],
                },
                Icon: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        imageLink: { type: 'number' },
                        spotId: { type: 'number' },
                    },
                },
                IconInput: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        imageLink: { type: 'number' },
                        spotId: { type: 'number' },
                    },
                    required: ['name', 'imageLink', 'spotId'],
                },
                Menu: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        price: { type: 'number' },
                        available: { type: 'boolean' },
                    },
                },
                MenuInput: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        price: { type: 'number' },
                        available: { type: 'boolean' },
                    },
                    required: ['name', 'price', 'available'],
                },
                Spot: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        locationX: { type: 'number' },
                        locationY: { type: 'number' },
                    },
                },
                SpotInput: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        locationX: { type: 'number' },
                        locationY: { type: 'number' },
                    },
                    required: ['name', 'locationX', 'locationY'],
                },
                WcUnit: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        spotId: { type: 'number' },
                    },
                },
                WcUnitInput: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        spotId: { type: 'number' },
                    },
                    required: ['name', 'spotId'],
                },
                Status: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        age: { type: 'number' },
                        spotId: { type: 'number' },
                    },
                },
                StatusInput: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        age: { type: 'number' },
                        spotId: { type: 'number' },
                    },
                    required: ['name', 'age', 'spotId'],
                },
            },
        },
    },
    apis: ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
