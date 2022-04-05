import '@views/index';

import '@app/index';
import '@app/plugins';

import { Vue } from '@app/provider';
import { RootApp } from '@app/core';
import { obj, browser } from '@app/utils';

import { SideMenuBar, NavMenuBar, SideMenu } from '@app/components';
import { resources, Language, LanguageBar, } from '@app/plugins/i18n';

// Vue.config.silent = true;
Vue.config.devtools = true;
// Vue.config.productionTip = false;

const data = () => ({
    ready: false
});

const computed = {
    pgName: {
        get() {
            return Language.pgName || 'app_name';
        }
    }
};

const components = {
    'nav-bar': NavMenuBar,
    'side-bar': SideMenuBar,
    'language-bar': LanguageBar
};

const $el = document.querySelector('body>#app_uk_mobile');

const app = new (RootApp.extend({ data, computed, components }))().$mount($el);

browser.private
    .then((prid: boolean) => {
        if (browser.version === 'Safari 10' && prid) {
            app.$modal.warn({ messageId: 'Msg_1533' });
        } else {
            app.$mask('show', { message: true, opacity: 0.35 });
        }
    })
    .then(() => app.$auth.token)
    .then((tk: string | null) => {
        if (tk) {
            // xử lý các hàm lấy dữ liệu cần thiết ở đây
            SideMenu.reload();
        }
    })
    .then(() => app.$http.resources)
    .then((resr: any) => obj.merge(resources.jp, resr, true))
    .then(() => Language.refresh())
    .then(() => app.ready = true)
    .then(() => app.$mask('hide'))
    .catch(() => app.$mask('hide'));

// Object.assign(window, { Vue, app });
