/**
 * @swagger
 * components:
 *   schemas:
 *     Branch:
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
 *           example: 'Dentistry'
 *         created_at:
 *           type: string,
 *           example: '1999-12-31T22:00:00.000Z'
 *         updated_at:
 *           type: string,
 *           example: '1999-12-31T22:00:00.000Z'
 */
export type Branch = {
    id: number
    name: string
    created_at: string | null
    updated_at: string | null
}

/**
 * @swagger
 * components:
 *   schemas:
 *     BranchInsert:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string,
 *           example: 'Dentistry'
 */
export type BranchInsert = {
    name: string
    created_at?: string | null
}

/**
 * @swagger
 * components:
 *   schemas:
 *     BranchUpdate:
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
 *           example: 'Dentistry'
 */
export type BranchUpdate = {
    id: number
    name: string
    updated_at?: string | null
}