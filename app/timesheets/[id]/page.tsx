
async function getTimesheet(timesheetId: string) {
    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/timesheets/records/${timesheetId}`,
        {
            next: { revalidate: 10},
        }
    );
    const data = await res.json();

    return data;
}

async function getTimesheetDays(timesheetId: string) {
    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/timesheet_days/records?timesheetId=${timesheetId}`,
        { cache: 'no-store' }
    );
    const data = await res.json();

    return data?.items as any[]}

export default async function TimesheetPage({ params }: any) {
    const timesheet = await getTimesheet(params.id);
    const timesheeDays = await getTimesheetDays(params.id);

    return (
        <div>
            <h1>timesheets/{timesheet.id}</h1>
            <div>
                <h3>{timesheet.month}</h3>
                <p>{timesheet.created}</p>
            </div>
            <div>
                {timesheeDays?.map((timesheet_day) => {
                    return <TimesheetDay key={timesheet_day.id} timesheet_day={timesheet_day} />;
                })}
            </div>
        </div>
    )
}

function TimesheetDay({timesheet_day}: any) {
    const {id, timesheetId, dayNumber, created } = timesheet_day || {};

    return (
        <div>
            <h2>{dayNumber}</h2>
            <p>{created}</p>
        </div>
    );
}