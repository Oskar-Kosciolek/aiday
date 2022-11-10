'use client';

import { useRouter } from "next/navigation";
import Icon from '@mdi/react'
import { mdiPencil } from '@mdi/js'
import Router from "next/router";

function EditButton(props: any) {
    const { timesheetId } = props || {};

    const router = useRouter();
    
    const handleEdit = async (timesheetId: string) => {
        router.push(`/timesheets/${timesheetId}`)
    }

  return (
    <button 
        onClick={() => handleEdit(timesheetId)}
        className='@3xs:flex-1 justify-center items-center @3xs:grow my-auto py-2 inline-flex text-center rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9 @3xs:w-auto'
    >
        <Icon path={mdiPencil} size={0.8} className='@3xs:mr-1 my-auto' />
        <span className='hidden @3xs:block'>Edit</span>
    </button>
  )

}

export default EditButton