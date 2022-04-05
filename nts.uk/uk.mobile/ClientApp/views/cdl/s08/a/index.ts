import { _, Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { obj } from '@app/utils';

@component({
    name: 'cdls08a',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class Cdl008AComponent extends Vue {
    @Prop({
        default: () => ({
            startMode: true,
            baseDate: new Date(),
            systemType: 1,
            selectedItem: [],
            isSelectionRequired: true,
            referenceRangeNarrow: true
        })
    })
    public readonly params!: IParameter;

    public selected: string | string[] = '';
    public workPlaces: Array<IWorkPlace> = [];
    public workPlaceOutput: Array<IWorkPlaceOutput> = [];
    public keyword: string = '';
    public ckeyword: number = -1;

    get single() {
        return this.params.startMode === false;
    }

    get optional() {
        return !this.params.isSelectionRequired && this.single;
    }

    get messageError() {
        return this.params.isSelectionRequired && !this.single;
    }

    get selectedItem() {
        let self = this;

        return self.params.selectedItem && _.uniq(self.params.selectedItem) || [];
    }

    /**
     * get param
     */
    private get paramOfAPI() {
        let self = this,
            { systemType, referenceRangeNarrow, baseDate } = self.params;

        return {
            systemType: Number(systemType),
            restrictionOfReferenceRange: referenceRangeNarrow,
            baseDate
        };
    }

    get flatten() {
        // keyword
        let self = this,
            keyword = self.keyword,
            cloned = _.cloneDeep(self.workPlaces),

            match = (item: IWorkPlace) => {

                return _.includes(_.toLower(item.code), _.toLower(keyword)) || _.includes(_.toLower(item.name), _.toLower(keyword));
            },
            filterFunc = (list: Array<IWorkPlace>) => {
                return _.filter(list, (item) => {

                    if (item.childs) {
                        item.childs = filterFunc(item.childs);
                    }

                    if (match(item) || item.childs.length) {
                        return true;
                    }
                });
            },
            filtereds = obj.hierarchy(filterFunc(cloned), 'childs');

        if (filtereds.length) {
            let matcheds = _.filter(filtereds, (item: IWorkPlace) => match(item)),
                index = this.ckeyword % matcheds.length;
            if (this.single) {
                self.selected = matcheds[index] && matcheds[index].workplaceId;
            } else if (_.isArray(self.selected)) {
                if (matcheds[index]) {
                    const selecteds = _.cloneDeep(self.selected);

                    if (_.find(selecteds, matcheds[index].workplaceId) || self.ckeyword == 0) {
                        selecteds.push(matcheds[index].workplaceId);
                    }

                    self.selected = _.uniq(selecteds);
                }
            }

        }

        return filtereds;
    }

    public searchList(keyword: string) {
        if (keyword && !this.keyword) {
            this.ckeyword = 0;
        }

        if (keyword && keyword == this.keyword) {
            this.ckeyword++;
        }
        
        if (keyword != this.keyword) {
            if (keyword) {
                this.ckeyword = 0;
            } else {
                this.ckeyword = -1;
            }
        }

        this.keyword = keyword;
    }

    /**
     * Close dialog with single select
     * @param value 
     */
    public closeRadioDialog(value: any) {
        let self = this;

        if (self.single) {
            self.$close(value.workplaceId == '-1' ? {} : value);

            return;
        }
    }

    public checkMulti(value: any) {
        let self = this,
            selecteds: string= '';
        selecteds = value.workplaceId;
        self.ckeyword = -1;
        if (_.isArray(self.selected)) {
            let item = _.find(self.selected, (select) => {
                return select === selecteds;
            });
            if (!item) {
                self.selected.push(selecteds);
            } else {
                self.selected = _.remove(self.selected, (select) => {
                    return select != selecteds;
                });
                self.$updateValidator;
            }
        }
   }

    public back() {
        let self = this;

        self.$close();
    }

    /**
     * Close dialog with multi select
     */
    public closeDialog() {
        let self = this;
        
        if ((_.isEmpty(self.selected) || self.selected == '') && self.messageError) {
            self.$modal.error({ messageId: 'Msg_643' });

            return;
        }
        
        self.workPlaceOutput = [];
        if (self.selected.length) {
            _.forEach(self.selected, (select) => {
                let item = _.find(self.flatten, (workPlace) => {
                    return workPlace.workplaceId === select;
                });
                if (item) {
                    self.workPlaceOutput.push(item);
                }
            });
        }
        self.$close(self.workPlaceOutput);

    }

    public created() {
        let self = this;

        self.$mask('show', { message: true });

        self.$http.post('com', servicePath.getAllWorkplace, self.paramOfAPI)
            .then((results: { data: Array<IWorkPlace> }) => {
                self.setData(results.data);

                let wkWorkPlacesFlat = self.flatten.map((m: IWorkPlace) => m.workplaceId);

                //single select
                if (self.single) {
                    if (!self.selectedItem.length || self.selectedItem[0] == '' || self.selectedItem[0] == null) {
                        self.selected = wkWorkPlacesFlat[0];

                    } else {
                        self.selected = self.selectedItem[0];
                    }
                } else {
                    //multi select    
                    if (self.selectedItem.length) {
                        self.selected = self.selectedItem;
                    } else {
                        self.selected = [];
                    }
                }

                self.$mask('hide');
            });
    }

    private setData(data: Array<IWorkPlace>) {
        let self = this,
            $wplaces = [];

        if (!data || !data.length) {
            return;
        }

        // add option item
        if (self.optional) {
            $wplaces.push({
                code: '',
                name: '選択なし',
                childs: [],
                hierarchyCode: '',
                workplaceId: '-1'
            });

        }

        self.workPlaces = [...$wplaces, ...data];
    }

    public activeClass(item: IWorkPlace) {

        let classAtr = '';

        if (!this.selected || !this.selected.length) {
            return '';
        }

        if ( item.workplaceId === '-1' ) {
            classAtr += 'none';
        }

        if (this.single) {
            if (this.selected === item.workplaceId) {
                classAtr += ' active';
            }
        } else {
            if (this.selected.indexOf(item.workplaceId) > -1) {
                classAtr += ' active';
            }
        }

        return classAtr;
    }
}

const servicePath = {
    getAllWorkplace: 'bs/employee/workplace/config/info/findAll',
};

interface IWorkPlace {

    //職場コード
    code: string;

    //職場名称
    name: string;

    /** The childs. */
    childs: Array<IWorkPlace>;

    //階層コード
    hierarchyCode: string;

    //職場ID
    workplaceId: string;
}

interface IWorkPlaceOutput {

    //職場コード
    code: string;

    //職場名称
    name: string;

    //職場ID
    workplaceId: string;
}

interface IParameter {
    // 起動モード
    startMode: boolean;

    // 基準日
    baseDate: Date;

    // システム区分
    systemType: number;

    // 参照範囲の絞り込み
    referenceRangeNarrow: boolean;

    // 選択済項目
    selectedItem: Array<string>;

    // 選択必須かどうか
    isSelectionRequired: boolean;
}
