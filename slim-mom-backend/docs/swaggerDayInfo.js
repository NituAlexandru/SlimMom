/**
 * @swagger
 * /api/day-info/{date}:
 *   get:
 *     summary: Get information for a specific day
 *     tags: [Day Info]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Day information retrieved successfully
 *       500:
 *         description: Error retrieving day info
 */
