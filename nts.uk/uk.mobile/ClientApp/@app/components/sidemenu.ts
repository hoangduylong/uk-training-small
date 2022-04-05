import { Vue, _ } from '@app/provider';
import { Language } from '@app/plugins/i18n';
import { dom, browser, storage } from '@app/utils';
import { component, Watch } from '@app/core/component';

// tslint:disable-next-line: variable-name
const _SideMenu = Vue.observable({
    show: false,
    document: false,
    items: [],
    visible: true,
    reload: 0
}), SideMenu = {
    get show() {
        return _SideMenu.show;
    },
    set show(value: boolean) {
        _SideMenu.show = value;
    },
    get items() {
        return _SideMenu.items;
    },
    set items(items: Array<any>) {
        _SideMenu.items = items;
    },
    set visible(visible: boolean) {
        _SideMenu.visible = visible;
    },
    get visible() {
        return _SideMenu.visible;
    },
    set document(value: boolean) {
        _SideMenu.document = value;
    },
    get document() {
        return _SideMenu.document;
    },
    reload() {
        _SideMenu.reload++;
    }
}, resize = () => {
    if (!browser.mobile) {
        SideMenu.show = false;
    }
};
@component({
    template: `<nav class="sidebar" v-bind:class="{ show }" v-if="visible">
        <div class="sidebar-header">
            <h3 v-on:touchstart.prevent>
                <router-link to="/" v-on:click="show = false">
                    <span class="d-block">{{ (empName || 'app_name') | i18n }}</span>
                    <template v-if="warning">
                        <span class="mt-1 mb-3 small d-block" v-bind:key="'show_warn'">{{'CCGS20_2' | i18n}}</span>
                    </template>
                    <template v-else></template>
                </router-link>
            </h3>
            <button type="button" class="navbar-btn" v-on:click="show = !show">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        <ul class="list-unstyled list-group components" ref="scrollEl" v-on:click="updateScroll">
            <li v-if="document"><nts-search-box v-model="filter" class="mt-2 mr-2 ml-2" class-input="text-white" class-container="text-white" placeholder="filter_menu" /></li>
            <li v-else>
                <router-link v-bind:to="{ path: '/ccg/008/a', query: { t } }">
                    <span v-on:click="hideSideBar"><i class="fas fa-home mr-2"></i>{{ 'CCGS20_4' | i18n }}</span>
                </router-link>
            </li>
            <li v-for="(m, i) in items" v-bind:class="{ 'list-unstyled-item': m.childs }" v-bind:key="i">
                <template v-if="m.hasc">
                    <a class="dropdown-toggle collapse" v-on:click="toggleDropdown(m)" v-bind:class="{ 'show': active === m || (!!filter && m.hasc) }">
                        <span><i class="far mr-2" v-bind:class="{'fa-folder': active !== m, 'fa-folder-open': active === m }"></i>{{(m.title) | i18n }}</span>
                    </a>
                    <transition name="collapse">
                        <ul class="list-unstyled" v-show="active == m || (!!filter && m.hasc)">
                            <li v-for="(t, j) in m.childs" v-bind:key="j">
                                <router-link v-bind:to="{ path: t.url, query: { t } }">
                                    <span v-on:click="hideSideBar"><i class="fas fa-angle-right mr-2"></i>{{t.title | i18n }}</span>
                                </router-link>
                            </li>
                        </ul>
                    </transition>
                </template>
                <template v-else>
                    <router-link v-bind:to="{ path: m.url, query: { t } }">
                        <span v-on:click="hideSideBar"><i class="fas fa-angle-right mr-2"></i>{{m.title | i18n }}</span>
                    </router-link>
                </template>
            </li>
            <template v-if="!document">
                <li v-bind:key="'show_if_not_doc'">
                    <a v-on:click="removeSession">
                        <span><i class="fas fa-sign-out-alt mr-2"></i>{{ 'CCGS20_3' | i18n }}</span>
                    </a>
                </li>
            </template>
            <template v-else></template>
        </ul>
    </nav>
    <nav v-else></nav>`,
    computed: {
        show: {
            get() {
                return _SideMenu.show;
            },
            set(value: boolean) {
                _SideMenu.show = value;
            }
        },
        items: {
            get() {
                let kwo = this.filter.toLowerCase().trim(),
                    i18n = Language.i18n,
                    items = SideMenu.items
                        .map((m) => ({
                            url: m.url,
                            title: m.title,
                            childs: i18n(m.title).toLowerCase().indexOf(kwo) > -1 ? (m.childs || []) : (m.childs || []).filter((c) => i18n(c.title).toLowerCase().indexOf(kwo) > -1),
                            hasc: !!(m.childs || []).length
                        }))
                        .filter((f) => {
                            return i18n(f.title).toLowerCase().indexOf(kwo) > -1 || !!f.childs.length;
                        });

                return items;
            }
        },
        visible: {
            get() {
                return _SideMenu.visible;
            }
        },
        document: {
            get() {
                return _SideMenu.document;
            }
        },
        reload() {
            return _SideMenu.reload;
        }
    }
})
export class SideMenuBar extends Vue {
    public active: any = {};
    public filter: string = '';
    public empName: string = '';
    public warning: boolean = false;

    get t() {
        const vm = this;
        const { $dt } = vm;
        const { now, date } = $dt;

        return date(now, 'sSSS');
    }

    constructor() {
        super();

        if (browser.width >= 992) {
            let shoow = storage.local.getItem('sidebar');
            SideMenu.show = shoow === undefined ? true : shoow === 'show';
        }
    }

    @Watch('reload')
    public watchReload() {
        let self = this,
            username = '/sys/portal/webmenu/username',
            menuGet = '/sys/portal/webmenu/mobile/findByEmp',
            systemStop = 'ctx/sys/gateway/stopsetting/isSystemStop';

        if (!SideMenu.document) {
            self.$http
                .post(username)
                .then((data: any) => {
                    self.empName = data.data.value;

                    // load menu data
                    self.$http.post(menuGet).then((data: any) => {
                        SideMenu.items = _.map(data.data,
                            (webMenuParam: any) => ({
                                title: webMenuParam.menuName,
                                url: `/${webMenuParam.url}`.replace(/\/+/g, '/'),
                                childs: _.map(webMenuParam.childLst,
                                    (menuBarparam: any) => ({
                                        title: menuBarparam.menuName,
                                        url: `/${menuBarparam.url}`.replace(/\/+/g, '/'),
                                        childs: []
                                    }))
                            }));
                    });
                })
                .then(() => {
                    self.$http.post(systemStop).then((resp: any) => self.warning = resp.data.value);
                });
        }
    }

    public hideSideBar() {
        EventBus.$emit('hideSideBar', true);
        if (browser.width < 992) {
            SideMenu.show = false;
        }
    }

    public toggleDropdown(item: any) {
        if (this.active === item) {
            this.active = {};
        } else {
            this.active = item;
        }
    }

    @Watch('show', { immediate: true })
    public toggleMaskLayer(show: boolean) {
        let self = this;

        if (!show) {
            self.$mask('hide');

            dom.removeClass(document.body, 'show-side-bar');
        } else {
            if (browser.width < 992) {
                self.$mask('show')
                    .on(() => SideMenu.show = false);
            }

            let top = document.scrollingElement.scrollTop,
                container = document.body.querySelector('.container-fluid') as HTMLElement;

            dom.addClass(document.body, 'show-side-bar');

            if (!container.style.marginTop) {
                container.style.marginTop = `-${top}px`;
            }
        }

        storage.local.setItem('sidebar', show ? 'show' : 'hide');
    }

    public removeSession(evt: Event) {
        this.hideSideBar();
        this.$auth.logout();

        evt.preventDefault();
    }

    public created() {
        dom.registerEventHandler(window, 'resize', resize);
    }
    
    public mounted() {
        const vm = this;

        vm.$auth
            .token
            .then((c: string | null) => {
                if (c) {
                    SideMenu.reload();
                }
            });
    }

    public destroyed() {
        dom.removeEventHandler(window, 'resize', resize);
    }

    public updateScroll() {
        const ul = this.$refs.scrollEl as HTMLElement;

        if (ul) {
            ul.style.display = 'none';

            setTimeout(() => {
                ul.style.display = '';
            }, 0);
        }
    }
}

export { SideMenu };

const EventBus = new Vue();
export default EventBus;