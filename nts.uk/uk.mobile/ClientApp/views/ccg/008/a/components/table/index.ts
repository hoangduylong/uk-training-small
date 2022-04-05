import { Vue, _ } from '@app/provider';
import { component, Prop, Emit } from '@app/core/component';

const percentRegex = /^\d\w%+$/;
const numberRegex = /^\d+$/;
// just a test component for learning
@component({
    template: require('./index.vue'),
    style: require('./style.scss'),
})
export class TableComponent extends Vue {
    @Prop({ default: () => ({}) })
    public configs!: TableConfig;
    public search: String;

    @Emit()
    public searchHandle(val) {
        return val;
    }
    
    public size(val, defaultVal) {
        if (this.validCssFormat(val)) {
            if (numberRegex.test(val)) {
                return val + 'px';
            }
            if (percentRegex.test(val)) {
                return val;
            }
        }
        
        return defaultVal ? defaultVal : 'auto';
    }

    public getValuebyFilter(value, filter) {
        return Vue.filter(filter)(value);
    }

    private validCssFormat(value) {
        return value && (numberRegex.test(value) || percentRegex.test(value));
    }
}

class TableConfig {
    public headers!: Array<Header>;
    public items!: Array<any>;
    public search?: Boolean;
    // bootstrap class: striped, bordered borderless.. (https://getbootstrap.com/docs/4.3/content/tables/) + extra class
    public tableClass: String;
    public headerClass: String;
    public rowClass: String;
    public height?: String;
    public width?: String;
    public noDataMessage?: String;

}

class Header {
    public sortAble?: Boolean;
    public label: String;
    public key: String;
    public cellClass?: String;
}

class Panigation {

}
// just a test component for learning