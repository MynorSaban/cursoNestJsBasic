
import { Breed } from '../../breed/entities/breed.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne } from 'typeorm';

@Entity() // @Entity() es un decorador de typescript que indica que esta clase es una entidad de la base de datos
export class Cat {
  //@PrimaryGeneratedColumn() esto hace exactamente lo mismo que la de abajo
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  // para eliminar el dato logicamente
  @DeleteDateColumn()
  deletedAt: Date;

  //VALIDACIONES CON LAS ENTIDADES PARA LA ASOCIACION DE LAS ENTIDADAES
  //tambien se quito el @Column() para que no se cree la columna en la base de datos
  // @Column()
  // breedId: number;
  // porque al final esto tiene toda la informacion
  @ManyToOne(() => Breed, (breed) => breed.id, {
    eager: true, // esto se hace para devolver la informacion de la relacion
    // esto es para no hacer una segunda consulta a la base de datos para la raza*
  })
  breed: Breed;
}