/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - id
 *         - email
 *       properties:
 *         id:
 *           type: number,
 *           example: 0
 *         branch_id:
 *           type: number,
 *           example: 0
 *         email:
 *           type: string,
 *           example: "user@ example.com"
 *         first_name:
 *           type: string,
 *           example: "Some"
 *         last_name:
 *           type: string,
 *           example: "Body"
 *         phone_number:
 *           type: string,
 *           example: "1111111111"
 *         birth_date:
 *           type: string,
 *           example: "1999-12-31T22:00:00.000Z"
 *         title:
 *           type: string,
 *           example: "Dr."
 *         created_at:
 *           type: string,
 *           example: '1999-12-31T22:00:00.000Z'
 *         updated_at:
 *           type: string,
 *           example: '1999-12-31T22:00:00.000Z'
 */
export type Employee = {
  id: number
  branch_id: number | null
  email: string
  first_name: string | null
  last_name: string | null
  phone_number: string | null
  birth_date: string | null
  created_at: string | null
  updated_at: string | null
  title: string | null
}

/**
 * @swagger
 * components:
 *   schemas:
 *     EmployeeInsert:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         branch_id:
 *           type: number
 *           example: 0
 *         email:
 *           type: string,
 *           example: "user@ example.com"
 *         password:
 *           type: string,
 *           example: "Pen Pineapple Apple Pen"
 *         first_name:
 *           type: string,
 *           example: "Some"
 *         last_name:
 *           type: string,
 *           example: "Body"
 *         phone_number:
 *           type: string,
 *           example: "1111111111"
 *         birth_date:
 *           type: string,
 *           example: "1999-12-31T22:00:00.000Z"
 *         title:
 *           type: string,
 *           example: "Dr."
 */
export type EmployeeInsert = {
  branch_id?: number | null
  email: string
  password: string
  first_name?: string | null
  last_name?: string | null
  phone_number?: string | null
  birth_date?: string | null
  created_at?: string | null
  title?: string | null
}

/**
 * @swagger
 * components:
 *   schemas:
 *     EmployeeUpdate:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: number,
 *           example: 0
 *         email:
 *           type: string,
 *           example: "user@ example.com"
 *         password:
 *           type: string,
 *           example: "Pen Pineapple Apple Pen"
 *         first_name:
 *           type: string,
 *           example: "Some"
 *         last_name:
 *           type: string,
 *           example: "Body"
 *         phone_number:
 *           type: string,
 *           example: "1111111111"
 *         birth_date:
 *           type: string,
 *           example: "1999-12-31T22:00:00.000Z"
 *         title:
 *           type: string,
 *           example: "Dr."
 */
export type EmployeeUpdate = {
  id: number
  branch_id?: number | null
  email: string
  password: string
  first_name?: string | null
  last_name?: string | null
  phone_number?: string | null
  birth_date?: string | null
  updated_at?: string | null
  title?: string | null
}