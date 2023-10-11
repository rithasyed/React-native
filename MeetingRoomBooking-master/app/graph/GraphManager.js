/*
 * Meeting room Booking System
 *
 * Developed by Prishan Maduka on 11/5/19 5:30 PM.
 * Last modified 11/5/19 5:30 PM
 * Copyright (c) 2019. All rights reserved Prishan Maduka
 */

import {Client, ResponseType} from '@microsoft/microsoft-graph-client';
import {GraphAuthProvider} from './GraphAuthProvider';

//Setting the auth provider to an instance of GraphAuthProvider
const clientOptions = {
    authProvider: new GraphAuthProvider()
};

// Initialize the client
const graphClient = Client.initWithMiddleware(clientOptions);



export class GraphManager {

    static getEventsListAsync = async() => {
        return graphClient.api('/me/events')
            .header('Prefer','outlook.timezone="Asia/Colombo"')
            .select('subject,body,bodyPreview,organizer,attendees,start,end,location')
            .responseType(ResponseType.JSON)
            .get();
    };

    static getMeetingRoomListAsync = async() => {
        return graphClient.api('/me/findRooms')
            .version('beta')
            .responseType(ResponseType.JSON)
            .get();
    };

    static getScheduleByMeetingRoomAsync = async(meetingRoom) => {

        const scheduleInformation = {
            schedules: [meetingRoom],
            startTime: {
                dateTime: "2019-11-07T07:00:00",
                timeZone: "Asia/Colombo"
            },
            endTime: {
                dateTime: "2019-11-07T23:59:59",
                timeZone: "Asia/Colombo"
            }
        };

        graphClient.api('/me/calendar/getSchedule')
            .headers({'Prefer':'outlook.timezone="Asia/Colombo"'})
            .post(scheduleInformation)
            .then((res)=>{
                console.log(res.value[0].scheduleItems);
            }).catch((error)=>{
                console.log(error);
            });

    }

}

