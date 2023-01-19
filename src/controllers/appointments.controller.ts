import { Express, Request } from "express"
import { IAppointmentManager } from "src/managers/interfaces/i.appointment.manager"
import { Appointment, AppointmentInsert, AppointmentUpdate } from "src/models/appointment"
import { container, InjectionToken } from "tsyringe"
import { cache, deleteCache, deleteCacheByPattern } from "utils/cache"

export class AppointmentsController {

    manager: IAppointmentManager

    constructor(private app: Express, private _manager: InjectionToken<IAppointmentManager>) {
        this.manager = container.resolve(this._manager)
        this.init()
    }

    private init() {
        /**
         * @swagger 
         * /appointments:
         *   get:
         *     tags:
         *       - Appointments
         *     description: Returns list of all Appointments.
         *     responses:
         *       200:
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Appointment'
         *       304:
         *         description: Returns null due to a server error.
         */
        this.app.get("/appointments", async (req, res) => {
            const get = () => this.manager.getAll()
            res.json(await cache<Appointment[]>("appointments", get, 7200))
        })

        /**
         * @swagger 
         * /appointments/patient/{id}:
         *   get:
         *     tags:
         *       - Appointments
         *     description: Returns list of Appointments that given id equals to 'patient_id' .
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
         *               $ref: '#/components/schemas/Appointment'
         *       304: 
         *         description: Returns null due to a server error.
         *       400:
         *         description: Bad request 
         */
        this.app.get("/appointments/patient/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                const get = () => this.manager.getByPatientId(id)
                res.json(await cache<Appointment[]>(`appointments-patient-${id}`, get, 7200))
            }
        })

        /**
         * @swagger 
         * /appointments/clinic/{id}:
         *   get:
         *     tags:
         *       - Appointments
         *     description: Returns list of Appointments that given id equals to 'clinic_id'.
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
         *               $ref: '#/components/schemas/Appointment'
         *       304: 
         *         description: Returns null due to a server error.
         *       400:
         *         description: Bad request 
         */
        this.app.get("/appointments/clinic/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                const get = () => this.manager.getByClinicId(id)
                res.json(await cache<Appointment[]>(`appointments-clinic-${id}`, get, 7200))
            }
        })

        /**
         * @swagger 
         * /appointments/{id}:
         *   get:
         *     tags:
         *       - Appointments
         *     description: Returns an Appointment that given id equals to 'id' .
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
         *               $ref: '#/components/schemas/Appointment'
         *       304: 
         *         description: Returns null due to a server error.
         *       400:
         *         description: Bad request 
         */
        this.app.get("/appointments/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                const get = () => this.manager.getById(id)
                res.json(await cache<Appointment>(`appointments-${id}`, get, 1800))
            }
        })

        /**
         * @swagger
         * /appointments:
         *   post:
         *     tags:
         *       - Appointments
         *     description: Insert a new Appointment object 
         *     requestBody: 
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/AppointmentInsert'
         *     responses:
         *       200:
         *         description: Returns inserted object if it's succeeded.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Appointment'
         *       304: 
         *         description: Returns null due to a server error.
         *       400: 
         *         description: Bad Request.
         */
        this.app.post("/appointments", async (req, res) => {
            const body = req.body as AppointmentInsert
            await deleteCache([
                "appointments",
                `appointments-clinic-${body.clinic_id}`,
                `appointments-patient-${body.patient_id}`
            ])
            res.json(await this.manager.add(body))
        })

        /**
         * @swagger
         * /appointments:
         *   put:
         *     tags:
         *       - Appointments
         *     description: Update an Appointment object.
         *     requestBody: 
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/AppointmentUpdate'
         *     responses:
         *       200:
         *         description: Returns updated object if it's succeeded.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Appointment'
         *       304: 
         *         description: Returns null due to a server error.
         *       400: 
         *         description: Bad Request.
         */
        this.app.put("/appointments", async (req, res) => {
            const body = req.body as AppointmentUpdate
            await deleteCache([
                "appointments",
                `appointments-clinic-${body.clinic_id}`,
                `appointments-patient-${body.patient_id}`
            ])
            res.json(await this.manager.update(body))
        })

        /**
         * @swagger 
         * /appointments/{id}:
         *   delete:
         *     tags:
         *       - Appointments
         *     description: Delete an Appointment object with id.
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
        this.app.delete("/appointments/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                await deleteCacheByPattern("appointments*")
                res.json(await this.manager.deleteById(id))
            }
        })
    }


}