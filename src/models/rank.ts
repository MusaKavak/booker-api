/**
 * @swagger
 * components:
 *   schemas:
 *     Rank:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: number,
 *           example: 0
 *         name:
 *           type: string,
 *           example: "Manager"
 *         created_at:
 *           type: string,
 *           example: '1999-12-31T22:00:00.000Z'
 *         updated_at:
 *           type: string,
 *           example: '1999-12-31T22:00:00.000Z'
 */
export type Rank = {
    id: number
    name: string
    created_at: string | null
    updated_at: string | null
}

/**
 * @swagger
 * components:
 *   schemas:
 *     RankInsert:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string,
 *           example: "Manager"
 */
export type RankInsert = {
    name: string
    created_at?: string | null
}

/**
 * @swagger
 * components:
 *   schemas:
 *     RankUpdate:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: number,
 *           example: 0
 *         name:
 *           type: string,
 *           example: "Manager"
 */
export type RankUpdate = {
    id: number
    name: string
    updated_at?: string | null
}