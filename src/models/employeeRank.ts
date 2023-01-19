/**
 * @swagger
 * components:
 *   schemas:
 *     EmployeeRank:
 *       type: object
 *       required:
 *         - id
 *         - employee_id
 *         - rank_id
 *       properties:
 *         id:
 *           type: number,
 *           example: 0
 *         employee_id:
 *           type: number,
 *           example: 0
 *         rank_id:
 *           type: number,
 *           example: 0
 *         created_at:
 *           type: string,
 *           example: '1999-12-31T22:00:00.000Z'
 *         updated_at:
 *           type: string,
 *           example: '1999-12-31T22:00:00.000Z'
 */
export type EmployeeRank = {
    id: number
    employee_id: number
    rank_id: number
    created_at: string | null
    updated_at: string | null
}

/**
 * @swagger
 * components:
 *   schemas:
 *     EmployeeRankInsert:
 *       type: object
 *       required:
 *         - employee_id
 *         - rank_id
 *       properties:
 *         employee_id:
 *           type: number,
 *           example: 0
 *         rank_id:
 *           type: number,
 *           example: 0
 */
export type EmployeeRankInsert = {
    employee_id: number
    rank_id: number
    created_at?: string | null
}

/**
 * @swagger
 * components:
 *   schemas:
 *     EmployeeRankUpdate:
 *       type: object
 *       required:
 *         - id
 *         - employee_id
 *         - rank_id
 *       properties:
 *         id:
 *           type: number,
 *           example: 0
 *         employee_id:
 *           type: number,
 *           example: 0
 *         rank_id:
 *           type: number,
 *           example: 0
 */
export type EmployeeRankUpdate = {
    id: number
    employee_id: number
    rank_id: number
    updated_at?: string | null
}