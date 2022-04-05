module nts.custombinding {
    let $: any = window['$'],
        _: any = window['_'],
        ko: any = window['ko'],
        moment: any = window['moment'];


    import text = nts.uk.resource.getText;

    export class StepWizardControl implements KnockoutBindingHandler {
        init = (element: HTMLElement, valueAccessor: any, allBindingsAccessor: any, viewModel: any, bindingContext: KnockoutBindingContext) => {
            let $element = $(element),
                $step: KnockoutObservableArray<string> | Array<string> = valueAccessor(),
                $allBinding: any = allBindingsAccessor(),
                $header = $('<div>', { 'class': 'header' }).appendTo($element),
                $icon = $('<div>', { 'class': 'img' }).appendTo($header),
                $title = $('<h5>', {}).appendTo($header),
                $steps = $('<ul>', { 'class': 'step-list list-group' }).appendTo($element),
                $style = $('<style>', {
                    'type' : 'text/css',
                    'rel': 'stylesheet',
                    text: `.wizard{padding:10px;background-color:#a0a0a0}.wizard .header{position:relative;padding:12px 0}.wizard .header .img{top:0;left:0;width:80px;height:80px;position:absolute;border-radius:50%;background-color:#fff;border:2px solid #E2F79F;background-position:center;background-repeat:no-repeat}.wizard .header .img+h5{margin:0 0 0 45px;padding-left:40px;line-height:60px;background-color:#E2F79F;border-radius:5px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.wizard .step-list.list-group{margin-left:36px;border-left:8px double #fff;position:relative}.wizard .step-list.list-group .list-group-item{cursor:pointer;position:relative;border-color:transparent;background-color:transparent;padding:15px}.wizard .step-list.list-group .list-group-item:not(:last-child):before,.wizard .step-list.list-group:after,.wizard .step-list.list-group:before{content:'';display:block;position:absolute}.wizard .step-list.list-group .list-group-item:last-child{z-index:2;color:#4d4d4d;margin-left:-25px;background-color:#E2F79F;border-radius:5px;line-height:25px;margin-top:20px;font-weight:700;font-size:.9rem;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;text-align:center}.wizard .step-list.list-group .list-group-item:last-child.active{background-color:#fff;box-shadow:0 0 0 2px #00ca5c}.wizard .step-list.list-group .list-group-item:not(:last-child){color:#fff;line-height:22px;margin-left:20px;border-radius:5px;margin-bottom:15px}.wizard .step-list.list-group .list-group-item:not(:last-child):before{width:20px;height:20px;border:2px solid #fff;border-radius:50%;left:-36px;background-color:#4d4d4d;z-index:1}.wizard .step-list.list-group .list-group-item:not(:last-child).active{color:#4d4d4d;background-color:#fff}.wizard .step-list.list-group .list-group-item:not(:last-child).active:before{background-color:#00B050}.wizard .step-list.list-group .list-group-item:not(:last-child).active:after{content:'';display:block;width:22px;height:6px;position:absolute;left:-22px;z-index:0;top:calc(50% - 2px);background-color:#fff}.wizard .step-list.list-group:before{border-top:7px solid #fff;border-left:12px solid transparent;border-right:12px solid transparent;bottom:55px;left:-16px;z-index:1}.wizard .step-list.list-group:after{background-color:#a0a0a0;left:-8px;width:8px;bottom:0;height:60px;z-index:0}`
                }).appendTo($element);

            $element.addClass('wizard');

            $title.text(text((ko.toJS($allBinding.configs) || { title: '' }).title));

            ko.computed({
                read: () => {
                    $icon.css({ 'background-image': `url(\'${(ko.toJS($allBinding.configs) || { icon: '' }).icon}\')` });
                }
            });

            ko.computed({
                read: () => {
                    let step: string = ko.toJS($allBinding.selected),
                        steps: string[] = ko.toJS($step);

                    $steps.empty();
                    _.each(steps, (s: string, i: number) => {
                        $('<li>', { 'class': `list-group-item ${_.isEqual(step, s) ? 'active' : ''}`, text: text(s) })
                            .appendTo($steps);
                    });
                }
            });

            return { controlsDescendantBindings: true };
        }
    }
}

ko.bindingHandlers["ntsStepWizard"] = new nts.custombinding.StepWizardControl();