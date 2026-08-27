import React from 'react';

import { Hours } from '@the7ofdiamonds/ui-ux';

import styles from './WorkDay.module.scss';

interface WorkDayComponentProps {
    hours: Hours | null;
}

export const WorkDayComponent: React.FC<WorkDayComponentProps> = ({ hours }) => {
    return (
        <>
            {hours &&
                <tr className={styles['office-hours-day']}>
                    <td><h3 className={styles.day}>{hours.dayofweek}</h3></td>
                    <td><h4 className={styles.hours}>
                        {hours.start && hours.end && hours.open
                            ? `${hours.start} - ${hours.end}`
                            : 'CLOSED'}
                    </h4></td>
                </tr>
            }
        </>
    )
}