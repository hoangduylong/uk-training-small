import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';

@component({
    template: `<div class="form-group mb-1">
    <div class="input-group input-group-transparent input-group-search" v-bind:class="classContainer">
        <div class="input-group-append" v-on:click="filterEvent">
            <span class="input-group-text fa fa-search"></span>
        </div>
        <input ref="input" v-bind:class="classInput" v-bind:placeholder="description" v-bind:value="value" type="text" class="form-control" v-on:keyup="$emit('input', $refs.input.value)" />
    </div>
</div>`
})
class SearchComponent extends Vue {
    @Prop({ default: '' })
    public readonly value!: string;

    @Prop({ default: '' })
    public readonly classInput!: string;

    @Prop({ default: '' })
    public readonly classContainer!: string;

    @Prop({ default: '' })
    public readonly placeholder!: string;

    get description() {
        return this.$i18n(this.placeholder);
    }

    public filterEvent() {
        this.$emit('search', (this.$refs.input as HTMLInputElement).value);
    }
}

// //deprecate
Vue.component('nts-search-box', SearchComponent);
Vue.component('text-search-box', SearchComponent);

// recommended
Vue.component('nts-text-search', SearchComponent);