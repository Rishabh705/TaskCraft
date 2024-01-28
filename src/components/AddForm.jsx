import React, { useState } from 'react'
import {
    Drawer,
    DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose
} from "@/components/ui/drawer"
import { Button } from './ui/button'

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { FiPlusCircle } from "react-icons/fi"
import Form from './Form'

export default function AddForm({ setTasks, tasks }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        due_date: '',
        status: '',
    })
    const handleSubmit = (e) => {
        e.preventDefault()

        // update state
        const updatedTasks = [...tasks, formData];
        setTasks(updatedTasks);

        // Clear form data
        setFormData({
            title: '',
            description: '',
            category: '',
            due_date: '',
            status: '',
        })
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Card className='flex flex-col justify-center items-center hover:bg-secondary'>
                    <CardContent className='p-6 flex flex-col justify-center items-center'>
                        <FiPlusCircle className="text-4xl text-gray-500" />
                    </CardContent>
                </Card>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Add a task</DrawerTitle>
                        <DrawerDescription>Fill in the form to add a task.</DrawerDescription>
                    </DrawerHeader>

                    <Form formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
                    
                    <DrawerFooter>
                        <Button onClick={handleSubmit}>Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
