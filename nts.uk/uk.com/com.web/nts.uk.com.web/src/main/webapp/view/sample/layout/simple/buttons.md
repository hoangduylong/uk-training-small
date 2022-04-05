		
``` xml
<button data-bind="
	btn-schedule: $vm.text,
	icon: $vm.icon,
	size: 21,
	state: $vm.state1"></button>
<button data-bind="
	btn-schedule,
	icon: $vm.icon,
	size: 21,
	state: $vm.state2" class="top"></button>
```

``` js
@bean()
class ViewModel extends ko.ViewModel {
    icon: string | KnockoutObservable<string> = 'HOME';
    state1: KnockoutObservable<boolean> = ko.observable(false);
    state2: KnockoutObservable<boolean> = ko.observable(false);
}
```