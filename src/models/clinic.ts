/**
 * @swagger
 * components:
 *   schemas:
 *     Clinic:
 *       type: object
 *       required:
 *         - id
 *         - doctor_id
 *         - branch_id
 *       properties:
 *         id:
 *           type: number,
 *           example: 0
 *         doctor_id:
 *           type: number,
 *           example: 0
 *         assistant_id:
 *           type: number,
 *           example: 0
 *         branch_id:
 *           type: number,
 *           example: 0
 *         order_in_branch:
 *           type: number,
 *           example: 0
 *         created_at:
 *           type: string,
 *           example: '1999-12-31T22:00:00.000Z'
 *         updated_at:
 *           type: string,
 *           example: '1999-12-31T22:00:00.000Z'
 */
export type Clinic = {
    id: number
    doctor_id: number
    assistant_id: number | null
    branch_id: number
    order_in_branch: number | null
    created_at: string | null
    updated_at: string | null
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ClinicInsert:
 *       type: object
 *       required:
 *         - doctor_id
 *         - branch_id
 *       properties:
 *         doctor_id:
 *           type: number,
 *           example: 0
 *         assistant_id:
 *           type: number,
 *           example: 0
 *         branch_id:
 *           type: number,
 *           example: 0
 *         order_in_branch:
 *           type: number,
 *           example: 0
 */
export type ClinicInsert = {
    doctor_id: number
    assistant_id?: number | null
    branch_id: number
    order_in_branch?: number | null
    created_at?: string | null
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ClinicUpdate:
 *       type: object
 *       required:
 *         - id
 *         - doctor_id
 *         - branch_id
 *       properties:
 *         id:
 *           type: number,
 *           example: 0
 *         doctor_id:
 *           type: number,
 *           example: 0
 *         assistant_id:
 *           type: number,
 *           example: 0
 *         branch_id:
 *           type: number,
 *           example: 0
 *         order_in_branch:
 *           type: number,
 *           example: 0
 */
export type ClinicUpdate = {
    id: number
    doctor_id: number
    assistant_id?: number | null
    branch_id: number
    order_in_branch?: number | null
    updated_at?: string | null
}