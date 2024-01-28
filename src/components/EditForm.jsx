import React, { useState } from 'react'
import {
    Drawer,
    DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose
} from "@/components/ui/drawer"
import { Button } from './ui/button'
import { FaEdit } from "react-icons/fa";
import Form from './Form'

export default function EditForm({ setTasks, tasks, taskIndex }) {
    const [formData, setFormData] = useState({
        title: tasks[taskIndex]?.title || '',
        description: tasks[taskIndex]?.description || '',
        category: tasks[taskIndex]?.category || '',
        due_date: tasks[taskIndex]?.due_date || '',
        status: tasks[taskIndex]?.status || '',
    })
    const handleSubmit = (e) => {
        e.preventDefault();

        // update task at the specified index
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = formData;
        setTasks(updatedTasks);
    }
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <FaEdit size={25} color='green' />
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Edit the task</DrawerTitle>
                        <DrawerDescription>Fill in the form to edit the task.</DrawerDescription>
                    </DrawerHeader>

                    <Form formData={formData} setFormData={setFormData} />

                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button onClick={handleSubmit}>Submit</Button>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer >
    )
}
