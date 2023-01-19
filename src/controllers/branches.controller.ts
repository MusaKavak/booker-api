import { IBranchManager } from "src/managers/interfaces/i.branch.manager";
import { Express } from "express";
import { container, InjectionToken } from "tsyringe";
import { cache, deleteCache } from "utils/cache";
import { Branch } from "src/models/branch";

export class BranchesController {
    manager: IBranchManager

    constructor(private app: Express, _manager: InjectionToken<IBranchManager>) {
        this.manager = container.resolve(_manager)
        this.init()
    }

    private init() {
        /**
        * @swagger 
        * /branches:
        *   get:
        *     tags:
        *       - Branches
        *     description: Returns list of all Branches.
        *     responses:
        *       200:
        *         content:
        *           application/json:
        *             schema:
        *               $ref: '#/components/schemas/Branch'
        *       304:
        *         description: Returns null due to a server error.
        */
        this.app.get("/branches", async (req, res) => {
            const get = () => this.manager.getAll()
            res.json(await cache<Branch[]>("branches", get, 7200))
        })

        /**
         * @swagger 
         * /branches/{id}:
         *   get:
         *     tags:
         *       - Branches
         *     description: Returns a Branch that given id equals to 'id' .
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
         *               $ref: '#/components/schemas/Branch'
         *       304: 
         *         description: Returns null due to a server error.
         *       400:
         *         description: Bad request 
         */
        this.app.get("/branches/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                const get = () => this.manager.getById(id)
                res.json(await cache<Branch>(`branches-${id}`, get, 1800))
            }
        })

        /**
         * @swagger
         * /branches:
         *   post:
         *     tags:
         *       - Branches
         *     description: Insert a new Branch object 
         *     requestBody: 
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/BranchInsert'
         *     responses:
         *       200:
         *         description: Returns inserted object if it's succeeded.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Branch'
         *       304: 
         *         description: Returns null due to a server error.
         *       400: 
         *         description: Bad Request.
         */
        this.app.post("/branches", async (req, res) => {
            await deleteCache(["branches"])
            res.json(await this.manager.add(req.body))
        })

        /**
         * @swagger
         * /branches:
         *   put:
         *     tags:
         *       - Branches
         *     description: Update a Branch object.
         *     requestBody: 
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/BranchUpdate'
         *     responses:
         *       200:
         *         description: Returns updated object if it's succeeded.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Branch'
         *       304: 
         *         description: Returns null due to a server error.
         *       400: 
         *         description: Bad Request.
         */
        this.app.put("/branches", async (req, res) => {
            await deleteCache(["branches"])
            res.json(await this.manager.update(req.body))
        })

        /**
         * @swagger 
         * /branches/{id}:
         *   delete:
         *     tags:
         *       - Branches
         *     description: Delete a Branch object with id.
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
        this.app.delete("/branches/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                await deleteCache(["branches", `branches-${id}`])
                res.json(await this.manager.deleteById(id))
            }
        })
    }
}