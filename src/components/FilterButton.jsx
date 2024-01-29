import React, { useContext } from 'react';
import { Button } from './ui/button';
import { FaFilter } from "react-icons/fa";
import FilterContext from '@/contexts/FilterContext';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
export default function FilterButton({ className }) {
    const { filter, setFilter } = useContext(FilterContext);

    const handleChange = (filterType, value) => {
        setFilter((prev) => {
            return {
                ...prev,
                [filterType]: {
                    value: value,
                },
            };
        });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button><FaFilter /></Button>
            </PopoverTrigger>
            <PopoverContent className='flex flex-col gap-4'>
                <Select onValueChange={(value) => handleChange('status', value)} value={filter.status.value} className='w-full'>
                    <SelectTrigger>
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">Status</SelectItem>
                        <SelectItem value="Incomplete">Incomplete</SelectItem>
                        <SelectItem value="Complete">Complete</SelectItem>
                    </SelectContent>
                </Select>
                <Select onValueChange={(value) => handleChange('category', value)} value={filter.category.value}>
                    <SelectTrigger>
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">Category</SelectItem>
                        <SelectItem value="Work">Work</SelectItem>
                        <SelectItem value="Personal">Personal</SelectItem>
                    </SelectContent>
                </Select>
            </PopoverContent>
        </Popover>
    );
}
