import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "POST") {
        res.setHeader('Allow', ["POST"])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    const { month } = req.body;

    const result = await fetch('http://127.0.0.1:8090/api/collections/timesheets/records', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            month: month
        }),
    });

    const data = await result.json()
    res.status(200).json(data)
}
  