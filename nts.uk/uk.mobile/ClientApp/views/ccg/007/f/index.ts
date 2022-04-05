import { Vue, _ } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { SideMenu, NavMenu } from '@app/services';

@component({
    name: 'ccg007f',
    route: '/ccg/007/f',
    style: require('./style.scss'),
    template: require('./index.vue')
})
export class Ccg007fComponent extends Vue {
    @Prop({ default: () => ({}) })
    public params!: any;

    public mounted() {
        // Hide top & side menu
        NavMenu.visible = false;
        SideMenu.visible = false;
    }

    public destroyed() {
        // Show menu
        NavMenu.visible = true;
        SideMenu.visible = true;
    }
}