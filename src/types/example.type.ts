export interface IExample {
  _id?: string;
  title: string;
  description?: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IExampleDocument extends IExample, Document {}
