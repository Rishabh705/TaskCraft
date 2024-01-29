import React from 'react'
import { Input } from './ui/input'

export default function Form({ formData, setFormData }) {
    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    return (

        <div className="p-4 pb-0">
            <form>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <Input type="text" name="title" value={formData.title} onChange={handleFormChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder='Enter task title' required />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleFormChange} rows="3" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-500 rounded-md p-3" placeholder='Enter task description'></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select name="category" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleFormChange} value={formData.category} required>
                        <option value="">Select Category</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">Due Date</label>
                    <Input type="date" name="due_date" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={formData.due_date} onChange={handleFormChange} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select name="status" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleFormChange} value={formData.status} required>
                        <option value="">Select Status</option>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </form>
        </div>

    )
}
