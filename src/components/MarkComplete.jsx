import React from 'react'
import { IoMdDoneAll } from "react-icons/io";
export default function MarkComplete({ tasks, setTasks, taskId }) {
    const handleComplete = () => {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].status = 'Complete';
        setTasks(updatedTasks);
    };
    return (
        <IoMdDoneAll size={25} color='green' onClick={handleComplete} />
    )
}
