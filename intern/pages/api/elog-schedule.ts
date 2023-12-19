// import block
import { allEngagementGradePatcher, patcherAndFetcher } from "@/app/dataObjectsForCompProps/engagementLoggerPipeline";
import { NextApiRequest, NextApiResponse } from "next";

// This code is to run at set intervals to update the engagement logger grades in the database so it can be fetched for used in the dashboard

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    try {
        // get the weeknumber
        const weekNumber = Number(req.query.weeknumber)
        // Run patcher
        await allEngagementGradePatcher(weekNumber);
        console.log(`Engagment Grades for week ${weekNumber} patched, next patch in 1 hour`);
        res.status(200).json({message: 'Engagment grade patch complete'})
    } catch (error) {
        console.error('Error in the scheduled patch', error);
        res.status(500).json({error: 'Internal server error'})
    };
}