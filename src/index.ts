import express, { response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/api/tasks', (request, response) => {
    response.send([
        {id: 1, title: 'Первый таск', isDone: true},
        {id: 2, title: 'Второй таск', isDone: true},
        {id: 3, title: 'Третий таск', isDone: false},
        {id: 4, title: 'Четвертый таск', isDone: true},
        {id: 5, title: 'Пятый таск', isDone: false},
    ]);
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});