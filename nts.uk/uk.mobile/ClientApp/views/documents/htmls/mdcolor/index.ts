import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentshtmlsmdcolor',
    route: {
        url: '/htmls/mdcolor',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json')
})
export class DocumentsHtmlsMdcolorComponent extends Vue {
    public gradents: Array<string | number> = [
        50,
        100,
        200,
        300,
        400,
        500,
        600,
        700,
        800,
        900,
        'a100',
        'a200',
        'a400',
        'a700'];

    public colorNames: Array<string> = [
        'red',
        'pink',
        'purple',
        'deep-purple',
        'indigo',
        'blue',
        'light-blue',
        'cyan',
        'teal',
        'green',
        'light-green',
        'lime',
        'yellow',
        'amber',
        'orange',
        'deep-orange',
        'brown',
        'grey',
        'blue-grey'];
}