import { Vue } from '@app/provider';
import { component } from '@app/core/component';

import { Cdl008AComponent } from '../a';

@component({
    name: 'cdls08test',
    route: '/cdl/s08/test',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class Cdl008TestComponent extends Vue {
    public model = {
        workplaceId: '',
        code: '',
        name: ''
    };
    public workPlaceOuts: Array<IWorkPlace> = [];
    public workPlaceIds: Array<String> = [];
    public selectedValue: number = 1;
    public systemTypes: Array<Object> = [{
        code: SystemType.PERSONAL_INFORMATION,
        text: 'PERSONINFO'
    }, {
        code: SystemType.WORK,
        text: 'WORK'
    }, {
        code: SystemType.SALARY,
        text: 'SALARY'
    }, {
        code: SystemType.HUMAN_RESOURCES,
        text: 'HUMAN_RESOURCES'
    },{
        code: SystemType.ADMINISTRATOR,
        text: 'ADMINISTRATOR'
    }];
    public isReference: number = 0;
    public isRequired: number = 0;
    public workPlaceId: string = '';


    public date: Date = new Date();

    public openDLRadio() {
        let self = this;
        let data = {
            workPlaceType: 0,
            startMode: false,
            baseDate: self.date,
            systemType: self.selectedValue,
            referenceRangeNarrow: self.isReference ? true : false,
            selectedItem: [self.workPlaceId ? self.workPlaceId.split(',')[0] : ''],
            isSelectionRequired: self.isRequired ? true : false
        };
        self.$modal(
            Cdl008AComponent,data,{ title: 'CDLS08_1' }
            
        ).then((data: any) => {
            self.workPlaceOuts = [];
            self.workPlaceIds = [];
            if (data) {
                self.model = data;
            }
            self.workPlaceId = self.model.workplaceId;
        });
    }

    public openDLCheckbox() {
        let self = this;
        
        let data = {
            workPlaceType: 1,
            startMode: true,
            baseDate: self.date,
            systemType: self.selectedValue,
            referenceRangeNarrow: self.isReference ? true : false,
            selectedItem: self.workPlaceId ? self.workPlaceId.split(',') : [],
            isSelectionRequired: self.isRequired ? true : false
        };
        self.$modal(Cdl008AComponent, data, { title: 'CDLS08_1' }).then((data: any) => {
            
            self.model = {
                workplaceId: '',
                code: '',
                name: ''
            };
            
            if (data) {
                self.workPlaceIds = [];
                self.workPlaceOuts = [];
                self.workPlaceOuts = data;
                self.workPlaceId = '';
                self.workPlaceOuts.forEach((workPlaceOut) => {
                    self.workPlaceIds.push(workPlaceOut.workplaceId);
                    self.workPlaceId = self.workPlaceId.concat(workPlaceOut.workplaceId + ',');
                });

                return;
            } 
            
            return 0;    
        });
    }
}
interface IWorkPlace {
    code: string;
    name: string;
    workplaceId: string;
}

const SystemType = {

    // The personal information. 
    // 管理者
    PERSONAL_INFORMATION: 1,

    /** The work. */
    // 就業
    WORK: 2,

    /** The salary. */
    // 給与
    SALARY: 3,

    /** The human resources. */
    // 人事
    HUMAN_RESOURCES: 4,

    // The administrator. 
    // 管理者
    ADMINISTRATOR: 5
};
