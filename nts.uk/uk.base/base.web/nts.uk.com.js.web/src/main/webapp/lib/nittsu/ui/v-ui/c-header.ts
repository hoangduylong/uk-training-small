module nts.uk.ui.header {
    const MENU_KEY = 'UK-Menu';
    const MENU_SET = 'nts.uk.session.MENU_SET';
    @component({
        name: 'ui-header',
        template: `
        <div class="hamberger" data-bind="
                click: $component.hambergerClick,
                css: {
                    'hover': $component.menuSet.click()
                }">
            <svg viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="16" height="2" rx="1" fill="white"/>
                <rect y="6" width="16" height="2" rx="1" fill="white"/>
                <rect y="12" width="16" height="2" rx="1" fill="white"/>
            </svg>
            <div class="menu-dropdown menu-hamberger" data-bind="css: { hidden: !$component.menuSet.click() }">
                <div class="menu-column">
                    <div class="menu-header" data-bind="i18n: 'CCG020_1'"></div>
                    <div class="menu-item" data-bind="foreach: $component.menuSet.items">
                        <div class="item" data-bind="
                            i18n: $data.webMenuName,
                            click: function() { $component.selectSet($data, true) },
                            css: { 
                                selected: $component.menuSet.items() && $data.selected
                            }"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="logo-area">
            <i id="logo" data-bind="ntsIcon: { no: 162 }" class="img-icon"></i>
            <i class="control-slider pre-slider" data-bind="
                ntsIcon: { no: 129, width: 25, height: 25 },
                click: $component.handlePrevSlider"></i>
        </div>
        <div class="menu-groups" data-bind="foreach: { data: $component.menuBars, as: 'bar', afterRender: $component.showPrevOrNextSlider.bind($component) }">
            <div class="item-group slide-item" data-bind="
                    event: {
                        mouseover: function() { $component.itemBarHover(bar) },
                        mouseout: function() { $component.itemBarMouseOut(bar) }
                    },
                    css: {
                        'hover': bar.hover() && bar.canHover() && $component.click()
                    },
                    style: {
                        'display': bar.display()
                    },
                    attr: {
                        'data-column': (bar.titleMenu || []).length
                    }">
                    <span class="bar-item-title" data-bind="text: bar.menuBarName, click: function() { $component.selectBar(bar) }"></span>
                <div class="menu-dropdown menu-item" data-bind="css: { hidden: !bar.hover() || !bar.titleMenu.length }, foreach: { data: bar.titleMenu, as: 'title' }">
                    <div class="menu-column">
                        <div class="menu-header" data-bind="
                            i18n: title.titleMenuName,
                            style: {
                                'color': title.textColor,
                                'background-color': title.backgroundColor
                            }"></div>
                        <div class="menu-items" data-bind="foreach: title.treeMenu">
                            <div class="item" data-bind="
                                i18n: $component.getName($data),
                                click: function() { $component.selectMenu($data, bar) },                        
                                css: { 
                                    selected: false,
                                    'divider': !$data.url || $data.url === '-'
                                }"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="user-info">
            <div class="next-slider-area">
                <i class="control-slider next-slider" data-bind="
                    ntsIcon: { no: 128, width: 25, height: 25 },
                    click: $component.handleNextSlider"></i>
            </div>
            <div class="menu-groups">
                <div class="item-group" style="margin-right: 10px;">
                    <ccg020-component></ccg020-component>
                </div>
                <div class="item-group" data-bind="
                        css: {
                            hover: $component.companyNameClick
                        }">
                    <span class="bar-item-title company" data-bind="text: $component.companyName, click: $component.companiesClick"></span>
                    <div class="menu-dropdown menu-item">
                        <div class="menu-column">
                            <div class="menu-items" data-bind="foreach: { data: $component.companies, as: 'company' }">
                                <div class="item" data-bind="
                                    i18n: company.companyName,
                                    click: function() { $component.selectCompany($data) }
                                "></div>
                                <div class="item divider divider-company"></div>
                            </div>
                        </div>
                    </div>
                    <i data-bind="ntsIcon: { no: 135, width: 10, height: 10 }, click: $component.companiesClick" style="margin-right: 5px; cursor: pointer;"></i>
                </div>
                <span class="divider"></span>
                <div class="item-group" data-bind="
                        css: {
                            hover: $component.userNameClick
                        }">
                    <span class="bar-item-title user-name" data-bind="text: $component.userName, click: $component.userClick"></span>
                    <div class="menu-dropdown menu-item">
                        <div class="menu-column">
                            <div class="menu-items">
                                <div class="item" data-bind="i18n: 'CCG020_5', click: $component.settingPerson, if: $component.showPersonSetting"></div>
                                <div data-bind="if: $component.showPersonSetting" class="item divider"></div>
                                <div class="item" data-bind="i18n: 'CCG020_4', click: $component.manual, if: $component.showManual"></div>
                                <div data-bind="if: $component.showManual" class="item divider"></div>
                                <div class="item" data-bind="i18n: 'CCG020_3', click: $component.logout"></div>
                            </div>
                        </div>
                    </div>
                    <i data-bind="ntsIcon: { no: 135, width: 10, height: 10 }, click: $component.userClick" style="margin-right: 5px; cursor: pointer;"></i>
                </div>
            </div>
            <div id="notice-msg" class="avatar notification">
                <i id="new-mark-msg" style="display: none" data-bind="ntsIcon: { no: 165, width: 13, height: 13 }"></i>
            </div>
        </div>
        <div class="pg-area">
            <div class="pg-name">
                <span id="pg-disp-name" data-bind="text: pgName" style="cursor: default"></span>
            </div>
        </div>
        `
    })
    export class HeaderViewModel extends ko.ViewModel {
        ctrl: KnockoutObservable<boolean> = ko.observable(false);
        click: KnockoutObservable<boolean> = ko.observable(false);

        menuSet: {
            click: KnockoutObservable<boolean>;
            items: KnockoutObservableArray<MenuSet>;
        } = {
                click: ko.observable(false),
                items: ko.observableArray([])
            }

        menuBars!: KnockoutComputed<MenuBar[]>;
        countMenuBar: KnockoutObservable<number> = ko.observable(0);

        userName: KnockoutObservable<string> = ko.observable('');
        userNameClick: KnockoutObservable<boolean> = ko.observable(false);

        companies: KnockoutObservableArray<any> = ko.observableArray([]);

        companyName!: KnockoutComputed<string>;

        currentCompanyId: KnockoutObservable<string> = ko.observable('');

        companyNameClick: KnockoutObservable<boolean> = ko.observable(false);

        pgName: KnockoutObservable<string> = ko.observable('');
        pgId: KnockoutObservable<string> = ko.observable('');

        showManual: KnockoutObservable<boolean> = ko.observable(false);

        showPersonSetting: KnockoutObservable<boolean> = ko.observable(false);

        created() {
            const vm = this;

            vm.menuBars = ko.computed({
                read: () => {
                    const sets = ko.unwrap<MenuSet[]>(vm.menuSet.items);

                    const selected = _.find(sets, (set: MenuSet) => set.selected === true);

                    if (selected) {
                        return selected.menuBar || [];
                    }

                    const [first] = sets;

                    if (first) {
                        return first.menuBar || [];
                    }

                    return [];
                }
            })

            vm.companyName = ko.computed({
                read: () => {
                    
                    const selectedCid = ko.unwrap<string>(vm.currentCompanyId);
                    
                    const companies = ko.unwrap<any>(vm.companies);

                    const comp = _.find(companies, (c: any) => c.companyId === selectedCid);

                    if (comp) return comp.companyName;

                    return '';
                }
            });

        }

        mounted() {
            const vm = this;

            vm.loadData();

            $('#logo').on('click', function() {
                uk.request.jumpToTopPage();
            });

            $(window).on('wd.resize', () => {
                vm.positionLastMenuItem();
                vm.setDisplayMenu();
                vm.showPrevOrNextSlider();
            });
            ko.computed({
                read: () => {
                    const mode = ko.unwrap(vm.$window.mode);
                    const show = ko.unwrap(vm.$window.header);

                    if (mode === 'view' && show === true) {
                        vm.$el.classList.remove('hidden');

                        nts.uk.sessionStorage
                            .getItem(MENU_SET)
                            .ifEmpty(() => {
                                vm
                                    .$ajax('com', "/sys/portal/webmenu/finddetails")
                                    .then((data: MenuSet[]) => nts.uk.sessionStorage.setItem(MENU_SET, JSON.stringify(data)))
                                    .then(() => vm.loadData());
                            });

                        vm
                            .$ajax('com', 'sys/env/userinformationusermethod/canOpenInfor')
                            .then((data: boolean) => vm.showPersonSetting(__viewContext.user.isEmployee && data));

                        vm
                            .$ajax('com', 'sys/portal/webmenu/showmanual')
                            .then((data: boolean) => vm.showManual(data));

                        vm
                            .$ajax('com', '/sys/portal/webmenu/username')
                            .then((data: string) => vm.userName(data));

                        vm
                            .$ajax('com', '/sys/portal/webmenu/companies')
                            .then((data) => vm.companies(data));

                        vm
                            .$ajax('com', '/sys/portal/webmenu/currentCompany')
                            .then((data) => vm.currentCompanyId(data));

                        vm
                            .$ajax('com', '/sys/portal/webmenu/program')
                            .then((response: { name: string }[]) => {
                                if(!_.isEmpty($(".pg-name span").html())){
                                    return;
                                }
                                let queryString = nts.uk.request.location.current.queryString;
                                if (!_.isEmpty(queryString.items)) {
                                    let queryStringArray = Object.keys(queryString.items).map((key) => {
                                        return key + "=" + queryString.get(key);
                                    })
                                    const findResult = response.filter((el: any) => {
                                        let findResult = _.find(queryStringArray, (query)=>{
                                            return query == el.param;
                                        });
                                        return !_.isNil(findResult);
                                    });
                                    const pgName = findResult.length > 0 ? findResult[0] : response[0];
                
                                    if (pgName) {
                                        const { name } = pgName;
                
                                        if (name) {
                                            vm.pgNameInit(name);
                                        }
                                    }
                                } else {
                                    const [first] = response;

                                    if (first) {
                                        const { name } = first;

                                        if (name) {
                                            vm.pgNameInit(name);
                                        }
                                    }
                                }
                            });

                        vm.$nextTick(() => {
                            $(window).trigger('wd.resize');
                            $(window).trigger('wd.setAvatar');
                        });
                    } else {
                        vm.$el.classList.add('hidden');
                    }
                },
                disposeWhenNodeIsRemoved: vm.$el
            });

            $(window)
                .on('keyup', (evt) => vm.ctrl(evt.ctrlKey))
                .on('keydown', (evt) => vm.ctrl(evt.ctrlKey));
        }

        pgNameInit(name: string) {
            let vm = this;
            vm.pgName(name.substr(7));
            vm.pgId(name.substr(0,7));

            let $el = $("#pg-disp-name");
            let pgid = "<span id='pg-id'>" + vm.pgId() + "</span>";
            let pgidcaret = "<div id='pg-id-caret'></div>"
            $("body").append(pgid);
            $("body").append(pgidcaret);

            $el.mouseenter((e) => {
                let top = $el.offset().top + 23;
                let left = $el.offset().left + 5;
                $("#pg-id").css({"visibility": "visible", "top": top + "px", "left" : left + "px", "z-index" : "1000"});
                $("#pg-id-caret").css({"visibility": "visible", "top": top + "px", "left" : left + "px", "z-index" : "1000"});
            });
            $el.mouseleave((e) => {
                $("#pg-id").css({"visibility": "hidden", "top": "0px", "left" : "0px", "z-index" : "-1"});
                $("#pg-id-caret").css({"visibility": "hidden", "top": "0px", "left" : "0px", "z-index" : "-1"});
            });
        }

        loadData() {
            const vm = this;

            const menuSet: MenuSet[] = JSON.parse(nts.uk.sessionStorage.getItem(MENU_SET).orElse('[]'));

            _.each(menuSet, (set: MenuSet) => {
                _.each(set.menuBar, (bar: MenuBar, index: number) => {
                    bar.hover = ko.observable(false);
                    bar.canHover = ko.observable(false);
                    if (index < vm.countMenuBar()) {
                        bar.display = ko.observable('none');
                    } else {
                        bar.display = ko.observable('');
                    }
                });
            });

            vm.menuSet.items(menuSet);

            if (menuSet.length) {
                const selected = nts.uk.localStorage.getItem(MENU_KEY).orElse('');

                if (!selected) {
                    const [firstSet] = menuSet;

                    if (firstSet) {
                        vm.selectSet(firstSet);
                    }
                } else {
                    const selectedSet = _.find(menuSet, (m: MenuSet) => selected === `${m.companyId}:${m.webMenuCode}`);

                    if (selectedSet) {
                        vm.selectSet(selectedSet);
                    } else {
                        const [firstSet] = menuSet;

                        if (firstSet) {
                            vm.selectSet(firstSet);
                        }
                    }
                }
            }

            _.each(vm.menuBars(), (bar: MenuBar, index: number) => {
                const getPositionLeftRight = $('.slide-item').eq(index).position().left + $('.slide-item').eq(index).outerWidth();
                if ( getPositionLeftRight > $('.user-info').last().position().left) {
                    bar.hover = ko.observable(false);
                    bar.canHover = ko.observable(false);
                } else {
                    bar.canHover = ko.observable(true);
                }
            });

            $(vm.$el).find('data-bind').removeAttr('data-bind');
        }

        getName(item: MenuTree) {
            const vm = this;

            return ko.computed(() => {
                if (!vm.ctrl()) {
                    return item.displayName;
                }

                return `${item.programId}${item.screenId}`;
            });
        }

        selectSet(item: MenuSet, resetCountMenu?: boolean) {
            const vm = this;
            const sets = ko.unwrap<MenuSet[]>(vm.menuSet.items);

            if (resetCountMenu) {
                vm.countMenuBar(0);
                vm.setDisplayMenu();
            }

            _.each(sets, (set: MenuSet) => {
                set.selected = false;
            });

            item.selected = true;

            vm.menuSet.items.valueHasMutated();

            const [menuBar] = item.menuBar;

            $(vm.$el).find('[data-bind]').removeAttr('data-bind');

            vm.$nextTick(() => vm.setHoverMenu());

            //  $(vm.$el).css({ 'background-color': menuBar.backgroundColor });

            // storage selected set for reload page
            nts.uk.localStorage.setItem(MENU_KEY, `${item.companyId}:${item.webMenuCode}`);
        }

        setDisplayMenu() {
            const vm = this;
            _.each(vm.menuSet.items(), (set: MenuSet) => {
                _.each(set.menuBar, (bar: MenuBar, index: number) => {
                    bar.hover(false);
                    bar.canHover(false);
                    if (index < vm.countMenuBar()) {
                        bar.display('none');
                    } else {
                        bar.display('');
                    }
                });
            });

            vm.setHoverMenu();
        }

        setHoverMenu() {
            const vm = this;
            _.each(vm.menuBars(), (bar: MenuBar, index: number) => {
                const getPositionLeftRight = $('.slide-item').eq(index).position().left + $('.slide-item').eq(index).outerWidth();
                const getPositionLeft = $('.slide-item').eq(index).position().left;
                const userInfoLeft = $('.user-info').last().position().left;
                if (getPositionLeftRight > userInfoLeft && getPositionLeft > userInfoLeft) {

                    bar.hover(false);
                    bar.canHover(false);
                } else {

                    bar.canHover(true);
                }
            });
        }

        positionLastMenuItem() {
            const vm = this;
            const userInfoPosition = $('.user-info').last().position().left;
            const currentLastPosition = $('.slide-item').last().position()
                ? $('.slide-item').last().position().left + $('.slide-item').last().outerWidth()
                : 0;
            if (currentLastPosition < userInfoPosition
                && vm.countMenuBar() > 0 
            ) {
                vm.countMenuBar(vm.countMenuBar() - 1);
            }
        }

        selectBar(item: MenuBar) {
            const vm = this;

            if (item.link && (!item.titleMenu || item.titleMenu.length === 0)) {
                window.location.href = item.link;
            } else {
                vm.click(!vm.click());
            }
        }

        selectMenu(item: MenuTree, bar: MenuBar) {
            if (item.url && item.url !== '-') {
                bar.hover(false);

                localStorage.setItem(nts.uk.request.IS_FROM_MENU, "true");
                if (!item.queryString) {
                    window.location.href = item.url;
                } else {
                    window.location.href = `${item.url}?${item.queryString}`.replace(/\?{2,}/, '?');
                }
            }
        }

        selectCompany(item: any) {
            const vm = this;

            vm
                .$ajax('com', 'sys/portal/webmenu/changeCompany', item.companyId)
                .then((data) => {

                    vm.currentCompanyId(item.companyId);

                    vm.userName(data.personName);

                    if (!nts.uk.util.isNullOrEmpty(data.msgResult)) {

                        nts.uk.ui.dialog
                            .info({ messageId: data.msgResult })
                            .then(() => uk.request.jumpToTopPage());
                    } else {

                        uk.request.jumpToTopPage();
                    }
                })
                .fail((msg: any) => {

                    nts.uk.ui.dialog.alertError(msg.messageId);

                    vm.companies([]);

                    vm
                        .$ajax('com', 'sys/portal/webmenu/companies')
                        .then((data: any) => vm.companies(data));
                })
                
        }

        showPrevOrNextSlider() {
            const vm = this;

            if (vm.countMenuBar() > 0) {
                $('.pre-slider').css("visibility", "");
                $('.pre-slider').css("visibility", "none");
            } else {
                $('.pre-slider').css("visibility", "");
                $('.pre-slider').css("visibility", "hidden");
            }
            const lastItemPositionLeft = $('.slide-item').last().position()
                ? $('.slide-item').last().position().left + $('.slide-item').last().outerWidth()
                : 0;
            const userInfoLeft = $('.user-info').last() ? $('.user-info').last().position().left : 0;
            if (lastItemPositionLeft > userInfoLeft) {
                $('.next-slider').css("visibility", "");
                $('.next-slider').css("visibility", "none");
            } else {
                $('.next-slider').css("visibility", "");
                $('.next-slider').css("visibility", "hidden");
                console.log(lastItemPositionLeft + ' ' + userInfoLeft)
            }
        }

        hambergerClick() {
            const vm = this;
            const click: boolean = ko.unwrap<boolean>(vm.menuSet.click());
            vm.setFalseAllClick();
            vm.menuSet.click(!click);
        }

        itemBarHover(item: MenuBar) {
            const vm = this;

            item.hover(true);
            vm.setFalseAllClick();
        }

        itemBarMouseOut(item: MenuBar) {
            item.hover(false);
        }

        companiesClick() {
            const vm = this;

            const companyNameClick = ko.unwrap<boolean>(vm.companyNameClick());
            vm.setFalseAllClick();
            vm.companyNameClick(!companyNameClick);
        }

        userClick() {
            const vm = this;

            const userNameClick = ko.unwrap<boolean>(vm.userNameClick());
            vm.setFalseAllClick();
            vm.userNameClick(!userNameClick);
        }

        setFalseAllClick() {
            const vm = this;

            vm.userNameClick(false);
            vm.companyNameClick(false);
            vm.menuSet.click(false);
        }

        handleNextSlider() {
            const vm = this;
            const lastItemPositionLeft = $('.slide-item').last().position().left + $('.slide-item').last().outerWidth();
            if (lastItemPositionLeft > $('.user-info').last().position().left) {
                vm.countMenuBar(vm.countMenuBar() + 1);
            } else {
                $('.next-slider').css("visibility", "");
                $('.next-slider').css("visibility", "hidden");
            }
            vm.setDisplayMenu();
            vm.showPrevOrNextSlider();
        }


        handlePrevSlider() {
            const vm = this;
            if (vm.countMenuBar() > 0) {
                vm.countMenuBar(vm.countMenuBar() - 1);
            } else {
                $('.pre-slider').css("visibility", "");
                $('.pre-slider').css("visibility", "hidden");
            }
            vm.setDisplayMenu();
            vm.showPrevOrNextSlider();
        }

        settingPerson() {
            nts.uk.request.jumpToSettingPersonalPage();
        }

        manual() {
            const { pathToManual } = __viewContext.env;

            // jump to index page of manual
            window.open(pathToManual.replace(/\{PGID\}/, "index"));
        }

        logout() {
            const vm = this;
            const { request, sessionStorage } = nts.uk;

            const COMPANY_KEY = "nts.uk.session.COMPANY";
            const PROGRAM_KEY = "nts.uk.session.PROGRAM";

            const MENU_SET_KEY = "nts.uk.session.MENU_SET";
            const EMPLOYEE_SETTING = 'nts.uk.session.EMPLOYEE_SETTING';

            // TODO: Jump to login screen and request logout to server
            vm.$ajax('com', '/sys/portal/webmenu/logout')
                .then(function () {
                    sessionStorage.removeItem(COMPANY_KEY);
                    sessionStorage.removeItem(PROGRAM_KEY);

                    sessionStorage.removeItem(MENU_SET_KEY);
                    sessionStorage.removeItem(EMPLOYEE_SETTING);

                    // cannot remove by flag: htmlOnly
                    // cookie.remove("nts.uk.sescon", { path: "/" });


                    request.login.jumpToUsedLoginPage();
                });
        }
    }

    interface MenuSet {
        selected: boolean;
        companyId: string;
        defaultMenu: 0 | 1;
        menuBar: MenuBar[];
        webMenuCode: string;
        webMenuName: string;
    }

    interface MenuBar {
        hover: KnockoutObservable<boolean>;
        canHover: KnockoutObservable<boolean>;
        backgroundColor: string;
        code: string;
        displayOrder: number;
        link: null | string;
        menuBarId: string;
        menuBarName: string;
        menuCls: number;
        selectedAttr: number;
        system: number;
        textColor: string;
        titleMenu: MenuTitle[];
        display: KnockoutObservable<string>;
    }

    interface MenuTitle {
        backgroundColor: string;
        displayOrder: number;
        imageFile: string;
        textColor: string;
        titleMenuAtr: number;
        titleMenuCode: string;
        titleMenuId: string;
        titleMenuName: string;
        treeMenu: MenuTree[];
    }

    interface MenuTree {
        afterLoginDisplay: number;
        classification: number;
        code: string;
        defaultName: string;
        displayName: string;
        displayOrder: number;
        menuAttr: number;
        programId: string;
        queryString: string;
        screenId: string;
        system: number;
        url: string;
    }
}