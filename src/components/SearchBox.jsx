'use client'
import { Input } from "./ui/input";

const SearchBox = ({text,setText}) => {
    const handleChange = (evt) => {
        setText(evt.target.value);
    }

    return (
        <div className='w-4/5'>
            <div className="relative flex w-full items-stretch">
                <Input type='text' placeholder='Find tasks in a flash...' value={text} onChange={handleChange}/>
            </div>
        </div>
    )
}

export default SearchBox