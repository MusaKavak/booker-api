/**
 * @swagger
 * components:
 *   schemas:
 *     AppointmentTime:
 *       type: object
 *       required:
 *         - id
 *         - clinic_id
 *         - is_booked
 *         - start_time
 *         - end_time
 *       properties:
 *         id:
 *           type: number,
 *           example: 0
 *         clinic_id:
 *           type: number,
 *           example: 0
 *         is_booked:
 *           type: boolean,
 *           example: false
 *         start_time:
 *           type: string,
 *           example: '1999-12-31T22:00:00.000Z'
 *         end_time:
 *           type: string,
 *           example: '1999-12-31T22:00:00.000Z'
 *         created_at:
 *           type: string,
 *           example: '1999-12-31T22:00:00.000Z'
 *         updated_at:
 *           type: string,
 *           example: '1999-12-31T22:00:00.000Z'
 */
export type AppointmentTime = {
    id: number
    clinic_id: number
    is_booked: boolean
    start_time: string
    end_time: string
    created_at: string | null
    updated_at: string | null
}

/**
 * @swagger
 * components:
 *   schemas:
 *     AppointmentTimeInsert:
 *       type: object
 *       required:
 *         - clinic_id
 *         - start_time
 *         - end_time
 *       properties:
 *         clinic_id:
 *           type: number,
 *           example: 0
 *         start_time:
 *           type: string,
 *           example: '1999-12-31T22:00:00.000Z'
 *         end_time:
 *           type: string,
 *           example: '1999-12-31T22:00:00.000Z'
 */
export type AppointmentTimeInsert = {
    clinic_id: number
    is_booked: boolean | null
    start_time: string
    end_time: string
    created_at?: string | null
}

/**
 * @swagger
 * components:
 *   schemas:
 *     AppointmentTimeUpdate:
 *       type: object
 *       required:
 *         - id
 *         - clinic_id
 *         - is_booked
 *         - start_time
 *         - end_time
 *       properties:
 *         id:
 *           type: number,
 *           example: 0
 *         clinic_id:
 *           type: number,
 *           example: 0
 *         is_booked:
 *           type: number,
 *           example: 0
 *         start_time:
 *           type: string,
 *           example: '1999-12-31T22:00:00.000Z'
 *         end_time:
 *           type: string,
 *           example: '1999-12-31T22:00:00.000Z'
 */
export type AppointmentTimeUpdate = {
    id: number
    clinic_id: number
    is_booked: boolean
    start_time: string
    end_time: string
    updated_at?: string | null
}