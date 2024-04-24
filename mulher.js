const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response) {
    //json - mandar um objeto
    response.json({
        nome: 'Simara Conceição',
        imagem: 'https://bit.ly/3LJIyOF',
        minibio: 'Desenvolvedora e Instrutora',
})
}


function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get("/mulher", mostraMulher))
app.listen(porta, mostraPorta)