import Contenedor from './Contenedor.js';
import express from 'express';
import fs from 'fs';
const app = express();
const PORT = 8080;
let producto = new Contenedor('productos.txt');

const server = app.listen(PORT, () => {
    console.log(`servidor escuchado en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor: ${error}`))

async function leerArchivos (Archivo) {
    let contenidoArchivo = await fs.promises.readFile(Archivo, 'utf-8');
    let objetoContenido = JSON.parse(contenidoArchivo);
    return objetoContenido
}

let respuesta = await leerArchivos('productos.txt');
let numeroAleatorio = Math.ceil(Math.random()*respuesta.length);
let productoAleatorio = await producto.getById(numeroAleatorio);
let productosTodos = await producto.getAll();

function respuestaServidor (ruta, request, response){
    if (ruta == '/'){
        response.send('Home')
    } else if(ruta == '/productos') {
        response.send(productosTodos)
    } else if(ruta == '/productoRandom') {
        response.send(JSON.stringify(productoAleatorio))
    }
}

app.get('/', function(req, res){
    respuestaServidor('/',req,res)
} )

app.get('/productos', function(req, res){
    respuestaServidor('/productos',req,res)
} )

app.get('/productoRandom', function(req, res){
    respuestaServidor('/productoRandom',req,res)
})