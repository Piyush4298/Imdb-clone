import React from 'react';

function Pagination(props) {
    
    return (
        <div className='w-full flex justify-center mb-8 mt-4'>
            <button className='p-2 border-2 border-indigo-500 text-indigo-500 border-r-0 rounded-l-xl' onClick={props.prvPage}>Prev</button>

            <button className='p-2 border-2 border-indigo-500 text-indigo-500 bg-gray-300'>{props.pageNum}</button>

            <button className='p-2 border-2 border-indigo-500 text-indigo-500 border-l-0 rounded-r-xl' onClick={props.nxtPage}>Next</button>
        </div>
    );
}

export default Pagination;
