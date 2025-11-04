import { Router } from 'express';
import * as RefreshTokenController from '../controllers/refreshTokenController.js';
import { attachUser } from '../middleware/auth/attachUser.js';
import { Roles } from '../types/roles.js';
import { authorizeRoles } from '../middleware/auth/authorizeRoles.js';

/**
 * @openapi
 * /refresh-tokens/{userId}:
 *   get:
 *     summary: Get all refresh token devices for a user
 *     tags:
 *       - Refresh Tokens
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of devices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /refresh-tokens/new:
 *   post:
 *     summary: Create a new refresh token (server-side only)
 *     tags:
 *       - Refresh Tokens
 *     requestBody:
 *       description: Refresh token data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - device
 *               - expiry
 *             properties:
 *               token:
 *                 type: string
 *               device:
 *                 type: string
 *               expiry:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Created new refresh token
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /refresh-tokens/validate:
 *   post:
 *     summary: Check if a refresh token exists & is valid
 *     tags:
 *       - Refresh Tokens
 *     requestBody:
 *       description: Refresh token to validate
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
 *     responses:
 *       200:
 *         description: Refresh token is valid
 *       404:
 *         description: Token not found or expired
 */

/**
 * @openapi
 * /refresh-tokens/revoke:
 *   patch:
 *     summary: Revoke a specific token by ID
 *     tags:
 *       - Refresh Tokens
 *     requestBody:
 *       description: Token ID to revoke
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Token revoked successfully
 *       404:
 *         description: Token not found
 */

/**
 * @openapi
 * /refresh-tokens/device:
 *   patch:
 *     summary: Revoke all tokens from a specific device
 *     tags:
 *       - Refresh Tokens
 *     requestBody:
 *       description: Device name to revoke
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - device
 *             properties:
 *               device:
 *                 type: string
 *     responses:
 *       200:
 *         description: Device signed out successfully
 *       404:
 *         description: Device not found
 */

/**
 * @openapi
 * /refresh-tokens/user:
 *   patch:
 *     summary: Revoke all tokens for a user (logout everywhere)
 *     tags:
 *       - Refresh Tokens
 *     requestBody:
 *       description: User ID to revoke all tokens
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Revoked all tokens for the user
 *       404:
 *         description: User not found
 */

/**
 * @openapi
 * /refresh-tokens/clean:
 *   delete:
 *     summary: Remove revoked/expired tokens
 *     tags:
 *       - Refresh Tokens
 *     responses:
 *       200:
 *         description: Deleted revoked/expired tokens successfully
 *       401:
 *         description: Unauthorized
 */

const router = Router();

router.use(attachUser, authorizeRoles(Roles.User, Roles.Admin, Roles.Owner));

router.get('/:userId', RefreshTokenController.getAllDevicesRefreshTokens);
router.post('/new', RefreshTokenController.createRefreshToken);
router.post('/validate', RefreshTokenController.getRefreshTokenByToken);
router.patch('/revoke', RefreshTokenController.revokeRefreshToken);
router.patch('/device', RefreshTokenController.revokeDeviceRefreshToken);
router.patch('/user', RefreshTokenController.revokeAllTokensForUser);

router.use(attachUser, authorizeRoles(Roles.Admin, Roles.Owner));

router.delete('/clean', RefreshTokenController.cleanRefreshToken);

export default router;
