import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm"
import { Subject } from "./Subject"

@Entity('books')
export class Book {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable:false, length: 50 })
    title: string

    @ManyToOne(() => Subject, subject => subject.books)
    @JoinColumn({ name: 'subject' })
    subject: Subject

    @Column({ nullable:false,  length: 50 })
    author: string

    @Column({ nullable:false })
    publication_date: Date
}