
import Task from "../models/task-models.js";

export async function addTask(req, res) {
    try {
        const { taskName, desc, priority } = req.body;

        if (!taskName) {
            return res.status(400).json({ message: "Task name is required" });
        }

        const newTask = await Task.create({
            title: taskName,
            description: desc,
            priority: priority,
            assignedTo: req.user.id,
            lastUpdatedAt: new Date(),
        });

        res.status(201).json({
            success: true,
            data: newTask,
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function getAllTasks(req, res) {
    try {
        const tasks = await Task.find({
            assignedTo: req.user.id,
        }).sort({ updatedAt: -1 });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks,
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error" });
    }
}


export async function getTaskById(req, res) {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            assignedTo: req.user.id,
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({
            success: true,
            data: task,
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error" });
    }
}


export async function updateTask(req, res) {
    try {
        const { status, remarks } = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                assignedTo: req.user.id,
            },
            {
                status,
                remarks,
                lastUpdatedAt: new Date(),
            },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({
            success: true,
            data: updatedTask,
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error" });
    }
}


export async function deleteTask(req, res) {
    try {
        const deletedTask = await Task.findOneAndDelete({
            _id: req.params.id,
            assignedTo: req.user.id,
        });

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error" });
    }
}   