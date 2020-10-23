import {
    CalendarEvent,
    CalendarType,
    generateEventLink,
} from '../generateEventLink';

describe('generateEventLink', () => {
    describe('non-all day event', () => {
        const event: CalendarEvent = {
            title: 'New year party',
            location: 'Politických vězňů 1511/5',
            allDay: false,
            start: {
                day: 20,
                month: 11,
                year: 2020,
                time: {
                    hours: 0,
                    minutes: 30,
                },
            },
            end: {
                day: 21,
                month: 11,
                year: 2020,
                time: {
                    hours: 0,
                    minutes: 0,
                },
            },
        };

        it('generates Google link', () => {
            expect(
                generateEventLink(event, CalendarType.Google),
            ).toMatchSnapshot();
        });

        it('generates ICS string', () => {
            expect(
                generateEventLink(event, CalendarType.ICS),
            ).toMatchSnapshot();
        });
    });

    describe('all day event', () => {
        const event: CalendarEvent = {
            title: 'Birthday party',
            allDay: true,
            start: {
                day: 2,
                month: 4,
                year: 2020,
            },
            end: {
                day: 5,
                month: 4,
                year: 2020,
            },
        };

        it('generates Google link', () => {
            expect(
                generateEventLink(event, CalendarType.Google),
            ).toMatchSnapshot();
        });

        it('generates ICS string', () => {
            expect(
                generateEventLink(event, CalendarType.ICS),
            ).toMatchSnapshot();
        });
    });
});
