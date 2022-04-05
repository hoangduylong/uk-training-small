import { _ } from '@app/provider';
import { routes } from '@app/core/routes';

export class Menu {
    public static get all(): Array<any> {
        return _(routes)
            .map((m: any) => ({
                url: m.path,
                title: m.name,
                childs: (m.children || []).map((c) => ({
                    url: m.path + '/' + c.path,
                    title: c.name
                }))
            }))
            .filter((m) => m.url !== '*')
            .flatMapDeep((m) => [m, m.childs])
            .map((m) => _.omit(m, ['childs']))
            .map((m) => ({ url: m.url.split('/'), title: m.title }))
            .groupBy((m) => m.url[1])
            .map((value, key) => ({ key, value: value.map((m: any) => ({ title: m.title, url: m.url.join('/') })) }))
            .map((m: any) => m.value.length === 1 ? m.value[0] : ({ title: m.key, childs: m.value }))
            .value();
    }

    public static get top(): Array<any> {
        return Menu.all.filter((m) => m.title !== 'documents');
    }

    public static get sample(): any {
        let docs = _.find(Menu.all, (m) => m.title === 'documents') || { childs: [] };

        return _(docs.childs)
            .filter((f) => f.title !== 'DocumentIndex')
            .map((m) => ({ url: m.url.split('/'), title: m.title }))
            .groupBy((m: any) => m.url[2])
            .map((value, key) => ({ key, value: value.map((m: any) => ({ title: m.title, url: m.url.join('/') })) }))
            .map((m: any) => m.value.length === 1 ? m.value[0] : ({ title: m.key, childs: m.value }))
            .value();
    }
}

export { Menu as menu };