import React, { useState } from 'react';
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { messages } from '../../helpers/calendar-messages-es';
import moment from 'moment';

import 'moment/locale/es-mx';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventCleanEvent, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);



export const CalendarPage = () => {


    const { activeEvent, events } = useSelector(state => state.calendar)

    const dispatch = useDispatch();
    
    const [lastview, setlastview] = useState(localStorage.getItem('lastView') || 'month');


    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());

    }

    const onSelectEvent = (e) => {

        dispatch(eventSetActive(e));

    }

    const onViewChange = (e) => {
        setlastview(e);
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = (e) => {

        dispatch (eventCleanEvent() );


    }







    const eventStyleGetter = (event, start, end, isSelected) => {


        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'

        }

        return {
            style
        }

    }
    return (
        <div className="calendar-screen">

            <Navbar />


            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={ onSelectSlot }
                selected={ true }
                view={lastview}
                components={{
                    event: CalendarEvent
                }}
            />



            <CalendarModal />
            <AddNewFab />

            {
                 (activeEvent)  &&

                <DeleteEventFab/>

            }
        
              
            




        </div>
    )
}
