import React from 'react';
import { Button } from './ui/button';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

export default function ViewButton({ className }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentView = searchParams.get('view');
  const nextView = currentView === 'grid' ? 'list' : 'grid';

  const handleClick = () => {
    setSearchParams({ view: nextView });
  };

  return (
    <Button onClick={handleClick} className={className}>
      {currentView === 'grid' ? <BsFillGrid3X3GapFill /> : <FaThList />}
    </Button>
  );
}
