/**
 * @swagger
 * /api/user-calories:
 *   post:
 *     summary: Save daily calorie intake and non-recommended products
 *     tags: [User Calories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dailyCalories
 *               - nonRecommended
 *             properties:
 *               dailyCalories:
 *                 type: number
 *               nonRecommended:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Daily intake saved successfully
 *       500:
 *         description: Error saving daily intake
 */

/**
 * @swagger
 * /api/user-calories:
 *   get:
 *     summary: Get daily calorie intake and non-recommended products
 *     tags: [User Calories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daily intake retrieved successfully
 *       500:
 *         description: Error retrieving daily intake
 */
