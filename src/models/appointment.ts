/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       required:
 *         - id
 *         - clinic_id
 *         - patient_id
 *         - appointment_time_id
 *       properties:
 *         id:
 *           type: number,
 *           example: 0
 *         clinic_id:
 *           type: number,
 *           example: 0
 *         patient_id:
 *           type: number,
 *           example: 0
 *         created_at:
 *           type: string,
 *           example: '1999-12-31T22:00:00.000Z'
 *         updated_at:
 *           type: string,
 *           example: '1999-12-31T22:00:00.000Z'
 *         appointment_time_id:
 *           type: number,
 *           example: 0
 */
export type Appointment = {
    id: number
    clinic_id: number
    patient_id: number
    created_at: string | null
    updated_at: string | null
    appointment_time_id: number
}

/**
 * @swagger
 * components:
 *   schemas:
 *     AppointmentInsert:
 *       type: object
 *       required:
 *         - clinic_id
 *         - patient_id
 *         - appointment_time_id
 *       properties:
 *         clinic_id:
 *           type: number,
 *           example: 0
 *         patient_id:
 *           type: number,
 *           example: 0
 *         appointment_time_id:
 *           type: number,
 *           example: 0
 */
export type AppointmentInsert = {
    clinic_id: number
    patient_id: number
    appointment_time_id: number
    created_at: string | null
}

/**
 * @swagger
 * components:
 *   schemas:
 *     AppointmentUpdate:
 *       type: object
 *       required:
 *         - id
 *         - clinic_id
 *         - patient_id
 *         - appointment_time_id
 *       properties:
 *         id:
 *           type: number,
 *           example: 0
 *         clinic_id:
 *           type: number,
 *           example: 0
 *         patient_id:
 *           type: number,
 *           example: 0
 *         appointment_time_id:
 *           type: number,
 *           example: 0
 */
export type AppointmentUpdate = {
    id: number
    clinic_id: number
    patient_id: number
    appointment_time_id: number
    updated_at: string | null
}