/// <reference path="./viewcontext.d.ts" />

/** Create new ViewModel and automatic binding to __viewContext */
function bean(dialogOption?: JQueryUI.DialogOptions): any {
	return function (ctor: any): any {
		__viewContext.ready(() => {
			const { localShared } = nts.uk.ui.windows.container;

			nts.uk.ui.viewmodel
				.$storage()
				.then(($params: any) => {
					const $viewModel = new ctor($params || (_.isEmpty(localShared) ? undefined : localShared))
						, $created = $viewModel['created'];

					_.extend($viewModel, { $el: undefined });

					// hook to created function
					if ($created && _.isFunction($created)) {
						$created.apply($viewModel, [$params || (_.isEmpty(localShared) ? undefined : localShared)]);
					}

					__viewContext.bind($viewModel, dialogOption);

					const { $window } = $viewModel;
					const kvm = nts.uk.ui._viewModel.kiban;

					kvm.title
						.subscribe((title: string) => {
							const old = ko.unwrap($window.title)

							if (title !== old) {
								$window.title(title);
							} else {
								$window.title.valueHasMutated();
							}
						});

					kvm.systemName.valueHasMutated();

					$window.title
						.subscribe((title: string) => kvm.title(title));

					kvm.mode
						.subscribe((mode: string) => {
							const old = ko.unwrap($window.mode)

							if (mode !== old) {
								$window.mode(mode);
							} else {
								$window.mode.valueHasMutated();
							}
						});

					kvm.mode.valueHasMutated();

					$window.mode
						.subscribe((mode: 'view' | 'modal') => kvm.mode.valueHasMutated());

					kvm.header
						.subscribe((header: boolean) => {
							const old = ko.unwrap($window.header)

							if (header !== old) {
								$window.header(header);
							} else {
								$window.header.valueHasMutated();
							}
						});

					kvm.header.valueHasMutated();

					$window.header
						.subscribe((header: boolean) => kvm.header(header));

					$(() => {
						// hook to mounted function
						$viewModel.$nextTick(() => {
							const $mounted = $viewModel['mounted'];

							_.extend($viewModel, { $el: document.querySelector('#master-wrapper') });

							if (kvm) {
								ko.computed({
									read: () => {
										$viewModel.$validate.valid(!kvm.errorDialogViewModel.errors().length);
									},
									owner: $viewModel,
									disposeWhenNodeIsRemoved: $viewModel.$el
								});
							}

							if ($mounted && _.isFunction($mounted)) {
								$mounted.apply($viewModel, []);
							}
						});
					});
				});
		});
	};
}

function component(options: { name: string; template: string; }): any {
	return function (ctor: any): any {
		return $.Deferred().resolve(options.template.match(/\.html$/))
			.then((url: boolean) => {
				return url ? $.get(options.template) : options.template;
			})
			.then((template: string) => {
				if (!ko.components.isRegistered(options.name)) {
					ko.components.register(options.name, {
						template,
						viewModel: {
							createViewModel($params: any, $el: any) {
								const $viewModel = new ctor($params)
									, $created = $viewModel['created'];

								_.extend($viewModel, { $el: undefined });

								// hook to created function
								if ($created && _.isFunction($created)) {
									$created.apply($viewModel, [$params]);
								}

								const { $window } = $viewModel;
								const kvm = nts.uk.ui._viewModel.kiban;

								kvm.title
									.subscribe((title: string) => {
										const old = ko.unwrap($window.title)

										if (title !== old) {
											$window.title(title);
										} else {
											$window.title.valueHasMutated();
										}
									});

								kvm.systemName.valueHasMutated();

								$window.title
									.subscribe((title: string) => kvm.title(title));

								kvm.mode
									.subscribe((mode: string) => {
										const old = ko.unwrap($window.mode)

										if (mode !== old) {
											$window.mode(mode);
										} else {
											$window.mode.valueHasMutated();
										}
									});

								kvm.mode.valueHasMutated();

								$window.mode
									.subscribe((mode: 'view' | 'modal') => kvm.mode.valueHasMutated());

								kvm.header
									.subscribe((header: boolean) => {
										const old = ko.unwrap($window.header)

										if (header !== old) {
											$window.header(header);
										} else {
											$window.header.valueHasMutated();
										}
									});

								kvm.header.valueHasMutated();

								$window.header
									.subscribe((header: boolean) => kvm.header(header));

								// hook to mounted function
								$viewModel.$nextTick(() => {
									const $mounted = $viewModel['mounted'];
									const kvm = nts.uk.ui._viewModel.kiban;

									_.extend($viewModel, { $el: $el.element });

									if (kvm) {
										ko.computed({
											read: () => {
												$viewModel.$validate.valid(!kvm.errorDialogViewModel.errors().length);
											},
											owner: $viewModel,
											disposeWhenNodeIsRemoved: $el.element
										});
									}

									if ($mounted && _.isFunction($mounted)) {
										$mounted.apply($viewModel, []);
									}
								});

								// run if component mode
								Object.defineProperty($viewModel, 'dispose', {
									value: function dispose() {

										if (typeof $viewModel.destroyed === 'function') {
											$viewModel.destroyed.apply($viewModel, []);
										}
									}
								});

								return $viewModel;
							}
						}
					});
				}
			});
	}
}

function handler(params: { virtual?: boolean; bindingName: string; validatable?: boolean; }) {
	return function (constructor: { new(): KnockoutBindingHandler; }) {
		ko.bindingHandlers[params.bindingName] = new constructor();
		ko.virtualElements.allowedBindings[params.bindingName] = !!params.virtual;

		// block rewrite binding
		if (params.validatable) {
			ko.utils.extend(ko.expressionRewriting.bindingRewriteValidators, { [params.bindingName]: false });
		}
	};
}


// redeclare windows.sub module
declare module nts {
	export module uk {
		export module ui {
			export module windows {
				export module sub {
					interface ModalObject {
						onClosed: (cb: () => void) => void;
					}

					export function modal(path: string): ModalObject;
					export function modal(path: string, options: any): ModalObject;
					export function modal(webAppId: nts.uk.request.WebAppId, path: string): ModalObject;
					export function modal(webAppId: nts.uk.request.WebAppId, path: string, options: any): ModalObject;

					export function modeless(path: string): ModalObject;
					export function modeless(path: string, options: any): ModalObject;
					export function modeless(webAppId: nts.uk.request.WebAppId, path: string): ModalObject;
					export function modeless(webAppId: nts.uk.request.WebAppId, path: string, options: any): ModalObject;
				}
			}
		}
	}
}

module nts.uk.ui.viewmodel {
	const OPENWD = 'OPEN_WINDOWS_DATA'
		, { ui, request, resource } = nts.uk
		, { windows, block, dialog } = ui
		, $storeSession = function (name: string, params?: any): JQueryPromise<any> {
			if (arguments.length === 2) {
				return nts.uk.characteristics
					.save(name, params)
					.then(() => $storeSession(name));
			} else if (arguments.length === 1) {
				// getter method
				return nts.uk.characteristics
					.restore(name)
					.then((data) => {
						if (data !== undefined) {
							return data;
						}

						return windows.getShared(name);
					});
			}
		};

	export const $storage = function ($data?: any) {
		if (arguments.length === 1) {
			return $storeSession(OPENWD, $data);
		} else if (arguments.length === 0) {
			return $storeSession(OPENWD)
				.then((value: any) => {
					// return value;
					return nts.uk.characteristics
						.remove(OPENWD)
						.then(() => value);
				});
		}
	};

	// create base viewmodel for all implement
	function BaseViewModel() { }

	function $i18n(text: string, params?: string[]) {
		return resource.getText(text, params);
	}

	function $jump() {
		const args: any[] = Array.prototype.slice.apply(arguments)
			, params = args.length === 3 && _.isString(args[0]) && _.isString(args[1]) ? args[2] :
				(args.length == 2 && _.indexOf(args[1], '.xhtml')) > -1 ? null : args[1];

		if (window.top === window.self) {
			$storage(params).then(() => request.jump.apply(null, args));
		} else {
			// jump from dialog or frame
			$storage(params).then(() => (request as any).jumpFromDialogOrFrame.apply(null, args));
		}
	};

	BaseViewModel.prototype.$i18n = $i18n;

	Object.defineProperties($i18n, {
		text: {
			value: $i18n
		},
		message: {
			value: resource.getMessage
		},
		controlName: {
			value: resource.getControlName
		}
	});

	BaseViewModel.prototype.$ajax = request.ajax;
	BaseViewModel.prototype.$nextTick = ko.tasks.schedule;

	BaseViewModel.prototype.$user = __viewContext['user'];
	BaseViewModel.prototype.$program = __viewContext['program'];

	const $date = {
		diff: 0,
		tick: -1,
		clock: -1,
		now() {
			return Date.now()
		},
		today() {
			return $date.now();
		}
	};

	const getTime = () => {
		request.ajax('/server/time/now').then((time: string) => {
			_.extend($date, {
				diff: moment(time, 'YYYY-MM-DDTHH:mm:ss').diff(moment())
			});
		});
	};

	// get date time now
	// setInterval(() => {
	// 	const now = Date.now();
	// 	const diff = now - $date.clock;

	// 	$date.clock = now;

	// 	if (Math.abs(diff) > 5000) {
	// 		getTime();
	// 	}
	// }, 500);

	BaseViewModel.prototype.$date = Object.defineProperties($date, {
		now: {
			value: function $now() {
				return moment().add($date.diff, 'ms').toDate();
			}
		},
		today: {
			value: function $today() {
				return moment($date.now()).startOf('day').toDate();
			}
		},
		interval: {
			value: function $interval(interval: number) {
				// clear default intervale
				clearInterval($date.tick);

				// set new interface
				$date.tick = setInterval(getTime, interval);
			}
		}
	});

	const $dialog = Object.defineProperties({}, {
		info: {
			value: function $info() {
				const dfd = $.Deferred<void>();
				const args: any[] = Array.prototype.slice.apply(arguments);

				dialog.info.apply(null, args).then(() => dfd.resolve());

				return dfd.promise();
			}
		},
		alert: {
			value: function $alert() {
				const dfd = $.Deferred<void>();
				const args: any[] = Array.prototype.slice.apply(arguments);

				dialog.alert.apply(null, args).then(() => dfd.resolve());

				return dfd.promise();
			}
		},
		error: {
			value: function $error() {
				const dfd = $.Deferred<void>();
				const args: any[] = Array.prototype.slice.apply(arguments);

				dialog.error.apply(null, args).then(() => dfd.resolve());

				return dfd.promise();
			}
		},
		confirm: {
			value: function $confirm() {
				const dfd = $.Deferred<'no' | 'yes'>();
				const args: any[] = Array.prototype.slice.apply(arguments);

				const $cf = dialog.confirm.apply(null, args);

				$cf.ifYes(() => {
					dfd.resolve('yes');
				});

				$cf.ifNo(() => {
					dfd.resolve('no');
				});

				return dfd.promise();
			}
		}
	});

	Object.defineProperties($dialog.confirm, {
		yesNo: {
			value: function () {
				const dfd = $.Deferred<'no' | 'yes'>();
				const args: any[] = Array.prototype.slice.apply(arguments);

				const $cf = dialog.confirm.apply(null, args);

				$cf.ifYes(() => {
					dfd.resolve('yes');
				});

				$cf.ifNo(() => {
					dfd.resolve('no');
				});

				return dfd.promise();
			}
		},
		yesCancel: {
			value: function () {
				const dfd = $.Deferred<'yes' | 'cancel'>();
				const args: any[] = Array.prototype.slice.apply(arguments);

				const $cf = dialog.confirm.apply(null, args);

				$cf.ifYes(() => {
					dfd.resolve('yes');
				});

				$cf.ifCancel(() => {
					dfd.resolve('cancel');
				});

				return dfd.promise();
			}
		}
	});

	BaseViewModel.prototype.$dialog = $dialog;

	BaseViewModel.prototype.$jump = $jump;

	Object.defineProperties($jump, {
		self: {
			value: function $to() {
				$jump.apply(null, [...Array.prototype.slice.apply(arguments, [])]);
			}
		},
		blank: {
			value: function $other() {
				const args: Array<any> = Array.prototype.slice.apply(arguments, [])
					, params = args.length === 3 && _.isString(args[0]) && _.isString(args[1]) ? args[2] :
						(args.length == 2 && _.indexOf(args[1], '.xhtml')) > -1 ? null : args[1];

				$storage(params).then(() => (request as any).jumpToNewWindow.apply(null, args));
			}
		}
	});

	const $shared: string[] = [];

	const $size = function (height: string | number, width: string | number) {
		const wd = nts.uk.ui.windows.getSelf();

		if (wd) {
			wd.setSize(height, width);
		}
	};

	Object.defineProperties($size, {
		width: {
			value: function (width: string | number) {
				const wd = nts.uk.ui.windows.getSelf();

				if (wd) {
					wd.setWidth(width);
				}
			}
		},
		height: {
			value: function (height: string | number) {
				const wd = nts.uk.ui.windows.getSelf();

				if (wd) {
					wd.setHeight(height);
				}
			}
		}
	});

	BaseViewModel.prototype.$window = Object.defineProperties({}, {
		mode: {
			value: ko.observable('view') // nts.uk.ui._viewModel.kiban.mode
		},
		title: {
			value: ko.observable('') //nts.uk.ui._viewModel.kiban.title
		},
		header: {
			value: ko.observable(null).extend({ rateLimit: 100 }) //nts.uk.ui._viewModel.kiban.header
		},
		size: {
			value: $size
		},
		close: {
			value: function $close(result?: any) {
				if (window.top !== window) {
					$.Deferred()
						.resolve(true)
						.then(() => $storage(result))
						.then(() => windows.close());
				}
			}
		},
		modal: {
			value: function $modal(webapp: request.WebAppId, path: any, params?: any, options?: any) {
				const jdf = $.Deferred<any>();
				const nowapp = ['at', 'pr', 'hr', 'com'].indexOf(webapp) === -1;

				if (nowapp) {
					$storage(path)
						.then(() => {
							windows.sub.modal(webapp, params)
								.onClosed(() => {
									const { localShared } = windows.container;

									_.each(localShared, (value: any, key: string) => {
										$shared.push(key);
										windows.setShared(key, value);
									});

									$storage().then(($data: any) => jdf.resolve($data || (_.keys(localShared).length ? localShared : undefined)));
								});
						});
				} else {
					$storage(params)
						.then(() => {
							windows.sub.modal(webapp, path, options)
								.onClosed(() => {
									const { localShared } = windows.container;

									_.each(localShared, (value: any, key: string) => {
										$shared.push(key);
										windows.setShared(key, value);
									});

									$storage().then(($data: any) => jdf.resolve($data || (_.keys(localShared).length ? localShared : undefined)));
								});
						});
				}

				return jdf.promise();
			}
		},
		modeless: {
			value: function $modeless(webapp: request.WebAppId, path: any, params?: any, options?: any) {
				const jdf = $.Deferred<any>();
				const nowapp = ['at', 'pr', 'hr', 'com'].indexOf(webapp) === -1;

				if (nowapp) {
					$storage(path)
						.then(() => {
							windows.sub.modeless(webapp, params)
								.onClosed(() => {
									const { localShared } = windows.container;

									_.each(localShared, (value: any, key: string) => {
										$shared.push(key);
										windows.setShared(key, value);
									});

									$storage().then(($data: any) => jdf.resolve($data || (_.keys(localShared).length ? localShared : undefined)));
								});
						});
				} else {
					$storage(params)
						.then(() => {
							windows.sub.modeless(webapp, path, options)
								.onClosed(() => {
									const { localShared } = windows.container;

									_.each(localShared, (value: any, key: string) => {
										$shared.push(key);
										windows.setShared(key, value);
									});

									$storage().then(($data: any) => jdf.resolve($data || (_.keys(localShared).length ? localShared : undefined)));
								});
						});
				}

				return jdf.promise();
			}
		},
		shared: {
			value: function $share(name: string, params: any) {
				if (arguments.length === 1) {
					return $.Deferred()
						.resolve(true)
						.then(() => {
							const shared = windows.getShared(name);

							if ($shared.indexOf(name) > -1) {
								windows.setShared(name, undefined);

								// remove shared
								_.remove($shared, (c: string) => c === name);
							}

							return shared;
						});
				} else {
					return $.Deferred()
						.resolve(true)
						.then(() => windows.setShared(name, params))
						.then(() => windows.getShared(name));
				}
			}
		},
		storage: {
			value: function $storage(name: string, params: any) {
				if (arguments.length == 1) {
					return $storeSession(name)
						.then((value) => {
							if ($shared.indexOf(name) > -1) {
								windows.setShared(name, undefined);

								// remove shared
								_.remove($shared, (c: string) => c === name);
							}

							return value;
						});
				} else {
					return $.Deferred()
						.resolve(true)
						.then(() => {
							return $storeSession(name, params)
								// for old page
								.then(() => windows.setShared(name, params));
						})
						.then(() => $storeSession(name));
				}
			}
		}
	});

	// Hàm blockui được wrapper lại để gọi cho thống nhất
	BaseViewModel.prototype.$blockui = function $blockui(act: 'show' | 'hide' | 'clear' | 'invisible' | 'grayout' | 'grayoutView' | 'invisibleView' | 'clearView') {
		const vm = this;

		return $.Deferred()
			.resolve(true)
			.then(() => {
				switch (act) {
					default:
					case 'hide':
					case 'clear':
						block.clear();
						break;
					case 'show':
					case 'invisible':
						block.invisible();
						break;
					case 'grayout':
						block.grayout();
						break;
					case 'clearView':
						block.clear(vm.$el);
						break;
					case 'grayoutView':
						block.grayout(vm.$el);
						break;
					case 'invisibleView':
						block.invisible(vm.$el);
						break;
				}
			});
	};

	BaseViewModel.prototype.$errors = function $errors() {
		const kvm = nts.uk.ui._viewModel.kiban;
		const args: any[] = Array.prototype.slice.apply(arguments);

		if (args.length == 1) {
			// if action is clear, call validate clear action
			if (args[0] === 'clear') {
				return $.Deferred()
					.resolve(true)
					.then(() => $('.nts-input').ntsError('clear'))
					// if some element remove before clear func call
					.then(() => kvm.errorDialogViewModel.errors([]))
					.then(() => !$('.nts-input').ntsError('hasError'));
			} else {
				const errors: {
					[name: string]: any;
				} = args[0];

				return $.Deferred()
					.resolve(true)
					.then(() => {
						_.each(errors, (value: any, key: string) => $(key).ntsError('set', value));
					})
					.then(() => !$(_.keys(errors).join(', ')).ntsError('hasError'));
			}
		} else if (args.length === 2) {
			const name: string = args[0]
				, messageId: any = args[1];

			if (name === 'clear') {
				if (_.isString(messageId)) {
					const $selector = messageId;

					return $.Deferred()
						.resolve(true)
						.then(() => $($selector).ntsError('clear'))
						.then(() => !$($selector).ntsError('hasError'));
				} else if (_.isArray(messageId)) {
					const $selectors = messageId.join(', ');

					return $.Deferred()
						.resolve(true)
						.then(() => $($selectors).ntsError('clear'))
						.then(() => !$($selectors).ntsError('hasError'));
				}
			} else {
				if (_.isString(messageId)) {
					return $.Deferred()
						.resolve(true)
						.then(() => $(name).ntsError('set', { messageId }))
						.then(() => !$(name).ntsError('hasError'));
				} else {
					return $.Deferred()
						.resolve(true)
						.then(() => $(name).ntsError('set', messageId))
						.then(() => !$(name).ntsError('hasError'));
				}
			}
		} else if (args.length > 2) {
			if (args[0] === 'clear') {
				const $selectors = args.join(', ').replace(/^clear ,/, '');

				return $.Deferred()
					.resolve(true)
					.then(() => $($selectors).ntsError('clear'))
					.then(() => !$($selectors).ntsError('hasError'));
			}
		}

		return $.Deferred()
			.resolve(true)
			/** Nếu có lỗi thì trả về false, không thì true */
			.then(() => !$('.nts-input').ntsError('hasError'));;
	};

	// Hàm validate được wrapper lại để có thể thực hiện promisse
	const $validate = function $validate(act: string[]) {
		const args: string[] = Array.prototype.slice.apply(arguments);

		if (args.length === 0) {
			return $.Deferred()
				.resolve(true)
				/** Gọi xử lý validate của kiban */
				.then(() => $('.nts-input').trigger("validate"))
				/** Nếu có lỗi thì trả về false, không thì true */
				.then(() => !$('.nts-input').ntsError('hasError'));
		} else if (args.length === 1) {
			let selectors = '';

			if (_.isString(act)) {
				selectors = act;
			} else if (_.isArray(act)) {
				selectors = act.join(', ');
			}

			return $.Deferred()
				.resolve(true)
				/** Gọi xử lý validate của kiban */
				.then(() => $(selectors).trigger("validate"))
				/** Nếu có lỗi thì trả về false, không thì true */
				.then(() => !$(selectors).ntsError('hasError'));
		} else {
			let selectors = args.join(', ');

			return $.Deferred()
				.resolve(true)
				/** Gọi xử lý validate của kiban */
				.then(() => $(selectors).trigger("validate"))
				/** Nếu có lỗi thì trả về false, không thì true */
				.then(() => !$(selectors).ntsError('hasError'));
		}
	};

	Object.defineProperties($validate, {
		valid: {
			value: ko.observable(true)
		},
		constraint: {
			value: function $constraint(name: string, value: any) {
				if (arguments.length === 0) {
					return $.Deferred()
						.resolve(true)
						.then(() => __viewContext.primitiveValueConstraints);
				} else if (arguments.length === 1) {
					return $.Deferred()
						.resolve(true)
						.then(() => _.get(__viewContext.primitiveValueConstraints, name));
				} else {
					return $.Deferred()
						.resolve(true)
						.then(() => (ui.validation as any).writeConstraint(name, value));
				}
			}
		}
	});

	BaseViewModel.prototype.$validate = $validate;

	Object.defineProperty(ko, 'ViewModel', { value: BaseViewModel });
}