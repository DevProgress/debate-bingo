import express from 'express';

const app = express();

app.use('/', express.static('dev'));
app.listen(process.env.PORT || 3000);
