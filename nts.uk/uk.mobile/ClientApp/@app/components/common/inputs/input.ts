import { obj } from '@app/utils';
import { Vue } from '@app/provider';
import { IRule } from 'declarations';
import { component, Prop, Watch } from '@app/core/component';

export const input = (tagName: 'input' | 'textarea' | 'select' = 'input') => component({
    template: `<div class="form-group row">
        <template v-if="showTitle && showTitle !== 'false' && name">
            <div v-bind:class="columns.title" v-bind:key="'showtitle'">
                <nts-label 
                    v-bind:constraint="constraints"
                    v-bind:show-constraint="showConstraint"
                    v-bind:class="{ 'control-label-inline': inlineTitle && inlineTitle !== 'false' }"
                    >{{ name | i18n }}</nts-label>
            </div>
        </template>
        <template v-else></template>
        <div v-bind:class="columns.input">
            <div class="input-group input-group-transparent">                
                <template v-if="icons.before">
                    <div class="input-group-prepend" v-bind:key="'show'">
                        <span class="input-group-text" v-bind:class="iconsClass.before">{{ !iconsClass.before ? icons.before : '' }}</span>
                    </div>
                </template>
                <template v-else></template>
                <template v-if="icons.after">
                    <div class="input-group-append" v-bind:key="'show'">
                        <span class="input-group-text" v-bind:class="iconsClass.after">{{ !iconsClass.after ? icons.after : ''}}</span>
                    </div>
                </template>
                <template v-else></template>       
                ${
        tagName === 'select' ?
            `<select class="form-control" 
                            ref="input"
                            v-validate="{
                                always: !!errorsAlways,
                                errors: ($errors || errorsAlways || {})
                            }"
                            v-bind:tabindex="tabindex"
                            v-bind:disabled="disabled"
                            v-bind:value="rawValue"
                            v-bind:class="classInput"
                            v-on:change="input()">
                        <slot />
                    </select>`
            :
            `<${tagName} class="form-control"
                        ref="input"
                        v-bind:type="type"
                        v-validate="{
                            always: !!errorsAlways,
                            errors: ($errors || errorsAlways || {})
                        }"
                        v-bind:rows="rows || ${tagName === 'textarea' ? 3 : undefined}"
                        v-bind:disabled="disabled"
                        v-bind:readonly="!editable"
                        v-bind:value="rawValue"
                        v-bind:tabindex="tabindex"
                        v-bind:placeholder="$placeholder"
                        v-bind:class="classInput"
                        v-click:500="evt => { click(); $emit('click', evt); }"
                        v-on:keydown.13="click()"
                        v-on:input="input()"
                        v-on:keydown="evt => $emit('keydown', evt)"
                        v-on:keypress="evt => $emit('keypress', evt)"
                        v-on:keyup="evt => $emit('keyup', evt)"
                        v-on:focus="evt => $emit('focus', evt)"
                        v-on:blur="evt => $emit('blur', evt)"
                        v-on:dblclick="evt => { evt.preventDefault(); $emit('dblclick', evt); }"
                    />`
        }
                <template v-if="showError">
                    <v-errors v-model="$errors" v-bind:name="name" v-bind:key="'showError'" />
                </template>
                <template v-else></template>
            </div>
        </div>
    </div>`
});
export class InputComponent extends Vue {
    public click() { }

    public type: string = '';

    @Prop({ default: () => 0 })
    public readonly recordId!: number | string;

    @Prop({ default: () => '' })
    public readonly recordName!: number | string;

    @Prop({ default: () => null })
    public readonly rows!: number | string | null;

    public editable: boolean = true;

    @Prop({ default: () => '' })
    public readonly name: string;

    @Prop({ default: () => '' })
    public readonly value: any;

    @Prop({ default: () => false })
    public readonly disabled?: boolean;

    @Prop({ default: () => null })
    public readonly errors!: any;

    @Prop({ default: () => null })
    public readonly errorsAlways!: any;

    @Prop({ default: () => ({}) })
    public readonly constraint!: IRule;

    @Prop({ default: () => true })
    public readonly showTitle!: 'true' | 'false' | boolean;

    @Prop({ default: () => true })
    public readonly showConstraint!: 'true' | 'fasle' | boolean;

    @Prop({ default: () => false })
    public readonly inlineTitle!: boolean;

    @Prop({ default: () => undefined })
    public readonly tabindex!: string | number | undefined;

    @Prop({ default: () => ({ before: '', after: '' }) })
    public readonly icons!: { before: string; after: string };

    @Prop({ default: () => ({ title: 'col-md-12', input: 'col-md-12' }) })
    public readonly columns!: { title: string; input: string };

    @Prop({ default: () => '' })
    public readonly placeholder!: string;

    @Prop({ default: () => '' })
    public readonly classInput!: string;

    @Prop({ default: () => true })
    public readonly showError!: boolean;

    get iconsClass() {
        let self = this,
            classess = ['fa', 'fas', 'fab'],
            isClass = (icon: string) => {
                return !!classess.filter((f) => (icon || '').indexOf(f) > -1).length;
            };

        return {
            before: isClass(self.icons.before) ? self.icons.before : '',
            after: isClass(self.icons.after) ? self.icons.after : ''
        };
    }

    get $placeholder() {
        return this.placeholder;
    }

    public readonly $errors: any = {};
    public readonly constraints: IRule = {};

    @Watch('errors', { deep: true })
    public wSErrs(newErrs: any) {
        let self = this;

        Vue.set(self, '$errors', newErrs);
    }

    @Watch('errorsAlways', { deep: true })
    public wSErrAs(newErrs: any) {
        let self = this;

        if (!obj.isBoolean(newErrs)) {
            Vue.set(self, '$errors', newErrs);
        }
    }

    @Watch('$parent.$errors', { deep: true })
    public wErrs(newErrs: any) {
        let self = this,
            ridx = /\[[a-z0-9]+\]/,
            rname = /\[('|")[a-z0-9]+('|")\]/g,
            props: any = self.$vnode.componentOptions.propsData,
            exprs = (((self.$vnode.data as any) || { model: { expression: '' } }).model || { expression: '' }).expression,
            exprs2 = exprs
                .replace(rname, (match: string) => match.replace(/\[('|")|('|")\]/g, '.'))
                .replace(ridx, `.$${self.recordId}.`)
                .replace(ridx, `.${self.recordName}`)
                .replace(/\.{1,}/g, '.')
                .replace(/\.$/, '');

        if (obj.has(self.$parent, exprs2) && !obj.has(props, 'errors') &&
            (obj.isBoolean(self.errorsAlways) || self.errorsAlways == undefined)) {
            Vue.set(self, '$errors', obj.get(newErrs, exprs2));
        }
    }

    @Watch('constraint', { immediate: true, deep: true })
    public wSConsts(newValidts: any) {
        let self = this;

        Vue.set(self, 'constraints', newValidts);
    }

    @Watch('$parent.validations', { immediate: true, deep: true })
    public wConsts(newValidts: any) {
        let self = this,
            ridx = /\[[a-z0-9]+\]/,
            rname = /\[('|")[a-z0-9]+('|")\]/g,
            props: any = self.$vnode.componentOptions.propsData,
            exprs = (((self.$vnode.data as any) || { model: { expression: '' } }).model || { expression: '' }).expression,
            exprs2 = exprs
                .replace(rname, (match: string) => match.replace(/\[('|")|('|")\]/g, '.'))
                .replace(ridx, `.`)
                .replace(ridx, `.${self.recordName}`)
                .replace(/\.{1,}/g, '.')
                .replace(/\.$/, ''),
            exprs3 = exprs
                .replace(rname, (match: string) => match.replace(/\[('|")|('|")\]/g, '.'))
                .replace(ridx, `.$${self.recordId}.`)
                .replace(ridx, `.${self.recordName}`)
                .replace(/\.{1,}/g, '.')
                .replace(/\.$/, '');

        if ((obj.has(self.$parent, exprs3) || (ridx.test(exprs) && obj.get(newValidts, exprs2))) && !obj.has(props, 'constraint')) {
            Vue.set(self, 'constraints', obj.get(newValidts, exprs2));
        }
    }
}