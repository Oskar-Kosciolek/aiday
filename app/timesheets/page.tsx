import Link from 'next/link';
import styles from './Timesheets.module.css';

import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import Icon from '@mdi/react'
import { mdiPencil,mdiDelete } from '@mdi/js'

async function getTimesheets() {
    // await sleep(3000);
    const res = await fetch(
        'http://127.0.0.1:8090/api/collections/timesheets/records?page=1&perPage=30',
        { cache: 'no-store' }
    );
    const data = await res.json();

    return data?.items as any[]
}

export default async function TimesheetsPage() {
    const timesheets = await getTimesheets();
    
    // console.log(timesheets);
    // const s = timesheets?.map((timesheet) => {
    //     return timesheet.id
    // })
    // console.log(s);

    return (
        <div>
            <h1 className='text-2xl m-5'>Timesheets</h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-5 text-center'>
                {timesheets?.map((timesheet) => {
                    return <Timesheet key={timesheet.id} timesheet={timesheet} />
                })}
            </div>
        </div>
    );
}

function Timesheet(props: any) {
    // console.log(timesheet);
    const { id, month, created } = props.timesheet || {};
    // console.log(id, month);

    // const month = 'april';
    // console.log(id);

    return (
        <div className='p-4 rounded-lg shadow-lg bg-pink-500'>
            <div className=''>
                <h2 className='font-bold'>{month}</h2>
                <div className='mt-2 mb-2'>
                    Worked: 150/168 h
                </div>
                <div className='@container flex gap-3 justify-center'>
                    <EditButton timesheetId={id} />
                    <DeleteButton timesheetId={id} />
                </div>
            </div>
        </div>
    );
}
