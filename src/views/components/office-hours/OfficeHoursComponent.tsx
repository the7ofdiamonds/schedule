import React from 'react';

import { Hours } from '@the7ofdiamonds/ui-ux';

import styles from './OfficeHours.module.scss';

interface OfficeHoursComponentProps {
    title: string | null;
    officeHours: Array<Hours> | null;
}

export const OfficeHoursComponent: React.FC<OfficeHoursComponentProps> = ({ title, officeHours }) => {
    return (
        <>
            {officeHours && officeHours.length > 0 && (
                <div className={styles['office-hours-card']}>
                    <h3 className='title'>{title ?? 'Hours Of Operation'}</h3>
                    <table>
                        <tbody>
                            {officeHours.map((hours, index) => (
                                <tr className={styles['office-hours-day']} key={index}>
                                    <td><h4 className={styles.day}>{hours.dayofweek}</h4></td>
                                    <td><h4 className={styles.hours}>
                                        {hours.start && hours.end && hours.open
                                            ? `${hours.start} - ${hours.end}`
                                            : 'CLOSED'}
                                    </h4></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}