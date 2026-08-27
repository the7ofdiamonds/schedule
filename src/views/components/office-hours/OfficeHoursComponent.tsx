import React from 'react';

import { OfficeHours } from '@the7ofdiamonds/ui-ux';

import { WorkDayComponent } from '../work-day/WorkDayComponent';

import styles from './OfficeHours.module.scss';

interface OfficeHoursComponentProps {
    title: string | null;
    officeHours: OfficeHours | null;
}

export const OfficeHoursComponent: React.FC<OfficeHoursComponentProps> = ({ title, officeHours }) => {
    return (
        <>
            {officeHours && (
                <div className={styles['office-hours-card']}>
                    <h3 className='title'>{title ?? 'Hours Of Operation'}</h3>
                    <table>
                        <tbody>
                            <WorkDayComponent hours={officeHours.sun} />
                            <WorkDayComponent hours={officeHours.mon} />
                            <WorkDayComponent hours={officeHours.tue} />
                            <WorkDayComponent hours={officeHours.wed} />
                            <WorkDayComponent hours={officeHours.thu} />
                            <WorkDayComponent hours={officeHours.fri} />
                            <WorkDayComponent hours={officeHours.sat} />
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}