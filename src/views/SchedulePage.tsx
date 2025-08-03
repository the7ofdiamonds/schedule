import React, { useState } from 'react'
import type { TypedUseSelectorHook } from 'react-redux';

import { Section } from '@the7ofdiamonds/ui-ux';
import { ScheduleComponent, type Hours } from './components/ScheduleComponent';
import { useNavigate } from 'react-router-dom';

interface SchedulePageProps<RootState, AppDispatch> {
    useAppSelector: TypedUseSelectorHook<RootState>;
    useAppDispatch: () => AppDispatch;
}

export const SchedulePage: React.FC<SchedulePageProps<any, any>> = ({ useAppSelector, useAppDispatch }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        scheduleLoading,
        scheduleError,
        events,
        start_date,
        start_time,
        event_id,
        event_date_time,
        summary,
        description,
        attendees,
        office_hours,
        communication_preferences,
    } = useAppSelector((state) => state.schedule);
    // const { user_email, user_id } = useAppSelector((state) => state.users);

    const [officeHours, setOfficeHours] = useState<Array<Hours>>([]);
    const [availableDates, setAvailableDates] = useState<Array<string>>([]);
    const [availableTimes, setAvailableTimes] = useState<Array<string>>([]);

    // useEffect(() => {
      //   if (office_hours) {
      //     setOfficeHours(formatOfficeHours(office_hours));
      //   }
      // }, [office_hours]);
    
      // Client info
      // useEffect(() => {
      //   if (user_email) {
      //     dispatch(getUser(user_email));
      //   }
      // }, [user_email]);
    
      // useEffect(() => {
      //   if (!user_email) {
      //     setMessageType('info');
      //     setMessage('Login to schedule an appointment');
      //   }
      // }, [user_email]);
    
      // Events
      // useEffect(() => {
      //   if (user_id) {
      //     dispatch(getAvailableTimes());
      //   }
      // }, [user_id, dispatch]);
    
      // useEffect(() => {
      //   if (scheduleError) {
      //     setMessageType('error');
      //     setMessage(scheduleError);
      //   }
      // }, [messageType, message]);
    
      // useEffect(() => {
      //   if (events) {
      //     setAvailableDates(datesAvail(events));
      //   }
      // }, [events]);

    return (
        <Section>
            <ScheduleComponent officeHours={officeHours} availableDates={availableDates} availableTimes={availableTimes} communicationPreferences={[]} />
        </Section>
    )
}