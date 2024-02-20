import { Schema, Model } from 'mongoose';

type NewSchema = Schema<any, Model<any, any, any, any, any>, {}, {}, {}, {}, 'type', any>;

export const removeIdDefault = <S = NewSchema>(shema: S) => {
  (shema as any).set('toJSON', {
    transform: (_: any, returnedObject: any) => {
      returnedObject.id = returnedObject._id;
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });

  return shema;
};
