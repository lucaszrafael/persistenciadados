const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();

const port = 5007;

import { Book } from "./models/Book";
import { Subject } from "./models/Subject";
import { Service } from "./models/Service";

app.use(bodyParser.urlencoded({extended: false}));

app.use(cors({
    oringin: '*',
    credentials: true
})); 

const service = new Service();
service.start();

app.get('/list_books', listBookHandler);

async function listBookHandler(req, res){ 
    console.log("Requisição de listagem recebida.");
    let books = await service.listBooks();  
    let booksList = JSON.stringify(books);
    res.setHeader('Content-Type', 'application/json');
    res.end(booksList);     
}

app.get('/search_books/:search', searchBookHandler);

async function searchBookHandler(req, res){ 
    console.log("Requisição de pesquisa de livros recebida.");
    const search = req.params.search
    const books = await service.searchBooks(search);  
    const booksList = JSON.stringify(books);
    res.setHeader('Content-Type', 'application/json');
    res.end(booksList);     
}

app.post('/add_book', addBookHandler);

async function addBookHandler(req, res){
    console.log("Requisição de inserção de livro recebida..");
    let newBook = new Book();  
    for(let key in req.body){
        newBook[key] = req.body[key];
    } 
    await service.insertBook(newBook);
    let response = JSON.stringify(newBook);
    res.setHeader('Content-Type', 'application/json');
    res.end(response);     
}

app.get('/get_book/:id', getBookHandler);

async function getBookHandler(req, res){
    console.log("Requisição de selecionar um livro recebida..");
    let id = req.params.id
    let book = await service.getBook(id);  
    let response = JSON.stringify(book);
    res.setHeader('Content-Type', 'application/json');
    res.end(response);    
}

app.put('/update_book/:id', updateBookHandler);

async function updateBookHandler(req, res){
    console.log("Requisição de atualização de livro recebida..");
    let id = req.params.id
    let newBook = new Book();  
    for(let key in req.body){
        newBook[key] = req.body[key];
    } 
    await service.updateBook(newBook, id);
    let response = JSON.stringify(newBook);
    res.setHeader('Content-Type', 'application/json');
    res.end(response); 
}

app.delete('/delete_book/:id', deleteBookHandler)

async function deleteBookHandler(req, res){
    console.log("Requisição de exclusão de livro recebida..");
    let id = req.params.id
    await service.deleteBook(id);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({mensagem: 'Livro excluído com sucesso!'}));     
}

app.get('/list_subjects', listSubjectHandler);

async function listSubjectHandler(req, res){ 
    console.log("Requisição de listagem de assuntos recebida.");
    let subjects = await service.listSubjects();  
    let subjectsList = JSON.stringify(subjects);
    res.setHeader('Content-Type', 'application/json');
    res.end(subjectsList);     
}

app.post('/add_subject', addSubjectHandler);

async function addSubjectHandler(req, res){
    console.log("Requisição de inserção de assunto recebida..");
    let newSubject = new Subject();  
    for(let key in req.body){
        newSubject[key] = req.body[key];
    } 
    await service.insertSubject(newSubject);
    let response = JSON.stringify(newSubject);
    res.setHeader('Content-Type', 'application/json');
    res.end(response);     
}

app.listen(port, listenHandler);

function listenHandler(){
    console.log(`Escutando na porta ${port}!`);
}