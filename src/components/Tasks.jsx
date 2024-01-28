import React, { useState, useEffect, useContext } from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import {
  Card,
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
import { useSearchParams } from 'react-router-dom'
import AddForm from './AddForm'
import { cn } from '@/lib/utils';
import EditForm from './EditForm';
import FilterContext from '@/contexts/FilterContext';

export default function Tasks({ text }) {
  const [searchParams] = useSearchParams()  //take out the view param from the url
  const [tasks, setTasks] = useState([])
  const { filter } = useContext(FilterContext)

  // Retrieve tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Update local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const viewstyle = searchParams.get('view') === 'grid' ? 'grid gap-x-4 gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'flex flex-col gap-y-6';

  const handleDelete = (index) => {
    // Remove the task from the tasks array
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  }

  //search and filter functionality
  const displayedTasks = tasks.filter((task) => {
    return task.title.toLowerCase().includes(text.toLowerCase()) && (filter.status.value === 'none' || task.status === filter.status.value) && (filter.category.value === 'none' || task.category === filter.category.value);
  })

  //mapping the tasks to cards
  const tasksCard = displayedTasks.map((task, index) => {
    return (
      <Card key={index} className='group'>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{task.description}</CardDescription>
        </CardContent>
        <CardFooter className='flex'>
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
          <div className='flex-1 hidden justify-end ml-4 gap-1 group-hover:flex'>
            <EditForm tasks={tasks} setTasks={setTasks} taskIndex={index} />
            <MdDelete size={25} color='red' onClick={handleDelete} />
          </div>
        </CardFooter>
      </Card>
    )
  })
  return (
    <MaxWidthWrapper>
      <div className={cn(viewstyle, ' min-h-52 pb-10')}>
        {tasksCard}
        <AddForm tasks={tasks} setTasks={setTasks} />
      </div>
    </MaxWidthWrapper>
  )
}