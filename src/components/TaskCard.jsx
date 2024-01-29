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
import { useSearchParams } from 'react-router-dom';

export default function TaskCard({ task, tasks, setTasks, index, handleDelete }) {
    const [searchParams] = useSearchParams()  //take out the view param from the url
    const isGrid = searchParams.get('view') === 'grid' ? true : false;

    return (
        <>
            <CardHeader className='pb-2'>
                <div className={`pb-1 ${task.status === 'Complete' ? 'hidden' : 'block'}`}>
                    <TimeLeft task={task} />
                </div>
                <CardTitle className='font-normal'>{isGrid ? task.title.substring(0, 25):task.title.substring(0, 50)} {isGrid ? task.title.split("").length > 28 && "..." : task.title.split("").length > 50 && "..."}</CardTitle>
            </CardHeader>
            <CardContent className=''>
                <CardDescription className='break-all'>{isGrid?task.description.substring(0, 200):task.description.substring(0, 300)} {isGrid?task.description.split("").length > 28 && "...":task.description.split("").length > 60 && "..."}</CardDescription>
            </CardContent>
            <CardFooter className='flex w-full items-center justify-between'>
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
                    <MdDelete size={25} color='red' onClick={()=>handleDelete(task.id)} />
                    <div className={`hidden ${task.status === 'Complete' ? '' : 'group-hover:flex'}`}>
                        <MarkComplete tasks={tasks} setTasks={setTasks} taskId={task.id} />
                    </div>
                </div>
            </CardFooter>
        </>
    )
}
