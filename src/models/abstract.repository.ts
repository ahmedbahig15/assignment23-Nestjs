import { Model, ProjectionType, QueryFilter, QueryOptions, UpdateQuery } from 'mongoose';

export abstract class AbstractRepository<T> {

   constructor(private _model: Model<T>) {}

   get model() {
    return this._model;
  }

    public async create(item: Partial<T>) {
      const doc = new this.model(item);
      return doc.save();
    }

    public async getOne(filter: QueryFilter<T>, projection?: ProjectionType<T>, options?: QueryOptions) {
      return this.model.findOne(filter, projection, options);
    }

    public async getAll(filter: QueryFilter<T>, projection?: ProjectionType<T>, options?: QueryOptions) {
      return this.model.find(filter, projection, options);
    }

    public async updateOne(filter: QueryFilter<T>, update: UpdateQuery<T>, options: QueryOptions = {}) {
      // options.returnDocument = "after";
      return this.model.findOneAndUpdate(filter, update, options);
    }

    public async deleteOne(filter: QueryFilter<T>) {
     return this.model.deleteOne(filter);
    }
}
