import {
    CalendarEvent,
    CalendarType,
    generateEventLink,
} from 'utils/generateEventLink';

export enum DateType {
    Start = 'start',
    End = 'end',
}

export default class Event {
    private event: RecursivePartial<CalendarEvent> = {};

    public getEventLink(): string {
        if (!this.isComplete()) return 'Event is not complete';

        return `
            ${generateEventLink(
                this.event as CalendarEvent,
                CalendarType.Google,
            )}
            ${generateEventLink(this.event as CalendarEvent, CalendarType.ICS)}
            `;
        // TODO: change it to return a file
        // TODO: think how to avoid type assertion
    }

    public setTitle(title: string) {
        this.event.title = title;
    }

    public setAllDay(allDay: boolean) {
        this.event.allDay = allDay;
    }

    public setLocation(location: string) {
        this.event.location = location;
    }

    public setDate(date: string, dateType: DateType) {
        const [day, month, year] = date.split('/').map(Number);

        this.event[dateType] = {
            day,
            month: month - 1,
            year,
        };
    }

    public setTime(time: string, dateType: DateType) {
        const [hours, minutes] = time.split(':').map(Number);

        this.event[dateType] = {
            ...this.event[dateType],
            time: { hours, minutes },
        };
    }

    public isAllDay(): boolean {
        return this.event.allDay ? true : false;
    }

    // TODO: think if there is a better way to check completeness
    private isComplete(): boolean {
        const { title, allDay, start, end } = this.event;

        if (typeof title !== 'string') return false;
        if (typeof allDay === 'undefined' || allDay === null) return false;
        if (!start || !end) return false;

        const {
            day: startDay,
            month: startMonth,
            year: startYear,
            time: startTime,
        } = start;
        const {
            day: endDay,
            month: endMonth,
            year: endYear,
            time: endTime,
        } = end;

        if (!startDay || (!startMonth && startMonth !== 0) || !startYear)
            return false;
        if (!endDay || (!endMonth && endMonth !== 0) || !endYear) return false;

        if (allDay) return true;
        if (!startTime || !endTime) return false;
        if (
            isNaN(startTime.hours) ||
            isNaN(startTime.minutes) ||
            isNaN(endTime.hours) ||
            isNaN(endTime.minutes)
        )
            return false;

        return true;
    }
}
