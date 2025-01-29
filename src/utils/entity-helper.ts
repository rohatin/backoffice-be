import { instanceToPlain } from 'class-transformer'
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

export class EntityHelper extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date | null = null

  //see https://github.com/typeorm/typeorm/issues/2285 for more details
  /**
   * Loads a relation of this entity.
   * @param relationKey - The relation key to load.
   * @param shouldLoadMany - Whether to load a single entity or many.
   * @returns The loaded relation.
   * @throws Error if the relation key is empty.
   */
  async loadRelation<T>(
    relationKey: string,
    shouldLoadMany?: boolean
  ): Promise<T> {
    if (relationKey.trim().length === 0) {
      throw new Error('Cannot load empty relation.')
    }

    shouldLoadMany = shouldLoadMany ?? relationKey.endsWith('s')

    const staticAccessor = this.constructor as any
    const relationQuery = staticAccessor
      .createQueryBuilder()
      .relation(staticAccessor, relationKey)
      .of(this)
    const relationValue: T = shouldLoadMany
      ? await relationQuery.loadMany()
      : await relationQuery.loadOne()

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const currentEntity: any = this
    currentEntity[relationKey] = relationValue

    return relationValue
  }

  toJSON() {
    return instanceToPlain(this)
  }
}
