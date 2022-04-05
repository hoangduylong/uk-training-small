export const routes: Array<{
    name: string;
    path: string;
    component: any;
    children?: any[];
    props?: boolean;
}> = [];

// lazy load
// {
//    name: 'ccg007a',
//    path: '/ccg/007/a',
//    component: () => import(/* webpackChunkName: "views/ccg/007/a" */ '../../views/ccg/007/a/ccg007a').then(f => f.ContractAuthenticationComponent)
// }, {
//    name: 'ccg007b',
//    path: '/ccg/007/b',
//    component: () => import(/* webpackChunkName: "views/ccg/007/b" */ '../../views/ccg/007/b/ccg007b').then(f => f.LoginComponent)
// }