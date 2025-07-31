import React from 'react'
import type { TypedUseSelectorHook } from 'react-redux';

import { Section } from '@the7ofdiamonds/ui-ux';

interface SchedulePageProps<RootState, AppDispatch> {
    useAppSelector: TypedUseSelectorHook<RootState>;
    useAppDispatch: () => AppDispatch;
}

export const SchedulePage: React.FC<SchedulePageProps<any, any>> = ({ useAppSelector, useAppDispatch }) => {
    return (
        <Section>
            SchedulePage
        </Section>
    )
}