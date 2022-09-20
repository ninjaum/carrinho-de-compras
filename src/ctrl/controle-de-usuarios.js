const db = require('../database/db.js')

module.exports = (app) => {
    app.post('/usuarios/registro', async (req, res) => {

    const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            res.status(400).send({ error: 'Nome, email ou senha não informado!' })
            return;
        }
    
    let usuarioJaRegistrado = 
    await db.usuario.findUnique({
        where: {
            email: email
        }
    })
        if (usuarioJaRegistrado) {
            res.status(400).send({error: 'Usuário já registrado.'})
            return;
        }
    
    const usuario = { nome, email, senha };
    await db.usuario.create({data: usuario})
    
    res.send({ usuario })
    })
        
    app.get('/usuarios', async (req,res) => {
        res.send({ usuarios: await db.usuario.findMany() })
        return;
    })
        
    app.post('/usuarios/login', async (req, res) => {
    const {email, senha} = req.body;
    
    let usuario = 
    await db.usuario.findUnique({
        where: {
            email: email,
        }
    })
        if (!usuario) {
            res.status(400).send({error: 'Usuário não encontrado.'})
            return;
        }
    
        if (usuario.senha !== senha) {
            res.status(400).send({error: 'Senha inválida.'})
            return;
        }
    
    res.send({usuario: usuario})
    })
}