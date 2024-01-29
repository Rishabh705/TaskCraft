import React from 'react'
import { IoMdDoneAll } from "react-icons/io";
export default function MarkComplete({ tasks, setTasks, taskIndex }) {
    const handleComplete = () => {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].status = 'Completed';
        setTasks(updatedTasks);
    };
    return (
        <IoMdDoneAll size={25} color='green' onClick={handleComplete}/>
    )
}
