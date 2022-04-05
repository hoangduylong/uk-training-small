import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'Enums',
    route: { 
        url: '/plugins/enums',
        parent: '/documents'
    },
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: [],
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    },
    enums: [
        'nts.uk.ctx.sys.auth.dom.role.RoleType',
        'nts.uk.ctx.sys.auth.dom.role.EmployeeReferenceRange',
        'nts.uk.ctx.at.auth.dom.employmentrole.EmployeeRefRange',
        'nts.uk.ctx.at.auth.dom.employmentrole.ScheduleEmployeeRef'
    ]
})
export class DocumentsPluginsEnumsComponent extends Vue {

    public beforeCreate() {
        this.$http.enum().then( (res: { data: Array<Object> }) => {
            console.log(res.data);
        }); 
    }

    public mounted() {
        this.$http.enum(['nts.uk.ctx.sys.auth.dom.role.RoleType'])
        .then( (res: { data: Array<Object> }) => {
            console.log(res.data);
        }); 
    }

}