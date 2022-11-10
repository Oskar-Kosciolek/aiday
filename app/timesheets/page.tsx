import Link from 'next/link';
import styles from './Timesheets.module.css';

import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import AddButton from './AddButton';

async function getTimesheets() {
    const res = await fetch(
        'http://127.0.0.1:8090/api/collections/timesheets/records?page=1&perPage=30',
        { cache: 'no-store' }
    );
    const data = await res.json();

    return data?.items as any[]
}

export default async function TimesheetsPage() {
    let timesheets = await getTimesheets();

    const monthsList: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    timesheets.sort((a, b) => monthsList.indexOf(a.month) - monthsList.indexOf(b.month));
    
    
    const timesheetMonths = timesheets.map((timesheet) => {
        return timesheet.month;
    });
    


    const availableMonthsList = monthsList.filter(function (item) {
        return timesheetMonths.indexOf(item) === -1;
    });


    return (
        <div>
            <div className='flex items-center'>
                <h1 className='text-2xl m-5'>Timesheets</h1>
                <AddButton months={availableMonthsList}/>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-5 text-center'>
                {timesheets?.map((timesheet) => {
                    return <Timesheet key={timesheet.id} timesheet={timesheet} />
                })}
            </div>
        </div>
    );
}

function Timesheet(props: any) {
    const { id, month, created } = props.timesheet || {};

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
