import { Schema, model, models, Types } from 'mongoose';

import { removeIdDefault } from '@lilith/utils/removeIdDefault';

const EpicSchemaBase = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: String,
  userId: {
    type: Types.ObjectId,
    require: true,
  },
});

const EpicSchema = removeIdDefault(EpicSchemaBase);

const Epic = models.Epics || model('Epics', EpicSchema);

export { Epic };
