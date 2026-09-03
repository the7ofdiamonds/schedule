import React from 'react';

import { OfficeHours } from '@the7ofdiamonds/ui-ux';

import { WorkDayComponent } from '../work-day/WorkDayComponent';

import styles from './OfficeHours.module.scss';

interface OfficeHoursComponentProps {
    officeHours: OfficeHours | null;
    title?: string | null;
}

export const OfficeHoursComponent: React.FC<OfficeHoursComponentProps> = ({ title, officeHours }) => {
    const { sun, mon, tue, wed, thu, fri, sat } = officeHours;

    return (
        <>
            {officeHours && (
                <div className={styles['office-hours-card']}>
                    <h3 className='title'>{title ?? 'Hours Of Operation'}</h3>
                    <table>
                        <tbody>
                            <WorkDayComponent hours={sun} />
                            <WorkDayComponent hours={mon} />
                            <WorkDayComponent hours={tue} />
                            <WorkDayComponent hours={wed} />
                            <WorkDayComponent hours={thu} />
                            <WorkDayComponent hours={fri} />
                            <WorkDayComponent hours={sat} />
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}