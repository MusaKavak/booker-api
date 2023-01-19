import { IEmployeeManager } from "src/managers/interfaces/i.employee.manager";
import { Express } from "express";
import { container, InjectionToken } from "tsyringe";
import { Employee, EmployeeInsert, EmployeeUpdate } from "src/models/employee";
import { cache, deleteCache, deleteCacheByPattern } from "utils/cache";

export class EmployeesController {
    manager: IEmployeeManager

    constructor(private app: Express, _manager: InjectionToken<IEmployeeManager>) {
        this.manager = container.resolve(_manager)
        this.init()
    }

    private init() {
        /**
         * @swagger
         * /employees/login:
         *   post:
         *     tags:
         *       - Employees
         *     description: Login to Employee Account with Email and Password 
         *     requestBody: 
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - email
         *               - password
         *             properties:
         *               email:
         *                 type: string
         *                 example: "user@ example.com"
         *               password:
        *                  type: string
        *                  example: "Pen Pineapple Apple Pen"
         *     responses:
         *       200:
         *         description: Returns Employee Information if it's successfully login.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Employee'
         *       304: 
         *         description: Returns null due to a server error.
         *       400: 
         *         description: Bad Request.
         */
        this.app.post("/employees/login", async (req, res) => {
            const { email, password } = req.body
            res.json(await this.manager.loginWithEmailAndPassword(email, password))
        })

        /**
        * @swagger 
        * /employees:
        *   get:
        *     tags:
        *       - Employees
        *     description: Returns list of all Employees.
        *     responses:
        *       200:
        *         content:
        *           application/json:
        *             schema:
        *               $ref: '#/components/schemas/Employee'
        *       304:
        *         description: Returns null due to a server error.
        */
        this.app.get("/employees", async (req, res) => {
            const get = () => this.manager.getAll()
            res.json(await cache<Employee[]>("employees", get, 7200))
        })

        /**
         * @swagger 
         * /employees/branch/{id}:
         *   get:
         *     tags:
         *       - Employees
         *     description: Returns list of Employees that given id equals to 'branch_id' .
         *     parameters:
         *       - name: id
         *         in: path
         *         required: true
         *         schema:
         *           type: integer
         *           format: int64
         *           minimum: 0
         *     responses:
         *       200:
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Employee'
         *       304: 
         *         description: Returns null due to a server error.
         *       400:
         *         description: Bad request 
         */
        this.app.get("/employees/branch/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                const get = () => this.manager.getByBranchId(id)
                res.json(await cache<Employee[]>(`employees-branch-${id}`, get, 3600))
            }
        })

        /**
         * @swagger 
         * /employees/{id}:
         *   get:
         *     tags:
         *       - Employees
         *     description: Returns an Employee that given id equals to 'id' .
         *     parameters:
         *       - name: id
         *         in: path
         *         required: true
         *         schema:
         *           type: integer
         *           format: int64
         *           minimum: 0
         *     responses:
         *       200:
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Employee'
         *       304: 
         *         description: Returns null due to a server error.
         *       400:
         *         description: Bad request 
         */
        this.app.get("/employees/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                const get = () => this.manager.getById(id)
                res.json(await cache<Employee>(`employees-${id}`, get, 1800))
            }
        })

        /**
         * @swagger
         * /employees:
         *   post:
         *     tags:
         *       - Employees
         *     description: Insert a new Employee object 
         *     requestBody: 
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/EmployeeInsert'
         *     responses:
         *       200:
         *         description: Returns inserted object if it's succeeded.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Employee'
         *       304: 
         *         description: Returns null due to a server error.
         *       400: 
         *         description: Bad Request.
         */
        this.app.post("/employees", async (req, res) => {
            const body = req.body as EmployeeInsert
            await deleteCache([
                "employees",
                `employees-branch-${body.branch_id}`
            ])
            res.json(await this.manager.add(body))
        })

        /**
         * @swagger
         * /employees:
         *   put:
         *     tags:
         *       - Employees
         *     description: Update an Employee object.
         *     requestBody: 
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/EmployeeUpdate'
         *     responses:
         *       200:
         *         description: Returns updated object if it's succeeded.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Employee'
         *       304: 
         *         description: Returns null due to a server error.
         *       400: 
         *         description: Bad Request.
         */
        this.app.put("/employees", async (req, res) => {
            const body = req.body as EmployeeUpdate
            await deleteCache([
                "employees",
                `employees-branch-${body.branch_id}`
            ])
            res.json(await this.manager.update(body))
        })

        /**
         * @swagger 
         * /employees/{id}:
         *   delete:
         *     tags:
         *       - Employees
         *     description: Delete an Employee object with id.
         *     parameters:
         *       - name: id
         *         in: path
         *         required: true
         *         schema:
         *           type: integer
         *           format: int64
         *           minimum: 0
         *     responses:
         *       200:
         *         description: Returns "true" for success or "false" for failure.
         *       304: 
         *         description: Returns null due to a server error.
         *       400:
         *         description: Bad request 
         */
        this.app.delete("/employees/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                await deleteCacheByPattern("employees*")
                res.json(await this.manager.deleteById(id))
            }
        })
    }


}