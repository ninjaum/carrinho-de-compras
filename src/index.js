const express = require('express')
const cors = require('cors')
const controleDeUsuarios = require('./ctrl/controle-de-usuarios')
const controleDeProdutos = require('./ctrl/controle-de-produtos')
const port = 3000

const app = express()
app.use(cors())
app.use(express.json())
controleDeUsuarios(app)
controleDeProdutos(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
