/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *       500:
 *         description: Error getting products
 */

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search for products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Products searched successfully
 *       500:
 *         description: Error searching products
 */
