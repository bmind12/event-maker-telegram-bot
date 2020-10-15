import {
    CalendarEvent,
    CalendarType,
    generateEventLink,
} from '../generateEventLink';

describe('generateEventLink', () => {
    // UTC is used to be indifferent to locales
    const startDate = new Date(Date.UTC(2020, 11, 20, 16, 30, 0));
    const endDate = new Date(Date.UTC(2020, 11, 21, 1, 0, 0));
    const event: CalendarEvent = {
        title: 'New year party',
        location: 'Politických vězňů 1511/5',
        allDay: false,
        start: {
            day: startDate.getDate(),
            month: startDate.getMonth() + 1, // months in JS start with 0
            year: startDate.getFullYear(),
            optional: {
                hours: startDate.getHours(),
                minutes: startDate.getMinutes(),
            },
        },
        end: {
            day: endDate.getDate(),
            month: endDate.getMonth() + 1, // months in JS start with 0
            year: endDate.getFullYear(),
            optional: {
                hours: endDate.getHours(),
                minutes: endDate.getMinutes(),
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
