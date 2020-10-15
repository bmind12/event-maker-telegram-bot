import {
    CalendarEvent as CalendarLinkEvent,
    google,
    outlook,
    ics,
} from 'calendar-link';
import { parse } from 'date-fns';

export const enum CalendarType {
    Google,
    Outlook,
    ICS,
}

export interface CalendarEventDate {
    day: number;
    month: number;
    year: number;
    optional?: {
        hours: number;
        minutes: number;
    };
}

export interface CalendarEvent {
    title: string;
    allDay: boolean;
    location: string;
    start: CalendarEventDate;
    end?: CalendarEventDate;
}

/**
 * Generates calendar link for an event by a calendar type
 * @param event Event
 * @param calendarType CalendarType
 */
export function generateEventLink(
    event: CalendarEvent,
    calendarType: CalendarType
): string {
    const calendarEvent = generateCalendarEvent(event);
    switch (calendarType) {
        case CalendarType.Google:
            return google(calendarEvent);
        case CalendarType.Outlook:
            return outlook(calendarEvent);
        default:
            return decodeURIComponent(
                ics(calendarEvent).split('charset=utf8,')[1]
            );
    }
}

/**
 * in case of changing
 * update `parseEventDatesIntoSpecialFormat` function
 */
const FORMAT = 'd/M/yyyy/H/m';

/**
 * Transforms Event interface into CalendarEvent from `calendar-link`
 * @param event CalendarEvent
 */
function generateCalendarEvent(event: CalendarEvent): CalendarLinkEvent {
    const start = parse(
        parseEventDatesIntoSpecialFormat(event.start),
        FORMAT,
        new Date()
    );

    const end =
        event.end && !event.allDay
            ? parse(
                  parseEventDatesIntoSpecialFormat(event.end),
                  FORMAT,
                  new Date()
              )
            : undefined;

    return {
        title: event.title,
        location: event.location,
        allDay: event.allDay,
        start,
        end,
    };
}

/**
 * parses event date into format FORMAT var for generateCalendarEvent function
 * @param eventDate CalendarEventDate
 */
function parseEventDatesIntoSpecialFormat(
    eventDate: CalendarEventDate
): string {
    return `${eventDate.day}/${eventDate.month}/${eventDate.year}${
        eventDate.optional
            ? `/${eventDate.optional.hours}/${eventDate.optional.minutes}`
            : ''
    }`;
}
