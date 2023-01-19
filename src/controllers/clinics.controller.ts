import { Express } from "express"
import { IClinicManager } from "src/managers/interfaces/i.clinic.manager"
import { Clinic, ClinicInsert, ClinicUpdate } from "src/models/clinic"
import { container, InjectionToken } from "tsyringe"
import { cache, deleteCache, deleteCacheByPattern } from "utils/cache"

export class ClinicsController {
    manager: IClinicManager

    constructor(private app: Express, _manager: InjectionToken<IClinicManager>) {
        this.manager = container.resolve(_manager)
        this.init()
    }

    private init() {
        /**
        * @swagger 
        * /clinics:
        *   get:
        *     tags:
        *       - Clinics
        *     description: Returns list of all Clinics.
        *     responses:
        *       200:
        *         content:
        *           application/json:
        *             schema:
        *               $ref: '#/components/schemas/Clinic'
        *       304:
        *         description: Returns null due to a server error.
        */
        this.app.get("/clinics", async (req, res) => {
            const get = () => this.manager.getAll()
            res.json(await cache<Clinic[]>("clinics", get, 7200))
        })

        /**
         * @swagger 
         * /clinics/doctor/{id}:
         *   get:
         *     tags:
         *       - Clinics
         *     description: Returns list of Clinics that given id equals to 'doctor_id' .
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
         *               $ref: '#/components/schemas/Clinic'
         *       304: 
         *         description: Returns null due to a server error.
         *       400:
         *         description: Bad request 
         */
        this.app.get("/clinics/doctor/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                const get = () => this.manager.getByDoctorId(id)
                res.json(await cache<Clinic[]>(`clinics-doctor-${id}`, get, 7200))
            }
        })

        /**
         * @swagger 
         * /clinics/assistant/{id}:
         *   get:
         *     tags:
         *       - Clinics
         *     description: Returns list of Clinics that given id equals to 'assistant_id' .
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
         *               $ref: '#/components/schemas/Clinic'
         *       304: 
         *         description: Returns null due to a server error.
         *       400:
         *         description: Bad request 
         */
        this.app.get("/clinics/assistant/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                const get = () => this.manager.getByAssistantId(id)
                res.json(await cache<Clinic[]>(`clinics-assistant-${id}`, get, 7200))
            }
        })

        /**
         * @swagger 
         * /clinics/branch/{id}:
         *   get:
         *     tags:
         *       - Clinics
         *     description: Returns list of Clinics that given id equals to 'branch_id' .
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
         *               $ref: '#/components/schemas/Clinic'
         *       304: 
         *         description: Returns null due to a server error.
         *       400:
         *         description: Bad request 
         */
        this.app.get("/clinics/branch/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                const get = () => this.manager.getByBranchId(id)
                res.json(await cache<Clinic[]>(`clinics-branch-${id}`, get, 7200))
            }
        })

        /**
         * @swagger 
         * /clinics/{id}:
         *   get:
         *     tags:
         *       - Clinics
         *     description: Returns a Clinics that given id equals to 'id' .
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
         *               $ref: '#/components/schemas/Clinic'
         *       304: 
         *         description: Returns null due to a server error.
         *       400:
         *         description: Bad request 
         */
        this.app.get("/clinics/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                const get = () => this.manager.getById(id)
                res.json(await cache<Clinic>(`clinics-${id}`, get, 1800))
            }
        })

        /**
         * @swagger
         * /clinics:
         *   post:
         *     tags:
         *       - Clinics
         *     description: Insert a new Clinic object 
         *     requestBody: 
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/ClinicInsert'
         *     responses:
         *       200:
         *         description: Returns inserted object if it's succeeded.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Clinic'
         *       304: 
         *         description: Returns null due to a server error.
         *       400: 
         *         description: Bad Request.
         */
        this.app.post("/clinics", async (req, res) => {
            const body = req.body as ClinicInsert
            await deleteCache([
                "clinics",
                `clinics-doctor-${body.doctor_id}`,
                `clinics-assistant-${body.assistant_id}`,
                `clinics-branch-${body.branch_id}`
            ])
            res.json(await this.manager.add(body))
        })

        /**
        * @swagger
        * /clinics:
        *   put:
        *     tags:
        *       - Clinics
        *     description: Update a Clinic object.
        *     requestBody: 
        *       content:
        *         application/json:
        *           schema:
        *             $ref: '#/components/schemas/ClinicUpdate'
        *     responses:
        *       200:
        *         description: Returns updated object if it's succeeded.
        *         content:
        *           application/json:
        *             schema:
        *               $ref: '#/components/schemas/Clinic'
        *       304: 
        *         description: Returns null due to a server error.
        *       400: 
        *         description: Bad Request.
        */
        this.app.put("/clinics", async (req, res) => {
            const body = req.body as ClinicUpdate
            await deleteCache([
                "clinics",
                `clinics-doctor-${body.doctor_id}`,
                `clinics-assistant-${body.assistant_id}`,
                `clinics-branch-${body.branch_id}`
            ])
            res.json(await this.manager.update(body))
        })

        /**
         * @swagger 
         * /clinics/{id}:
         *   delete:
         *     tags:
         *       - Clinics
         *     description: Delete a Clinic object with id.
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
        this.app.delete("/clinics/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                await deleteCacheByPattern("clinics*")
                res.json(await this.manager.deleteById(id))
            }
        })
    }
}