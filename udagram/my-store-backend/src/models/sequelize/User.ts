// src/models/User.ts 
import { Table, Column, Model, DataType } from 'sequelize-typescript'; 

@Table export class User extends Model<User> {
    @Column({ 
        type: DataType.INTEGER, 
        primaryKey: true, autoIncrement: true 
    }) 
    id!: number; 

    @Column({ 
        type: DataType.STRING(50), 
        allowNull: false 
    }) 
    fullName!: string; 

    @Column({ 
        type: DataType.STRING(100), 
        allowNull: false 
    }) 
    password!: string;
}

// src/models/Product.ts
//import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Product extends Model<Product> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false
  })
  price!: number;

  @Column({
    type: DataType.STRING(200)
  })
  url!: string;

  @Column({
    type: DataType.STRING(50)
  })
  description!: string;
}
