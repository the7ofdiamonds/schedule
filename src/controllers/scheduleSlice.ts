import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { combineDateTimeToTimestamp, combineDateTime } from '../utils/Schedule';

import type { HoursObject } from '@the7ofdiamonds/ui-ux';
import { OfficeHours } from '@the7ofdiamonds/ui-ux';

type ScheduleState = {
  scheduleLoading: boolean;
  scheduleError: Error | null;
  scheduleErrorMessage: string | null;
  scheduleSuccessMessage: string | null;
  events: Array<EventObject> | null;
  event_id: number | null;
  invoice_id: string | null;
  start_date_time: string | null;
  end_date_time: string | null;
  summary: string | null;
  description: string | null;
  attendees: Array<string> | null;
  calendar_link: string | null;
  start_date: string | null;
  start_time: string | null;
  due_date: number | null | null;
  event_date_time: string | null;
  event: string | null;
  office_hours: Array<HoursObject> | null;
  communication_preferences: Array<string> | null;
  preferred_communication_type?: string | null;
  google_event_id: string | null;
};

const initialState: ScheduleState = {
  scheduleLoading: false,
  scheduleError: null,
  scheduleErrorMessage: null,
  scheduleSuccessMessage: null,
  events: null,
  event_id: null,
  invoice_id: null,
  start_date_time: null,
  end_date_time: null,
  summary: null,
  description: null,
  attendees: null,
  calendar_link: null,
  start_date: null,
  start_time: null,
  due_date: null,
  event_date_time: null,
  event: null,
  office_hours: null,
  communication_preferences: [],
  preferred_communication_type: null,
  google_event_id: null,
};

export const getOfficeHours = createAsyncThunk(
  'schedule/getOfficeHours',
  async () => {
    try {
      const response = await fetch(
        '/wp-json/seven-tech/v1/schedule/office-hours',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message;
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
);

export const getOfficeHoursLocalData = createAsyncThunk(
  'schedule/getOfficeHoursLocalData',
  async (availability: Array<HoursObject>) => {
    try {
      // console.log(new OfficeHours(availability))
      return availability;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
);

export const getAvailableTimes = createAsyncThunk(
  'schedule/getAvailableTimes',
  async () => {
    try {
      const response = await fetch(
        '/wp-json/seven-tech/v1/schedule/available-times',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message;
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
);

export const sendInvites = createAsyncThunk(
  'schedule/sendInvites',
  async (event: Event) => {
    try {
      const response = await fetch('/wp-json/orb/v1/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event.toEventObject()),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message;
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
);

export type EventObject = {
  id: string;
  client_id: string;
  event_id: string;
  invoice_id: string;
  start_date_time: string;
  end_date_time: string;
  attendees: Array<string>;
  calendar_link: string;
};

export class Event {
  id: string;
  clientID: string;
  eventID: string;
  invoiceID: string;
  startDateTime: string;
  endDateTime: string;
  attendees: Array<string>;
  calendarLink: string;

  constructor(event: Partial<EventObject>) {
    this.id = event.id || '';
    this.clientID = event.client_id || '';
    this.eventID = event.event_id || '';
    this.invoiceID = event.invoice_id || '';
    this.startDateTime = event.start_date_time || '';
    this.endDateTime = event.end_date_time || '';
    this.attendees = event.attendees || [];
    this.calendarLink = event.calendar_link || '';
  }

  toEventObject(): EventObject {
    return {
      id: this.id,
      client_id: this.clientID,
      event_id: this.eventID,
      invoice_id: this.invoiceID,
      start_date_time: this.startDateTime,
      end_date_time: this.endDateTime,
      attendees: this.attendees,
      calendar_link: this.calendarLink,
    };
  }
}

export const saveEvent = createAsyncThunk(
  'schedule/saveEvent',
  async (event: Event) => {
    try {
      const response = await fetch('/wp-json/orb/v1/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event.toEventObject()),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message;
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
);

export const getEvent = createAsyncThunk(
  'schedule/getEvent',
  async (id: string) => {
    try {
      const response = await fetch(`/wp-json/orb/v1/event/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message;
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
);

export const getClientEvents = createAsyncThunk(
  'schedule/getClientEvents',
  async (clientID: string) => {
    try {
      const response = await fetch(
        `/wp-json/orb/v1/events/client/${clientID}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message;
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
);

export const getCommunicationPreferences = createAsyncThunk(
  'schedule/getCommunicationPreferences',
  async () => {
    try {
      const response = await fetch(`/wp-json/orb/v1/schedule/communication`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message;
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
);

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    updateDate: (state, action) => {
      state.start_date = action.payload;
    },
    updateTime: (state, action) => {
      state.start_time = action.payload;
    },
    updateSummary: (state, action) => {
      state.summary = action.payload;
    },
    updateDescription: (state, action) => {
      state.description = action.payload;
    },
    updateCommunicationPreference: (state, action) => {
      state.preferred_communication_type = action.payload;
    },
    updateAttendees: (state, action) => {
      state.attendees = action.payload;
    },
    updateDueDate: (state) => {
      state.due_date = combineDateTimeToTimestamp(
        state.start_date,
        state.start_time
      );
    },
    updateEvent: (state) => {
      state.event_date_time = combineDateTime(
        state.start_date,
        state.start_time
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOfficeHoursLocalData.pending, (state) => {
        state.scheduleLoading = true;
        state.scheduleError = null;
      })
      .addCase(getOfficeHoursLocalData.fulfilled, (state, action) => {
        state.scheduleLoading = false;
        state.office_hours = action.payload;
        state.scheduleError = null;
      })
      .addCase(getOfficeHoursLocalData.rejected, (state, action) => {
        state.scheduleLoading = false;
        state.scheduleError =
          (action.error as Error) ||
          new Error('Failed to get office hours');
        state.scheduleErrorMessage =
          action.error.message || 'Failed to get office hours';
      })
      .addCase(getOfficeHours.pending, (state) => {
        state.scheduleLoading = true;
        state.scheduleError = null;
      })
      .addCase(getOfficeHours.fulfilled, (state, action) => {
        state.scheduleLoading = false;
        state.office_hours = action.payload;
        state.scheduleError = null;
      })
      .addCase(getOfficeHours.rejected, (state, action) => {
        state.scheduleLoading = false;
        state.scheduleError =
          (action.error as Error) ||
          new Error('Failed to get office hours');
        state.scheduleErrorMessage =
          action.error.message || 'Failed to get office hours';
      })
      .addCase(getAvailableTimes.pending, (state) => {
        state.scheduleLoading = true;
        state.scheduleError = null;
      })
      .addCase(getAvailableTimes.fulfilled, (state, action) => {
        state.scheduleLoading = false;
        state.events = action.payload;
        state.scheduleError = null;
      })
      .addCase(getAvailableTimes.rejected, (state, action) => {
        state.scheduleLoading = false;
        state.scheduleError =
          (action.error as Error) ||
          new Error('Failed to fetch available times');
        state.scheduleErrorMessage =
          action.error.message || 'Failed to fetch available times';
      })
      .addCase(sendInvites.pending, (state) => {
        state.scheduleLoading = true;
        state.scheduleError = null;
      })
      .addCase(sendInvites.fulfilled, (state, action) => {
        state.scheduleLoading = false;
        state.scheduleError = null;
        state.event_id = action.payload;
      })
      .addCase(sendInvites.rejected, (state, action) => {
        state.scheduleLoading = false;
        state.scheduleError =
          (action.error as Error) ||
          new Error('Failed to send out invites');
        state.scheduleErrorMessage =
          action.error.message || 'Failed to send out invites';
      })
      .addCase(saveEvent.pending, (state) => {
        state.scheduleLoading = true;
        state.scheduleError = null;
      })
      .addCase(saveEvent.fulfilled, (state, action) => {
        state.scheduleLoading = false;
        state.event_id = action.payload;
      })
      .addCase(saveEvent.rejected, (state, action) => {
        state.scheduleLoading = false;
        state.scheduleError =
          (action.error as Error) ||
          new Error('Failed to save event');
        state.scheduleErrorMessage =
          action.error.message || 'Failed to save event';
      })
      .addCase(getEvent.pending, (state) => {
        state.scheduleLoading = true;
        state.scheduleError = null;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.scheduleLoading = false;
        state.event_id = action.payload.event_id;
        state.google_event_id = action.payload.google_event_id;
        state.invoice_id = action.payload.invoice_id;
        state.start_date = action.payload.start_date;
        state.start_time = action.payload.start_time;
        state.attendees = action.payload.attendees;
        state.calendar_link = action.payload.htmlLink;
        state.scheduleError = null;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.scheduleLoading = false;
        state.scheduleError =
          (action.error as Error) ||
          new Error('Failed to get event details');
        state.scheduleErrorMessage =
          action.error.message || 'Failed to get event details';
      })
      .addCase(getClientEvents.pending, (state) => {
        state.scheduleLoading = true;
        state.scheduleError = null;
      })
      .addCase(getClientEvents.fulfilled, (state, action) => {
        state.scheduleLoading = false;
        state.events = action.payload;
        state.scheduleError = null;
      })
      .addCase(getClientEvents.rejected, (state, action) => {
        state.scheduleLoading = false;
        state.scheduleError =
          (action.error as Error) ||
          new Error('Failed to get client events');
        state.scheduleErrorMessage =
          action.error.message || 'Failed to get client events';
      })
      .addCase(getCommunicationPreferences.pending, (state) => {
        state.scheduleLoading = true;
        state.scheduleError = null;
      })
      .addCase(getCommunicationPreferences.fulfilled, (state, action) => {
        state.scheduleLoading = false;
        state.communication_preferences = action.payload;
        state.scheduleError = null;
      })
      .addCase(getCommunicationPreferences.rejected, (state, action) => {
        state.scheduleLoading = false;
        state.scheduleError =
          (action.error as Error) ||
          new Error('Failed to fetch communication preferences');
        state.scheduleErrorMessage =
          action.error.message || 'Failed to fetch communication preferences';
      });
  },
});

export const {
  updateDate,
  updateTime,
  updateDueDate,
  updateSummary,
  updateDescription,
  updateCommunicationPreference,
  updateAttendees,
  updateEvent,
} = scheduleSlice.actions;
