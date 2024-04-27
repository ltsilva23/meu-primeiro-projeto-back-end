const express = require("express") //aqui estou iniciando o express
const router = express.Router() //aqui estou configurando a primeira parte da rota
const cors = require('cors') // aqui estou trazendo o pacote cors que permite consumir essa api no front-end
const conectaBancoDeDados = require('./bancoDeDados') //aqui estou ligando ao arquivo bancoDeDados
conectaBancoDeDados() // estou chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')

const app = express() //aqui estou iniciando o app
app.use(express.json())
app.use(cors())

const porta = 3333 //aqui estou criando a porta

//GET - Método genérico para qualquer requisição que busca dados do servidor
async function mostraMulheres(request, response) {
    try{
        const mulheresVindasDoBancoDeDados = await Mulher.find() // Esperando a conexão e quando acontecer buscar a lista das mulheres  no BD

        response.json(mulheresVindasDoBancoDeDados)
    }catch (erro){
        console.log(erro)
    }
    
}

//POST - Método genérico para qualquer requisição que envia dados ao servidor
async function criaMulher(request, response) {
   const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
   })

   try {
       const mulherCriada = await novaMulher.save()
       response.status(201).json(mulherCriada)
    } catch(erro) {
        console.log(erro)
    }
}

//PATCH - Modifica partes de um recurso existente
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
    
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }
    
        if (request.body.imagem) {
            mulherEncontrada = request.body.imagem
        }

        if (request.body.citacao) {
            mulherEncontrada = request.body.citacao
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

        response.json(mulherAtualizadaNoBancoDeDados)
    } catch (erro) {
        console.log(erro)
    }
}

//DELETE - Método específico para remoção de dados no servidor
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({ messagem: 'Mulher deletada com sucesso!'})
    }catch (erro) {
        console.log(erro)
    }
    response.json(mulheresQueFicaram)

}

app.use(router.get("/mulheres", mostraMulheres))// configurei rota GET /mulheres
app.use(router.post('/mulheres', criaMulher))// configurei rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher))// configurei a rota PATCH /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher))// configurei a rota DELETE /mulheres/:id

//PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.listen(porta, mostraPorta)// servidor ouvindo a porta