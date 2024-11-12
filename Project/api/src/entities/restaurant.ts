import {
    Entity,
    ObjectId,
    ObjectIdColumn,
    Column,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class MenuItems {
    @PrimaryColumn()
    _id!: ObjectId;

    @Column()
    name!: string;

    @Column()
    price!: number;

    @Column()
    availability!: boolean;
}

@Entity()
export class Restaurant {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    addressId!: string;

    @Column()
    name!: string;

    @Column(() => MenuItems)
    menuItems!: MenuItems;
}
