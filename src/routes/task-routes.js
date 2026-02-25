import express from 'express';
import {
    addTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} from "../controllers/task-controller.js";


import { authMiddleware } from '../middleware/auth-middleware.js';

const router = express.Router();
router.post('/add-task', authMiddleware, addTask);
router.get("/get-all-task", authMiddleware, getAllTasks);
router.get("/get-task/:id", authMiddleware, getTaskById);
router.put("/update-task/:id", authMiddleware, updateTask);
router.delete("/delete-task/:id", authMiddleware, deleteTask);


export default router;