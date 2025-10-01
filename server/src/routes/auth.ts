import * as authController from '../controllers/auth.js';
import { Router } from 'express';
import { validateId } from '../middleware/validation/validateId.js';
import { attachUser } from '../middleware/auth/attachUser.js';

const router = Router();

/**
 * @openapi
 * /auth:
 *   get:
 *     summary: Get all people
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: List of people as SafeUsers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SafeUser'
 */

/**
 * @openapi
 * /auth/{id}:
 *   get:
 *     summary: Get a single person by ID
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The person ID
 *     responses:
 *       200:
 *         description: Single person as a safeUser
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SafeUser'
 */

/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: Get the currently authenticated user's details
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The authenticated user's data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SafeUser'
 *       401:
 *         description: Unauthorized, missing or invalid token
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Log in a user and receive a JWT token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usernameOrEmail
 *               - password
 *             properties:
 *               usernameOrEmail:
 *                 type: string
 *                 description: Username or email of the user
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Successful login, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       400:
 *         description: Missing username/email or password
 *       401:
 *         description: Invalid credentials
 */

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: New user registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Desired username
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: Username or email already in use
 */

router.get('/', authController.getPeople);
router.get('/:id', validateId, authController.getPerson);
router.get('/me', attachUser, authController.getMe);
router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;
