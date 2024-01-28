import React, { useState } from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import SearchBox from './SearchBox'
import Tasks from './Tasks'
import ViewButton from './ViewButton'
import FilterButton from './FilterButton'

export default function Home() {
  const [text, setText] = useState('');
  return (
    <>
      <MaxWidthWrapper>
        <div className='py-16 mx-auto text-center flex flex-col items-center max-w-3xl'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Your Ultimate  Destination for <span className='bg-gradient-to-r from-yellow-500 to-primary inline-block text-transparent bg-clip-text'>Task management</span>
          </h1>
          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
            Welcome to TaskCraft, your go-to platform for efficient task management. Stay organized and boost your productivity with our powerful features
          </p>
          <div className='mt-12 w-full flex justify-between gap-8'>
            <SearchBox text={text} setText={setText} />
            <div className='flex gap-8'>
              <FilterButton />
              <ViewButton />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      <Tasks text={text} />
    </>
  )
}
