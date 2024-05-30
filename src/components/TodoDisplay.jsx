import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TodoCard from './TodoCard';

export default function TodoDisplay() {
  const todoList = useSelector(state => state.todoList);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (searchQuery.length === 0)
      setIsSearching(false);
    else if (searchQuery.length > 0)
      setIsSearching(true);
    const temp = todoList?.filter(todo => todo.Task.includes(searchQuery));
    console.log("Filtered Data: ", temp);
    setFilteredData(temp);
  }, [searchQuery])

  return (
    <>
    <div className=' bg-slate-200 w-[800px] h-[600px] mt-10 rounded-lg shadow-[0_0_10px_0_gray] flex flex-col overflow-y-auto'>
      <div className='flex items-center justify-center mt-2'>
        <input type="text" value={searchQuery} onChange={(event) => {
          setSearchQuery(event.target.value);
          // setIsSearching(true);
        }} placeholder='Search' className='w-[660px] h-[36px] rounded-md'/>
      </div>
      <h1 className=' mt-2 ml-2 text-[24px]'>Tasks:</h1>
      <div className='flex flex-col items-center'>
        {
          (searchQuery?.length > 0) ? <>
          {
            filteredData?.map(todo => <TodoCard todo={todo}/>)
          }
          </> 
          : <>
        {
        todoList?.map(todo => {
          return (
            <>
            <TodoCard todo={todo}/>
            </>
          )
        })
      }
          </>
        }
      {/* {
        todoList?.map(todo => {
          return (
            <>
            <TodoCard todo={todo}/>
            </>
          )
        })
      } */}
      </div>
    </div>
    </>
  )
}
