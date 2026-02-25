
import express from 'express';
import authRouter from './routes/auth-routes.js';
import taskRouter from './routes/task-routes.js';


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running');
});


// Auth Router
app.use('/api/auth', authRouter);

// Task Router
app.use('/api', taskRouter);

export default app;