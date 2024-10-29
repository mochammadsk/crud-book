/**
 * @swagger
 * /signin:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Syahrul"
 *                 required: true
 *               password:
 *                 type: string
 *                 example: "123"
 *                 required: true
 *     responses:
 *       200:
 *         description: Login Successful!
 *       404:
 *         description: Login Failed!
 */
