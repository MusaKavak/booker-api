import { Express } from "express"
import { IAppointmentTimeManager } from "src/managers/interfaces/i.appointmentTime.manager"
import { AppointmentTime, AppointmentTimeInsert, AppointmentTimeUpdate } from "src/models/appointmentTime"
import { container, InjectionToken } from "tsyringe"
import { cache, deleteCache, deleteCacheByPattern } from "utils/cache"

export class AppointmentTimesController {
    manager: IAppointmentTimeManager

    constructor(private app: Express, _manager: InjectionToken<IAppointmentTimeManager>) {
        this.manager = container.resolve(_manager)
        this.init()
    }

    private init() {
        /**
        * @swagger 
        * /appointmentTimes:
        *   get:
        *     tags:
        *       - AppointmentTimes
        *     description: Returns list of all AppointmentTimes.
        *     responses:
        *       200:
        *         content:
        *           application/json:
        *             schema:
        *               $ref: '#/components/schemas/AppointmentTime'
        *       304:
        *         description: Returns null due to a server error.
        */
        this.app.get("/appointmentTimes", async (req, res) => {
            const get = () => this.manager.getAll()
            res.json(await cache<AppointmentTime[]>("appointmentTimes", get, 7200))
        })

        /**
        * @swagger 
        * /appointmentTimes/clinic/{id}:
        *   get:
        *     tags:
        *       - AppointmentTimes
        *     description: Returns list of AppointmentTimes that given id equals to 'clinic_id'.
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
        *               $ref: '#/components/schemas/AppointmentTime'
        *       304: 
        *         description: Returns null due to a server error.
        *       400:
        *         description: Bad request 
        */
        this.app.get("/appointmentTimes/clinic/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                const get = () => this.manager.getByClinicId(id)
                res.json(await cache<AppointmentTime[]>(`appointmentTimes-clinic-${id}`, get, 7200))
            }
        })

        /**
         * @swagger 
         * /appointmentTimes/{id}:
         *   get:
         *     tags:
         *       - AppointmentTimes
         *     description: Returns an AppointmentTime that given "id" equals to 'id' .
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
         *               $ref: '#/components/schemas/AppointmentTime'
         *       304: 
         *         description: Returns null due to a server error.
         *       400:
         *         description: Bad request 
         */
        this.app.get("/appointmentTimes/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                const get = () => this.manager.getById(id)
                res.json(await cache<AppointmentTime>(`appointmentTimes-${id}`, get, 1800))
            }
        })

        /**
         * @swagger
         * /appointmentTimes:
         *   post:
         *     tags:
         *       - AppointmentTimes
         *     description: Insert a new AppointmentTime object 
         *     requestBody: 
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/AppointmentTimeInsert'
         *     responses:
         *       200:
         *         description: Returns inserted object if it's succeeded.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/AppointmentTime'
         *       304: 
         *         description: Returns null due to a server error.
         *       400: 
         *         description: Bad Request.
         */
        this.app.post("/appointmentTimes", async (req, res) => {
            const body = req.body as AppointmentTimeInsert
            await deleteCache([
                "appointmentTimes",
                `appointmentTimes-clinic-${body.clinic_id}`
            ])
            res.json(await this.manager.add(body))
        })

        /**
         * @swagger
         * /appointmentTimes:
         *   put:
         *     tags:
         *       - AppointmentTimes
         *     description: Update an Appointment object.
         *     requestBody: 
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/AppointmentTimeUpdate'
         *     responses:
         *       200:
         *         description: Returns updated object if it's succeeded.
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/AppointmentTime'
         *       304: 
         *         description: Returns null due to a server error.
         *       400: 
         *         description: Bad Request.
         */
        this.app.put("appointmentTimes", async (req, res) => {
            const body = req.body as AppointmentTimeUpdate
            await deleteCache([
                "appointmentTimes",
                `appointmentTimes-clinic-${body.clinic_id}`
            ])
            res.json(await this.manager.update(req.body))
        })

        /**
         * @swagger 
         * /appointmentTimes/{id}:
         *   delete:
         *     tags:
         *       - AppointmentTimes
         *     description: Delete an AppointmentTime object with id.
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
        this.app.delete("/appointmentTimes/:id", async (req, res) => {
            const id = parseInt(req.params.id)
            if (isNaN(id)) res.sendStatus(400)
            else {
                await deleteCacheByPattern("appointmentTimes*")
                res.json(await this.manager.deleteById(id))
            }
        })
    }
}