import express from 'express';
import bodyParser from 'body-parser';
import PeopleController from './controllers/PeopleController';

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const port = 3000;

app.get('/', PeopleController.index);
app.post('/', PeopleController.create);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
