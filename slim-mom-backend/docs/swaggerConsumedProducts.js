/**
 * @swagger
 * /api/consumed-products:
 *   post:
 *     summary: Add a consumed product
 *     tags: [Consumed Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - productId
 *               - quantity
 *             properties:
 *               date:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Consumed product added successfully
 *       500:
 *         description: Error adding consumed product
 */

/**
 * @swagger
 * /api/consumed-products/{id}:
 *   delete:
 *     summary: Delete a consumed product
 *     tags: [Consumed Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Consumed product deleted successfully
 *       500:
 *         description: Error deleting consumed product
 */
