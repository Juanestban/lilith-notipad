import mongoose from 'mongoose';

const { MONGODB_ATLAS_USERNAME, MONGODB_ATLAS_PASSWORD, NODE_ENV } = process.env;
const database = NODE_ENV === 'production' ? 'notipadDB' : 'notipadDB_development';
const isProduction = NODE_ENV === 'production';
const urlMongo = `mongodb+srv://${MONGODB_ATLAS_USERNAME}:${MONGODB_ATLAS_PASSWORD}@lilith-notipad.qzy3ydb.mongodb.net/${database}?retryWrites=true&w=majority`;
const uri = isProduction ? process.env.MONGODB_URI : urlMongo;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('mongodb is connected'))
  .catch((error) => console.error(`error in connection to database => ${error}`));

const connect = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('mongodb is connected'))
    .catch((error) => console.error(`error in connection to database => ${error}`));
};

export default connect;
