import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Book } from './Book'

@Entity('subjects')
export class Subject {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable:false, length: 50 })
    name: string

    @OneToMany(() => Book, book => book.subject )
    books: Book[]
}