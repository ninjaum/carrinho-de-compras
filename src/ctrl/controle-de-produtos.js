const db = require('../database/db.js')

module.exports = (app) => {
app.post('/produtos/registro', async (req, res) => {

    const {descricao, valor} = req.body;

    if (!descricao || !valor) {
        res.status(400).send({ error: 'Código, produto ou valor não informado!' })
        return;
      }

    let produtoJaRegistrado = 
    await db.produto.findFirst({
        where: {
            descricao : descricao
        }
    })

    if (produtoJaRegistrado) {
        res.status(400).send({error: 'Produto já registrado.'})
        return;
    }

    const produto = { descricao, valor };
    await db.produto.create({data: produto})

    res.send({ produtos: produto })
})

app.get('/produtos', async (req,res) => {
    res.send({produtos: await db.produto.findMany()})
  })
  

app.post('/produtos/consulta', async (req,res) => {
    const {id} = req.body;

    if (!id) {
        res.status(400).send({error: 'Código do produto não informado!.'})
        return;       
    }

    let produto = await db.produto.findUnique({
        where: {id : id}
    })

    if (!produto) {
        res.status(400).send({error: 'Produto não encontrado.'})
        return;
    }

    res.send({produto : produto})
    })
}