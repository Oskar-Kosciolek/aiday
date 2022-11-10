'use client';

import Icon from '@mdi/react'
import { mdiDelete } from '@mdi/js'

function DeleteButton(props: any) {
    const { timesheetId } = props || {};

    const handleDelete = async (timesheetId: string) => {
        const res = await fetch(`/api/timesheets/${timesheetId}`, {
            method: "DELETE",
        });

        const data = await res.json();
        return data?.status as number
    }

  return (
    <button 
        onClick={() => handleDelete(timesheetId)}
        className='@3xs:flex-1 justify-center items-center @3xs:grow my-auto py-2 inline-flex text-center rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9 @3xs:w-auto'
    >
        <Icon path={mdiDelete} size={0.8} className='@3xs:mr-1 my-auto' />
        <span className='hidden @3xs:block'>Delete</span>
    </button>
  )

}

export default DeleteButton