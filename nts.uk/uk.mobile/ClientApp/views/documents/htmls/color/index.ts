import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentshtmlscolor',
    route: {
        url: '/htmls/color',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json')
})
export class DocumentsHtmlsColorComponent extends Vue {
    public ukMobiles: Array<string> = [
        'teal',
        'sea-green',
        'olive',
        'remark',
        'light-olive',
        'headline',
        'accordion',
        'reflect',
        'stripped',
        'quote',
        'dark-gray',
        'sub-label',
        'over-time',
        'gray',
        'light-gray',
        'lighten-gray',
        'white-smoke',
        'silver',
        'white',
        'orange',
        'papaya-whip',
        'approval',
        'yellow',
        'light-yellow',
        'khaki',
        'saddle-brow',
        'rosy-brown',
        'red',
        'sunday',
        'crimson',
        'light-coral',
        'dark-salmon',
        'blue',
        'statuday',
        'medium-blue',
        'steel-blue',
        'royal-blue',
        'sky-blue',
        'light-blue',
        'powder-blue',
        'alice-blue'
    ];

    public hoverColors: Array<string> = [
        'hover',
        'danger-hover',
        'process-hover',
    ];

    public backgroundColors: Array<string> = [
        'green',
        'yellow',
        'active',
        'link-button',
        'checkbox',
        'radio',
        'danger',
        'process',
        'disable',
        'daily-alter-self',
        'daily-alter-other',
        'daily-reflect-application',
        'daily-error',
        'daily-alarm',
        'daily-calculated',
        'schedule-saturday',
        'schedule-sunday',
        'schedule-support',
        'schedule-no-empl-insurance',
        'schedule-no-health-insurance',
        'schedule-no-empl-health-insurance',
        'schedule-fixed',
        'schedule-uncorrectable',
        'schedule-work-by-dow',
        'schedule-specific-date',
        'schedule-that-day',
        'schedule-focus',
        'choice-row',
        'calendar-ym-set',
        'workink-result-excess',
        'pre-application-excess',
        'application-approved',
        'application-reflected',
        'unapproved-application',
        'remanded-application',
        'canceled-application',
        'weekdays',
        'pasted',
        'updating-cell',
        'selecting',
        'added-row',
        'actual-superior-unverified',
        'error-actual'
    ];

    public textColors: Array<string> = [
        'proceed',
        'info',
        'danger',
        'active',
        'required',
        'disabled',
        'link-button',
        'working-day',
        'non-working-day',
        'attendance',
        'holiday',
        'daily-holiday',
        'daily-extra-holiday',
        'schedule-performance',
        'schedule-error',
        'schedule-saturday',
        'schedule-sunday',
        'half-day-work',
        'operation-case-character',
        'working-schedule',
        'sunday',
        'saturday',
        'weekdays'
    ];

    public applyColors: Array<string> = [
        'reflected', 
        'approved', 
        'denial', 
        'return', 
        'cancel', 
        'unapproved'
    ];
}