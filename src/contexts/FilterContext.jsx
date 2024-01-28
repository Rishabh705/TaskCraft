import React, { createContext, useState } from 'react';

const FilterContext = createContext();

export function FilterProvider({ children }) {
  

  //filtering state
  const [filter,setFilter] = useState({
   status:{
    value:"none",
   },
   category:{
    value:"none",
   },
  })

  return (
    <FilterContext.Provider value={{ filter, setFilter}}>
      {children}
    </FilterContext.Provider>
  );
}

export default FilterContext;