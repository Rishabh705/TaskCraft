import React, { useState, useEffect, useContext } from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import {
  Card
} from "@/components/ui/card"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSearchParams } from 'react-router-dom'
import AddForm from './AddForm'
import { cn } from '@/lib/utils';
import FilterContext from '@/contexts/FilterContext';
import ViewButton from './ViewButton'
import FilterButton from './FilterButton'
import TaskCard from './TaskCard';

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
      <Draggable key={index} draggableId={task.id} index={index} >
        {provided => (
          <Card {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={`group relative h-52 ${task.status === 'Completed' ? 'bg-green-200' : ''}`} >
            <TaskCard task={task} tasks={tasks} setTasks={setTasks} index={index} handleDelete={handleDelete} />
          </Card>
        )}
      </Draggable>
    )
  })

  const handleOnDrag = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  }

  return (
    <MaxWidthWrapper>
      <div className='mb-2 flex justify-between'>
        <h1 className='text-2xl font-semibold'>Your Tasks</h1>
        <div className='flex gap-8'>
          <FilterButton />
          <ViewButton className='hidden md:block' />
        </div>
      </div>
      <DragDropContext onDragEnd={handleOnDrag}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className={cn(viewstyle, ' min-h-52 pb-10')}>
              {tasksCard}
              {provided.placeholder}
              <AddForm tasks={tasks} setTasks={setTasks} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </MaxWidthWrapper>
  )
}