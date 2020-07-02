import {ObjectId} from 'bson';

class Task {
  constructor({
    name,
    partition,
    status = Task.STATUS_OPEN,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.status = status;
  }

  static STATUS_OPEN = 'Open';
  static STATUS_IN_PROGRESS = 'InProgress';
  static STATUS_COMPLETE = 'Complete';

  static schema = {
    name: 'Task',
    properties: {
      _id: 'objectId',
      _partition: 'string',
      name: 'string',
      status: 'string',
    },
    primaryKey: '_id',
  };
}

export {Task};


export const UserSchema = {
  name: 'User',
  properties: {
    _id: 'objectId',
    _partition: 'string',
    created_at: 'string?',
    email: 'string?',
    image: 'string?',
    name: 'string',
  },
  primaryKey: '_id',
};

export const ProjectSchema = {
  name: 'Project',
  properties: {
    _id: 'objectId',
    _partition: 'string',
    created_at: 'string',
    description: 'string',
    name: 'string',
    user_id: 'User?',
  },
  primaryKey: '_id',
};

export const ProductSchema = {
  name: 'Product',
  properties: {
    _id: 'objectId',
    _partition: 'string',
    created_at: 'string?',
    product_id: 'string',
    product_image: 'string',
    product_link: 'string',
    product_title: 'string',
    project_id: 'Project?',
    query: 'string',
    rank: 'int',
    relevance: 'int',
  },
  primaryKey: '_id',
};
