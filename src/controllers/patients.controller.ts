import { Express } from "express";
import { IPatientManager } from "src/managers/interfaces/i.patient.manager";
import { Patient, PatientInsert, PatientUpdate } from "src/models/patient";
import { InjectionToken, container } from "tsyringe";
import { cache, deleteCache } from "utils/cache";

export class PatientsController {
    manager: IPatientManager

    constructor(private app: Express, _manager: InjectionToken<IPatientManager>) {
        this.manager = container.resolve(_manager)
        this.init()
    }

    private init() {
        /**
         * @swagger 
         * /patients:
         *   get:
         *     tags:
         *       - Patients
         *     description: Returns list of all Patients.
         *     responses:
         *       200:
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Patient'
         *       304:
         *         description: Returns null due to a server error.
         */
        this.app.get("/patients", async (req, res) => {
            const get = () => this.manager.getAll()
            res.json(await cache<Patient[]>("patients", get, 7200))
        })

        /**
         * @swagger 
         * /patients/{id}:
         *   get:
         *     tags:
         *       - Patients
         *     description: Returns a Patient that given id equals to 'id' .
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
         *               $ref: '#/components/schemas/Patient'
         *       304: 
         *         description: Returns null due to a server error.
         *       400:
         *         description: Bad request 
         */
        this.app.get("/patients/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                const get = () => this.manager.getById(id)
                res.json(await cache<Patient>(`patients-${id}`, get, 1800))
            }
        })

        /**
         * @swagger
         * /patients:
         *   post:
         *     tags:
         *       - Patients
         *     description: Insert a new Patient object 
         *     requestBody: 
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/PatientInsert'
         *     responses:
         *       200:
         *         description: Returns inserted object if it's succeeded.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Patient'
         *       304: 
         *         description: Returns null due to a server error.
         *       400: 
         *         description: Bad Request.
         */
        this.app.post("/patients", async (req, res) => {
            const body = req.body as PatientInsert
            await deleteCache(["patients"])
            res.json(await this.manager.add(body))
        })

        /**
         * @swagger
         * /patients:
         *   put:
         *     tags:
         *       - Patients
         *     description: Update a Patient object.
         *     requestBody: 
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/PatientUpdate'
         *     responses:
         *       200:
         *         description: Returns updated object if it's succeeded.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Patient'
         *       304: 
         *         description: Returns null due to a server error.
         *       400: 
         *         description: Bad Request.
         */
        this.app.put("/patients", async (req, res) => {
            const body = req.body as PatientUpdate
            await deleteCache(["patients", `patients-${body.id}`])
            res.json(await this.manager.update(body))
        })

        /**
         * @swagger 
         * /patients/{id}:
         *   delete:
         *     tags:
         *       - Patients
         *     description: Delete a Patient object with id.
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
        this.app.delete("/patients/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                await deleteCache(["patients", `patients-${id}`])
                res.json(await this.manager.deleteById(id))
            }
        })
    }
}