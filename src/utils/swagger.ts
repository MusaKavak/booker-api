import { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import { version } from "../../package.json";
import swaggerUi from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Booker API Docs",
            version
        },
    },
    apis: ["src/controllers/*.controller.ts", "src/models/*.ts"]
}

const swaggerSpecs = swaggerJSDoc(options)

export function swaggerDocs(app: Express) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

    app.get('/docs.json', (req, res) => {
        res.json(swaggerSpecs)
    })
}