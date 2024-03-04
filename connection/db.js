const mongooes = require('mongoose');
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

const db_pass = (process.env.DB_PASS);
const db_name = process.env.DB_NAME

const url = `mongodb+srv://Ravi_1997:${db_pass}@cluster0.eij6wnz.mongodb.net/${db_name}?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongooes.set("strictQuery", false);

mongooes.connect(url, connectionParams).then(
    () => {
        console.log(`Connection successfull 😃`);
    })
    .catch((err) => {
        console.log(`Error in connection -> 😢 ${err} `);
    });