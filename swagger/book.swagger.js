/**
 * @swagger
 * /books/create:
 *   post:
 *     tags:
 *       - Book
 *     summary: Create book
 *     security:
 *       -bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 required: true
 *               author:
 *                 type: string
 *                 required: true
 *               year:
 *                 type: integer
 *                 required: true
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *       404:
 *         description: Book failed added!
 */

/**
 * @swagger
 * /books/view:
 *   get:
 *     tags:
 *       - Book
 *     summary: Get all data book
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 */

/**
 * @swagger
 * /books/view/{id}:
 *   get:
 *     tags:
 *       - Book
 *     summary: Get book by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 */

/**
 * @swagger
 * /books/update/{id}:
 *   put:
 *     tags:
 *       - Book
 *     summary: Update book by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 */

/**
 * @swagger
 * /books/delete:
 *   delete:
 *     tags:
 *       - Book
 *     summary: Delete all data book
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 */

/**
 * @swagger
 * /books/delete/{id}:
 *   delete:
 *     tags:
 *       - Book
 *     summary: Delete book by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 */
