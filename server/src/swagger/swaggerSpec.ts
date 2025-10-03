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
                        type: { type: 'string', enum: ['omnivore', 'herbivore', 'carnivore'] },
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
                    required: ['name', 'menuId', 'spotId'],
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
                        status: { type: 'string', enum: ['open', 'closed', 'dirty'] },
                    },
                },
                SpotInput: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        locationX: { type: 'number' },
                        locationY: { type: 'number' },
                        icon: { type: 'string' },
                        status: { type: 'string', enum: ['open', 'closed', 'dirty'] },
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
                        date: { type: 'date-time' },
                        userId: { type: 'number' },
                        postId: { type: 'number' },
                    },
                },
                CommentInput: {
                    type: 'object',
                    properties: {
                        content: { type: 'string' },
                        date: { type: 'date-time' },
                        userId: { type: 'number' },
                        postId: { type: 'number' },
                    },
                    required: ['content', 'date', 'postId', 'userId'],
                },
                Post: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        important: { type: 'boolean' },
                        likeCount: { type: 'number' },
                        dislikeCount: { type: 'number' },
                        views: { type: 'number' },
                        date: { type: 'string', format: 'date-time' },
                    },
                },
                PostInput: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        description: { type: 'string' },
                        date: { type: 'string', format: 'date-time' },
                    },
                    required: ['name', 'description', 'date'],
                },
                PostStatusInput: {
                    type: 'object',
                    properties: {
                        views: { type: 'number' },
                        likeCount: { type: 'number' },
                        dislikeCount: { type: 'number' },
                    },
                    required: ['views', 'likeCount', 'dislikeCount'],
                },
                PostImportanceInput: {
                    type: 'object',
                    properties: {
                        important: { type: 'boolean' },
                    },
                    required: ['important'],
                },
                Person: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        username: { type: 'string' },
                        name: { type: 'string' },
                        phone: { type: 'string' },
                        email: { type: 'string' },
                        creditCard: { type: 'string' },
                        password: { type: 'string' },
                        role: { type: 'string', enum: ['Admin', 'Owner', 'User'] },
                    },
                },
                PersonInput: {
                    type: 'object',
                    properties: {
                        username: { type: 'string' },
                        name: { type: 'string' },
                        phone: { type: 'string' },
                        email: { type: 'string' },
                        creditCard: { type: 'string' },
                        password: { type: 'string' },
                        role: { type: 'string', enum: ['Admin', 'Owner', 'User'] },
                    },
                    required: ['username', 'name', 'email', 'password', 'role'],
                },
                Ticket: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        amount: { type: 'number' },
                        typeId: { type: 'number' },
                        userId: { type: 'number' },
                    },
                },
                TicketInput: {
                    type: 'object',
                    properties: {
                        amount: { type: 'number' },
                        typeId: { type: 'number' },
                        userId: { type: 'number' },
                    },
                    required: ['amount'],
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
                        username: { type: 'string' },
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
