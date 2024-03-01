import { Column, Entity } from 'typeorm';
import Base from './Base';

@Entity('PRODUCT')
export default class ProductEntity extends Base {
  @Column({
    type: 'varchar2',
  })
  name: string;

  @Column({
    type: 'varchar2'
  })
  des: string;

  @Column({
    type: 'float'
  })
  price: number;
}
