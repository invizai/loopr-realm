import {ObjectId} from 'bson';

class User {
  constructor({
    name,
    email,
    image = 'https://via.placeholder.com/200',
    created_at = new Date().toISOString(),
    id = new ObjectId(),
    partition = 'Loopr'
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.email = email;
    this.image = image;
    this.created_at = created_at;
  }

   static schema = {
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
}

class Project {
  constructor({
    name,
    user,
    description,
    created_at = new Date().toISOString(),
    id = new ObjectId(),
    partition = 'Loopr'
  }) {
    this._id = id;
    this._partition = partition;
    this.name = name;
    this.description = description;
    this.created_at = created_at;
    this.user_id = user;
  }

  static schema = {
    name: 'Project',
    properties: {
      _id: 'objectId',
      _partition: 'string',
      created_at: 'string',
      description: 'string',
      name: 'string',
      user_id: 'objectId?',
    },
    primaryKey: '_id',
  };
}

class Product {
  constructor({
    product_id,
    project,
    product_title,
    product_link,
    query,
    rank,
    relevance = SCORE_NOT_MARKED,
    product_image = 'https://via.placeholder.com/256',
    partition = 'Loopr',
    created_at = new Date().toISOString(),
    id = new ObjectId()
  }) {
    this._id = id;
    this._partition = partition;
    this.product_id = product_id;
    this.project_id = project;
    this.product_title = product_title;
    this.product_link = product_link;
    this.query = query;
    this.rank = rank;
    this.relevance = relevance;
    this.product_image = product_image;
    this.created_at = created_at;
  }

  static SCORE_NOT_MARKED = 0;
  static SCORE_OFF_TOPIC = 1;
  static SCORE_ACCEPTABLE = 2;
  static SCORE_GOOD = 3;
  static SCORE_EXCELLENT = 4;

  static schema = {
    name: 'Product',
    properties: {
      _id: 'objectId',
      _partition: 'string',
      created_at: 'string?',
      product_id: 'string',
      product_image: 'string',
      product_link: 'string',
      product_title: 'string',
      project_id: 'objectId?',
      query: 'string',
      rank: 'int',
      relevance: 'int',
    },
    primaryKey: '_id',
  };
}


export {User, Project, Product}