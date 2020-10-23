import { CalendarEvent as CalendarLinkEvent, google, ics } from 'calendar-link';

export const enum CalendarType {
    Google,
    ICS,
}

export interface CalendarEventDate {
    // from 1 to 31
    day: number;
    // from 0 to 11
    month: number;
    year: number;
    time?: {
        // from 0 to 23
        hours: number;
        // from 0 to 59
        minutes: number;
    };
}

export interface CalendarEvent {
    title: string;
    allDay: boolean;
    location?: string;
    start: CalendarEventDate;
    end: CalendarEventDate;
}

const ICS_CALENDAR_EVENT_DIVIDER = 'charset=utf8,';

/**
 * Generates calendar link for an event by a calendar type
 * @param event Event
 * @param calendarType CalendarType
 */
export function generateEventLink(
    event: CalendarEvent,
    calendarType: CalendarType,
): string {
    const calendarEvent = generateCalendarEvent(event);
    switch (calendarType) {
        case CalendarType.Google:
            return google(calendarEvent);
        case CalendarType.ICS:
            return decodeURIComponent(
                ics(calendarEvent).split(ICS_CALENDAR_EVENT_DIVIDER)[1],
            );
        default:
            throw new Error(`Unknown calendar type: ${calendarType}`);
    }
}

/**
 * Transforms Event interface into CalendarEvent from `calendar-link`
 * @param event CalendarEvent
 */
function generateCalendarEvent(event: CalendarEvent): CalendarLinkEvent {
    const start = generateDateFromCalendarEventDate(event.start);
    const end = generateDateFromCalendarEventDate(event.end);

    return {
        title: event.title,
        location: event?.location,
        allDay: event.allDay,
        start,
        end,
    };
}

/**
 * Transform CalendarEventDate into Date format
 * @param calendarEventDate: CalendarEventDate
 */
function generateDateFromCalendarEventDate({
    year,
    month,
    day,
    time,
}: CalendarEventDate): Date {
    const timeTuple = time ? [time.hours, time.minutes] : [];
    return new Date(Date.UTC(year, month, day, ...timeTuple));
}
