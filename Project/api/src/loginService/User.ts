import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm";
import { USER_ROLES } from "./types/users.ts";
import { ObjectId as MongoObjectId } from "mongodb"; // Ensure proper import of Mongo ObjectId

@Entity()
export class User {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  role!: USER_ROLES;

  @Column()
  address?: MongoObjectId;

  @Column()
  restaurant?: MongoObjectId;
}
