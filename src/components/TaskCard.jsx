import React from 'react'
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { MdDelete } from "react-icons/md";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from './ui/button'
import EditForm from './EditForm';
import MarkComplete from './MarkComplete';
import TimeLeft from './TimeLeft';

export default function TaskCard({ task, tasks, setTasks, index, handleDelete }) {
    return (
        <>
            <CardHeader className='flex flex-row items-center justify-between'>
                <CardTitle className='font-normal'>{task.title.substring(0, 25)} {task.title.split("").length > 28 && "..."}</CardTitle>
                <div className={` ${task.status === 'Completed' ? 'hidden' : 'block'}`}>
                    <TimeLeft task={task} />
                </div>
            </CardHeader>
            <CardContent className='overflow-hidden'>
                <CardDescription>{task.description.substring(0, 80)} {task.description.split("").length > 28 && "..."}</CardDescription>
            </CardContent>
            <CardFooter className='flex w-full items-center justify-between absolute bottom-0'>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">Details</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="space-y-2">
                            <div className='flex justify-between items-center'>
                                <p className="text-sm font-medium text-gray-700">Category</p>
                                <p className="text-sm text-gray-500">{task.category}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className="text-sm font-medium text-gray-700">Due Date</p>
                                <p className="text-sm text-gray-500">{task.due_date}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className="text-sm font-medium text-gray-700">Status</p>
                                <p className="text-sm text-gray-500">{task.status}</p>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                <div className='justify-end gap-1 hidden group-hover:flex'>
                    <EditForm tasks={tasks} setTasks={setTasks} taskIndex={index} />
                    <MdDelete size={25} color='red' onClick={handleDelete} />
                    <div className={`hidden ${task.status === 'Completed' ? '' : 'group-hover:flex'}`}>
                        <MarkComplete tasks={tasks} setTasks={setTasks} taskIndex={index} />
                    </div>
                </div>
            </CardFooter>
        </>
    )
}
