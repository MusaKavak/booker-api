import { Express } from "express";
import { IRankManager } from "src/managers/interfaces/i.rank.manager";
import { Rank, RankInsert, RankUpdate } from "src/models/rank";
import { InjectionToken, container } from "tsyringe";
import { cache, deleteCache } from "utils/cache";

export class RanksController {
    manager: IRankManager

    constructor(private app: Express, _manager: InjectionToken<IRankManager>) {
        this.manager = container.resolve(_manager)
        this.init()
    }

    private init() {
        /**
         * @swagger 
         * /ranks:
         *   get:
         *     tags:
         *       - Ranks
         *     description: Returns list of all Ranks.
         *     responses:
         *       200:
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Rank'
         *       304:
         *         description: Returns null due to a server error.
         */
        this.app.get("/ranks", async (req, res) => {
            const get = () => this.manager.getAll()
            res.json(await cache<Rank[]>("ranks", get, 7200))
        })

        /**
         * @swagger 
         * /ranks/{id}:
         *   get:
         *     tags:
         *       - Ranks
         *     description: Returns a Rank that given id equals to 'id' .
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
        this.app.get("/ranks/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                const get = () => this.manager.getById(id)
                res.json(await cache<Rank>(`ranks-${id}`, get, 1800))
            }
        })

        /**
         * @swagger
         * /ranks:
         *   post:
         *     tags:
         *       - Ranks
         *     description: Insert a new Rank object 
         *     requestBody: 
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/RankInsert'
         *     responses:
         *       200:
         *         description: Returns inserted object if it's succeeded.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Rank'
         *       304: 
         *         description: Returns null due to a server error.
         *       400: 
         *         description: Bad Request.
         */
        this.app.post("/ranks", async (req, res) => {
            const body = req.body as RankInsert
            await deleteCache(["ranks"])
            res.json(await this.manager.add(body))
        })

        /**
        * @swagger
        * /ranks:
        *   put:
        *     tags:
        *       - Ranks
        *     description: Update a Rank object.
        *     requestBody: 
        *       content:
        *         application/json:
        *           schema:
        *             $ref: '#/components/schemas/RankUpdate'
        *     responses:
        *       200:
        *         description: Returns updated object if it's succeeded.
        *         content:
        *           application/json:
        *             schema:
        *               $ref: '#/components/schemas/Rank'
        *       304: 
        *         description: Returns null due to a server error.
        *       400: 
        *         description: Bad Request.
        */
        this.app.put("/ranks", async (req, res) => {
            const body = req.body as RankUpdate
            await deleteCache(["ranks", `ranks-${body.id}`])
            res.json(await this.manager.update(body))
        })

        /**
         * @swagger 
         * /ranks/{id}:
         *   delete:
         *     tags:
         *       - Ranks
         *     description: Delete a Rank object with id.
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
        this.app.delete("/ranks/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                await deleteCache(["ranks", `ranks-${id}`])
                res.json(await this.manager.deleteById(id))
            }
        })
    }
}