import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "DELETE" && req.method !== "GET") {
        res.setHeader('Allow', ["GET", "DELETE"])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    try {
        if (req.method === "DELETE") {
            const { timesheetId } = req.query;

            const res = await fetch(`http://127.0.0.1:8090/api/collections/timesheets/records/${timesheetId}`, {
                method: "DELETE",
            });
        } else if (req.method === "GET") {
            if (req.query.timesheetId) {
                const res = await fetch(`http://127.0.0.1:8090/api/collections/timesheets/records/${timesheetId}`);
            } else {
                const res = await fetch(`http://127.0.0.1:8090/api/collections/timesheets/records`);
            }
        }

        const data = await res.json()
        res.status(200).json(data)
    } catch (e) {
        res.status(500).end(`An error occurred: ${e}`)
    }
}
