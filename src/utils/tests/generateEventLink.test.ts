import {
    CalendarEvent,
    CalendarType,
    generateEventLink,
} from '../generateEventLink';

describe('generateEventLink', () => {
    const event: CalendarEvent = {
        title: 'New year party',
        location: 'Politických vězňů 1511/5',
        allDay: false,
        start: {
            day: 20,
            month: 12,
            year: 2020,
            optional: {
                hours: 17,
                minutes: 30,
            },
        },
        end: {
            day: 21,
            month: 12,
            year: 2020,
            optional: {
                hours: 2,
                minutes: 0,
            },
        },
    };

    it('generates Google link', () => {
        expect(generateEventLink(event, CalendarType.Google)).toMatchSnapshot();
    });

    it('generates ICS string', () => {
        expect(generateEventLink(event, CalendarType.ICS)).toMatchSnapshot();
    });

    it('generates Outlook link', () => {
        expect(
            generateEventLink(event, CalendarType.Outlook)
        ).toMatchSnapshot();
    });
});
