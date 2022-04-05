import { router } from '@app/core/router';
import { Vue, Vuex, VueRouter } from '@app/provider';

Vue.use(Vuex);
Vue.use(VueRouter);

export const RootApp = Vue.extend({ router });