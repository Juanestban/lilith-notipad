import { Schema, model, models } from 'mongoose';

import { removeIdDefault } from '@lilith/utils/removeIdDefault';

const UserSchemaBase = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    unique: true,
  },
  description: String,
});

const UserSchema = removeIdDefault(UserSchemaBase);

const User = models.Users || model('Users', UserSchema);

export { User };
