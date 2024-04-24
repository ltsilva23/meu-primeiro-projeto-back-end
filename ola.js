//express: enviar, receber e armazenar informações/dados
const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraOla(request, response) {
    response.send('Olá, mundo!')//send - opção que envia/manda
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/ola', mostraOla))
app.listen(porta, mostraPorta)






