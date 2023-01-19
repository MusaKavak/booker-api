import { Express } from "express"
import { IEmployeeRankManager } from "src/managers/interfaces/i.employeeRank.manager"
import { InjectionToken, container } from "tsyringe"

export class EmployeeRanksController {
    manager: IEmployeeRankManager

    constructor(private app: Express, _manager: InjectionToken<IEmployeeRankManager>) {
        this.manager = container.resolve(_manager)
        this.init()
    }

    private init() {
        /**
        * @swagger 
        * /employeeRanks:
        *   get:
        *     tags:
        *       - EmployeeRanks
        *     description: Returns list of all EmployeeRanks.
        *     responses:
        *       200:
        *         content:
        *           application/json:
        *             schema:
        *               $ref: '#/components/schemas/EmployeeRank'
        *       304:
        *         description: Returns null due to a server error.
        */
        this.app.get("/employeeRanks", async (req, res) => {
            res.json(await this.manager.getAll())
        })

        /**
         * @swagger 
         * /employeeRanks/employee/{id}:
         *   get:
         *     tags:
         *       - EmployeeRanks
         *     description: Returns all Ranks of an Employee.
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
         *               $ref: '#/components/schemas/Rank'
         *       304: 
         *         description: Returns null due to a server error.
         *       400:
         *         description: Bad request 
         */
        this.app.get("/employeeRanks/employee/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else res.json(await this.manager.getRanksByEmployeeId(id))

        })

        /**
         * @swagger 
         * /employeeRanks/rank/{id}:
         *   get:
         *     tags:
         *       - EmployeeRanks
         *     description: Returns all Employees with given Rank'.
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
        this.app.get("/employeeRanks/rank/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else res.json(await this.manager.getEmployeesByRankId(id))

        })

        /**
         * @swagger 
         * /employeeRanks/{id}:
         *   get:
         *     tags:
         *       - EmployeeRanks
         *     description: Returns an EmployeeRank that given id equals to 'id'.
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
         *               $ref: '#/components/schemas/EmployeeRank'
         *       304: 
         *         description: Returns null due to a server error.
         *       400:
         *         description: Bad request 
         */
        this.app.get("/employeeRanks/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else res.json(await this.manager.getById(id))

        })

        /**
         * @swagger
         * /employeeRanks:
         *   post:
         *     tags:
         *       - EmployeeRanks
         *     description: Insert a new EmployeeRank object 
         *     requestBody: 
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/EmployeeRankInsert'
         *     responses:
         *       200:
         *         description: Returns inserted object if it's succeeded.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/EmployeeRank'
         *       304: 
         *         description: Returns null due to a server error.
         *       400: 
         *         description: Bad Request.
         */
        this.app.post("/employeeRanks", async (req, res) => {
            res.json(await this.manager.add(req.body))
        })

        /**
         * @swagger
         * /employeeRanks:
         *   put:
         *     tags:
         *       - EmployeeRanks
         *     description: Update an EmployeeRank object.
         *     requestBody: 
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/EmployeeRankUpdate'
         *     responses:
         *       200:
         *         description: Returns updated object if it's succeeded.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/EmployeeRank'
         *       304: 
         *         description: Returns null due to a server error.
         *       400: 
         *         description: Bad Request.
         */
        this.app.put("/employeeRanks", async (req, res) => {
            res.json(await this.manager.update(req.body))
        })

        /**
         * @swagger 
         * /employeeRanks/{id}:
         *   delete:
         *     tags:
         *       - EmployeeRanks
         *     description: Delete an EmployeeRank object with id.
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
        this.app.delete("/employeeRanks/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else res.json(await this.manager.deleteById(id))
        })
    }
}