'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Icon from '@mdi/react'
import { mdiInformationOutline, mdiPencil, mdiPlus } from '@mdi/js'
import Router from "next/router";

function AddButton(props: any) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();

    const handleAdd = async (month: string) => {
        await fetch(`/api/timesheets/timesheets`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                month: month,
            }),
        });

        router.refresh();
    }

    const months: string[] = props.months;

  return (
    <>
    {months.length > 0 && 
        <div className='relative'>
        <button 
            onClick={(e) => setDropdownOpen(!dropdownOpen)}
            data-toggle="dropdown"
            className={`${dropdownOpen ? "sm:rounded-l-full sm:rounded-tr-none rounded-t-full" : "rounded-full"} justify-center items-center my-auto py-2 inline-flex text-center bg-green-600 text-white shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9 @3xs:w-auto`}
        >
            <Icon path={mdiPlus} size={1}/>
            <span className='sr-only'>Add new timesheet</span>
        </button>
        {dropdownOpen &&
            <ul className='absolute -translate-x-2/4 left-2/4 translate-y-0 sm:translate-x-9 sm:-translate-y-9 sm:left-0 bg-green-600 rounded-lg sm:rounded-tl-none w-72'>
                {months?.map((month) => {
                    return <li onClick={() => handleAdd(month)} className='p-1 pl-3 pr-3 hover:bg-green-700 hover:shadow-lg hover:cursor-pointer rounded-lg'>{month}</li>;
                })}
                <li className='flex items-center p-1 pl-3 pr-3 rounded-lg text-slate-300 min-h-9'>
                    <Icon path={mdiInformationOutline} size={1}/>
                    <span className='ml-2'>Missing months? Contact administrator.</span>
                </li>
            </ul>
        }
    </div>
    }
    </>
  )

}

export default AddButton