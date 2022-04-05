/// <reference path="../../reference.ts"/>

module nts.uk.ui.koExtentions {
    export module icon {
        const icons: Array<number | string> = [];

        interface IconBindingParam {
            no: string;
            width: string;
            height: string;
        }

        @handler({
            bindingName: 'ntsIcon'
        })
        export class NtsIconBindingHandler implements KnockoutBindingHandler {
            init(element: HTMLElement, valueAccessor: () => IconBindingParam) {
                // Get data
                const data = valueAccessor();
                const iconNo: string = ko.unwrap(data.no);
                const width: string = ko.unwrap(data.width) || "100%";
                const height: string = ko.unwrap(data.height) || "100%";

                const iconFileName = iconNo + ".png";
                const iconPath = nts.uk.request.location.siteRoot
                    .mergeRelativePath(nts.uk.request.WEB_APP_NAME["comjs"] + "/")
                    .mergeRelativePath("lib/nittsu/ui/style/stylesheets/images/icons/numbered/")
                    .mergeRelativePath(iconFileName)
                    .serialize();

                const $icon = $(element);
                const $parent = $icon.closest("td[role='gridcell']");

                $icon.addClass("img-icon");

                $icon.css({
                    "background-image": "url(" + iconPath + ")",
                    "background-size": "contain",
                    width: width,
                    height: height
                });

                if (!_.isNil($parent)) {
                    $parent.css("white-space", "nowrap");
                }
            }
        }

        @handler({
            bindingName: 'icon',
            validatable: true,
            virtual: false
        })
        export class IconBindingHandler implements KnockoutBindingHandler {
            update(el: HTMLElement, value: () => KnockoutObservable<number> | number, allBindingsAccessor: KnockoutAllBindingsAccessor) {
                const numb: number = ko.unwrap(value());
                const size: string = allBindingsAccessor.get('size') || 'contain';
                const url = `/nts.uk.com.js.web/lib/nittsu/ui/style/stylesheets/images/icons/numbered/${numb}.png`;

                $.Deferred()
                    .resolve(true)
                    .then(() => icons.indexOf(numb) > -1)
                    .then((exist: boolean) => !!exist || $.get(url))
                    .then(() => {
                        if (icons.indexOf(numb) === -1) {
                            icons.push(numb);
                        }

                        $(el).css({
                            'background-image': `url('${url}')`,
                            'background-repeat': 'no-repeat',
                            'background-position': 'center',
                            'background-size': size
                        });
                    });
            }
        }
    }
}
