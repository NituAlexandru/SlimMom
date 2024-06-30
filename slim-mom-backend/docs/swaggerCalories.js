/**
 * @swagger
 * /api/calories/public:
 *   post:
 *     summary: Get daily calorie intake and non-recommended products (public)
 *     tags: [Calories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - height
 *               - weight
 *               - age
 *               - desiredWeight
 *               - bloodType
 *             properties:
 *               height:
 *                 type: number
 *               weight:
 *                 type: number
 *               age:
 *                 type: number
 *               desiredWeight:
 *                 type: number
 *               bloodType:
 *                 type: number
 *     responses:
 *       200:
 *         description: Daily calorie intake calculated successfully
 *       500:
 *         description: Error calculating daily intake
 */
