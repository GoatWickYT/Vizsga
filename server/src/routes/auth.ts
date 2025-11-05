import * as authController from '../controllers/auth.js';
import { Router } from 'express';
import { validateId } from '../middleware/validation/validateId.js';
import { attachUser } from '../middleware/auth/attachUser.js';
import { authorizeRoles } from '../middleware/auth/authorizeRoles.js';
import { Roles } from '../types/roles.js';

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
 * /auth/id/{id}:
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

/**
 * @openapi
 * /auth/change-password:
 *   patch:
 *     summary: Change a user's password
 *     description: >
 *       Allows a user to change their password.
 *       Requires the current (old) password for verification.
 *       Automatically revokes all refresh tokens associated with the user, forcing re-login on all devices.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               oldPassword:
 *                 type: string
 *                 example: OldPass123!
 *               newPassword:
 *                 type: string
 *                 example: NewPass456!
 *     responses:
 *       200:
 *         description: Password changed successfully, all sessions revoked.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password changed successfully, all sessions revoked
 *       400:
 *         description: Missing fields or invalid request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Both passwords and username are required
 *       401:
 *         description: Invalid credentials — old password does not match or user not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid credentials
 *       500:
 *         description: Internal server error.
 */

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token using a valid refresh token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: The refresh token
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token issued to the user
 *     responses:
 *       200:
 *         description: New access token issued
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Unauthorized (invalid, revoked, or expired token)
 */

router.post('/login', authController.login);
router.post('/register', authController.register);

router.use(attachUser, authorizeRoles(Roles.Admin, Roles.Owner, Roles.User));

router.get('/me', attachUser, authController.getMe);
router.post('/refresh', authController.refresh);
router.patch('/change-password', authController.changePassword);

router.use(attachUser, authorizeRoles(Roles.Admin, Roles.Owner));

router.get('/', authController.getPeople);
router.get('/id/:id', validateId, authController.getPerson);

export default router;
