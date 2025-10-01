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
                        type: { type: 'string' },
                        spotId: { type: 'number' },
                    },
                },
                AnimalInput: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        description: { type: 'string' },
                        adopter: { type: 'string' },
                        type: { type: 'string' },
                        spotId: { type: 'number' },
                    },
                    required: ['name', 'description', 'type', 'spotId'],
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
                        icon: { type: 'string' },
                        status: { type: 'string' },
                    },
                },
                SpotInput: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        locationX: { type: 'number' },
                        locationY: { type: 'number' },
                        icon: { type: 'string' },
                        status: { type: 'string' },
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
                Comment: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        content: { type: 'string' },
                        date: { type: 'date' },
                        userId: { type: 'number' },
                        postId: { type: 'number' },
                    },
                },
                CommentInput: {
                    type: 'object',
                    properties: {
                        content: { type: 'string' },
                        date: { type: 'date' },
                        userId: { type: 'number' },
                        postId: { type: 'number' },
                    },
                    required: ['content', 'date', 'spotId', 'userId'],
                },
                Post: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        date: { type: 'date' },
                        description: { type: 'string' },
                    },
                },
                PostInput: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        date: { type: 'date' },
                        description: { type: 'string' },
                    },
                    required: ['name', 'date', 'description'],
                },
                Person: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        userName: { type: 'string' },
                        name: { type: 'string' },
                        phone: { type: 'string' },
                        email: { type: 'string' },
                        creditCard: { type: 'string' },
                    },
                },
                PersonInput: {
                    type: 'object',
                    properties: {
                        userName: { type: 'string' },
                        name: { type: 'string' },
                        phone: { type: 'string' },
                        email: { type: 'string' },
                        creditCard: { type: 'string' },
                    },
                    required: ['userName', 'name', 'email', 'password'],
                },
                Ticket: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        amount: { type: 'number' },
                        typeId: { type: 'number' },
                    },
                },
                TicketInput: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        amount: { type: 'number' },
                        typeId: { type: 'number' },
                    },
                    required: ['name', 'amount', 'typeId'],
                },
                TicketType: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        price: { type: 'number' },
                    },
                },
                TicketTypeInput: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        price: { type: 'number' },
                    },
                    required: ['name', 'price'],
                },
                SafeUser: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        userName: { type: 'string' },
                        role: { type: 'string' },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
