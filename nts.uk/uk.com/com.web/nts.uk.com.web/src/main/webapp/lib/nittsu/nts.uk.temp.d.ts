declare module nts.uk.ui {
    module block {
        function grayout(): any;
        function clear(): any;
        function invisible(): any;
    }
    module dialog {
        function alertError(errorData: any): JQueryPromise<any>;
        function bundledErrors(errorData: any): JQueryPromise<any>;
    }
}
declare module nts.uk {
    module resource {
        function getText(messageId: string, ...params: any[]): string;
    }
    module characteristics {
        function save(key: string, data: any): any;
        function restore(key: string): any;
        function remove(key: string): any;
    }
}
declare module nts.uk.request {
    module asyncTask {
        function getInfo(id: string): JQueryPromise<any>;
        function requestToCancel(id: string): void;
    }
    function liveView(fileId: string): string;
    const WEB_APP_NAME: any;
}

/**
 * Defined Jquery interface.
 */
interface JQuery {
    ntsFileUpload(option: any): JQueryPromise<void>;
    
    /**
     * Nts list component. Init KCP list component.
     * This Function used after apply binding only.
     */
    ntsListComponent(option: ComponentOption): JQueryPromise<void>;
    
    /**
     * Get data list in component.
     */
    getDataList(): any;
    
    /**
     * Focus component.
     */
    focusComponent(): void;
    
    /**
     * Function reload job title data list. Support job title list only.
     */
    reloadJobtitleDataList(): void;
    
     /**
     * Nts tree component. Init KCP tree component.
     */
    ntsTreeComponent(option: TreeComponentOption): JQueryPromise<void>;
    
    /**
     * Get row selected 
     */
    getRowSelected(): Array<any>;
    
    /**
     * Focus component.
     */
    focusTreeGridComponent(): void;
    
    /**
     * init CCG001 component.
     */
    ntsGroupComponent(option: any): JQueryPromise<void>;
    
    /**
     * init calendar component.
     */
    ntsCalendar(action: string, option: any);
    
    delegate(selector: string, eventName: string, handler: (evt: any, ui: any) => void)
    /**
     * Go to full view mode KCP004.
     */
    fullView(): void;
    
    /**
     * Go to scroll view mode KCP004.
     */
    scrollView(): void;
}

interface UnitModel {
    id?: string;
    code: string;
    name?: string;
    workplaceName?: string;
    isAlreadySetting?: boolean;
}

interface UnitAlreadySettingModel {
    code: string;
    isAlreadySetting: boolean;
}

interface TreeComponentOption {
    /**
     * is Show Already setting.
     */
    isShowAlreadySet: boolean;

    /**
     * is Multi select.
     */
    isMultiSelect: boolean;

    /**
     * selected value.
     * May be string or Array<string>
     */
    selectedWorkplaceId: KnockoutObservable<any>;

    /**
     * Base date.
     */
    baseDate: KnockoutObservable<Date>;

    /**
     * Select mode
     */
    selectType: number;

    /**
     * isShowSelectButton
     * Show/hide button select all and selected sub parent
     */
    isShowSelectButton: boolean;

    /**
     * is dialog, if is main screen, set false,
     */
    isDialog: boolean;

    /**
     * Already setting list code. structure: {workplaceId: string, isAlreadySetting: boolean}
     * ignore when isShowAlreadySet = false.
     */
    alreadySettingList?: KnockoutObservableArray<any>;

    /**
     * Limit display row
     */
    maxRows?: number;
}

/**
 * Component option.
 */
interface ComponentOption {
    /**
     * is Show Already setting.
     */
    isShowAlreadySet: boolean;

    /**
     * is Multi select.
     */
    isMultiSelect: boolean;

    /**
     * list type.
     * 1. Employment list.
     * 2. Classification.
     * 3. Job title list.
     * 4. Employee list.
     */
    listType: number;

    /**
     * selected value.
     * May be string or Array<string>.
     * Note: With job title list (KCP003), this is selected job title id.
     */
    selectedCode: KnockoutObservable<any>;

    /**
     * baseDate. Available for job title list only.
     */
    baseDate?: KnockoutObservable<Date>;

    /**
     * is dialog, if is main screen, set false,
     */
    isDialog: boolean;

    /**
     * Select Type.
     * 1 - Select by selected codes.
     * 2 - Select All (Cannot select all while single select).
     * 3 - Select First item.
     * 4 - No select.
     */
    selectType: number;

    /**
     * Check is show no select row in grid list.
     */
    isShowNoSelectRow: boolean;

    /**
     * check is show select all button or not. Available for employee list only.
     */
    isShowSelectAllButton?: boolean;

    /**
     * check is show work place column. Available for employee list only.
     */
    isShowWorkPlaceName?: boolean;

    /**
     * Already setting list code. structure: {code: string, isAlreadySetting: boolean}
     * ignore when isShowAlreadySet = false.
     * Note: With job title list (KCP003), structure: {id: string, isAlreadySetting: boolean}.
     */
    alreadySettingList?: KnockoutObservableArray<UnitAlreadySettingModel>;

    /**
     * Employee input list. Available for employee list only.
     * structure: {code: string, name: string, workplaceName: string}.
     */
    employeeInputList?: KnockoutObservableArray<UnitModel>;

    /**
     * Max rows to visible in list component.
     */
    maxRows: number;

    /**
     * Set max width for component.Min is 350px;
     */
    maxWidth?: number;
}
