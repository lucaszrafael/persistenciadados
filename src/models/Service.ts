import { Like } from "typeorm";
import { MariaDBDataSource } from "./data-source";
import { Book } from "./Book";
import { Subject } from "./Subject";

export class Service{    
    start(){       
            MariaDBDataSource.initialize().then( ()=>{
                console.log("Inicializada a fonte de dados...");
            }).catch((err)=>{
                console.error("Erro de inicialização da fonte de dados!!");
            }) 
    }
    
    async listBooks(){
       const booksList = await MariaDBDataSource.manager.find(Book, {relations: {subject: true}});
       return booksList;
    }

    async searchBooks(title: String){
        const booksList = await MariaDBDataSource.manager.find(Book, {relations: {subject: true}, where: { title: Like(`%${title}%`) } });
        return booksList;
     }
     
    async insertBook(book: Book){
        await MariaDBDataSource.manager.save(book);        
    }

    async getBook(id: number) {
        const livro = await MariaDBDataSource.manager.findOne(Book, {relations: {subject: true}, where: {id}})  
        return livro
    }

    async updateBook(updatedBook: Book, id: number){
        const livro = await MariaDBDataSource.manager.findOneBy(Book, {id})
        livro.title = updatedBook.title
        livro.author = updatedBook.author
        livro.subject = updatedBook.subject
        livro.publication_date = updatedBook.publication_date
        await MariaDBDataSource.manager.save(Book, livro)
    }

    async deleteBook(id: number){
        await MariaDBDataSource.manager.delete(Book, id) 
    }

    async listSubjects(){
        const list = await MariaDBDataSource.manager.find(Subject);
        return list;
    }

    async insertSubject(subject: Subject){
        await MariaDBDataSource.manager.save(subject);
    }

}
