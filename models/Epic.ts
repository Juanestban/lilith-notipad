import { Schema, model, models } from 'mongoose';

import { removeIdDefault } from '@lilith/utils/removeIdDefault';

const EpicSchemaBase = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: String,
});

const EpicSchema = removeIdDefault(EpicSchemaBase);

const Epic = models.Epics || model('Epics', EpicSchema);

export { Epic };
