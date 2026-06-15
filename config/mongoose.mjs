import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
// const database = NODE_ENV === 'production' ? 'notipadDB' : 'notipadDB_development';
const database = 'notipadDB';
const urlMongo = `mongodb+srv://${MONGODB_ATLAS_USERNAME}:${MONGODB_ATLAS_PASSWORD}@lilith-notipad.qzy3ydb.mongodb.net/appName=${database}?retryWrites=true&w=majority`;

const connect = () => {
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('mongodb is connected'))
    .catch((error) => console.error(`error in connection to database => ${error}`));
};

export default connect;
