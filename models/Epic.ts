import { Schema, model, models } from 'mongoose';

const EpicSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: String,
});

EpicSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Epic = models.Epics || model('Epics', EpicSchema);

export { Epic };
