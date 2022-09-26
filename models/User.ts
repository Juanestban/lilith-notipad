import { Schema, model, models } from 'mongoose';

import { removeIdDefault } from '@lilith/utils/removeIdDefault';

const UserSchemaBase = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  passwordHashed: {
    type: String,
    require: true,
  },
  rol: {
    type: String,
    require: true,
    uppercase: true,
    unum: ['GOD', 'HUMAN'],
    default: 'HUMAN',
  },
});

const UserSchema = removeIdDefault(UserSchemaBase);

const User = models.Users || model('Users', UserSchema);

export { User };
