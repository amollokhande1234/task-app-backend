import mongoose, { mongo } from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: String,

        status: {
            type: String,
            enum: ["pending", "in_progress", "completed"],
            default: "pending",
        },

        remarks: {
            type: String,
            default: "",
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "low",
        },

        lastUpdatedAt: {
            type: Date,
            default: Date.now,
        }
    },
    { timestamps: true }
);

const taskModel = await mongoose.model('Task', taskSchema);

export default taskModel;