  // Variables globales
  require("dotenv").config();
  const express = require('express')
  const app = express()
  const port = 3000
  const cowsay = require("cowsay")
  
  // Middlewares
  const checkApiKey = require("./middleware/auth_api_key.js")
  const morgan = require("./middleware/morgan.js")

  // Logger
  app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));

  // Pug
  app.set('view engine', 'pug');
  app.set('views','./views');

  // Modulos de rutas
  const productsApiRoutes = require("./routes/productsApi.routes.js")
  const providersApiRoutes = require("./routes/providers.routes.js")


  // Ruta de template
  app.get('/', function(req, res){
    res.send('API con Mongoose');
  });

  // Habilito recepción de JSON en servidor.
  app.use(express.json()) 

  // Rutas
  // API
  app.use("/api/products", productsApiRoutes)
  app.use("/api/providers", providersApiRoutes)


  // Última ruta por defecto. En caso de no encotrarse ninguna anterior, devolvemos un 404
  app.get("*", (req,res) => { 
      res.status(404).send("Gatito triste - 404 not found");
  })

  // Escuchador de event
  app.listen(port, () => {
    console.log(
        cowsay.say({
            text: `Nos vamos a por tortilla (si queda) Example app listening on port http://localhost:${port}`,
            e: "oO",
            T: "U "
        }))
  })
