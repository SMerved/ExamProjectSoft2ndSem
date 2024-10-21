import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Task {


  @ObjectIdColumn() 
  id!: ObjectId;

  @Column()
  text!: string;

  @Column()
  deadline!: string | undefined;

  @Column()
  isCompleted!: boolean;

  @Column()
  category!: number;
}