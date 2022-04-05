/// <reference path="../generic/lodash/lodash.d.ts" />
/// <reference path="../generic/jquery/jquery.d.ts" />
/// <reference path="../generic/jqueryui/jqueryui.d.ts" />
/// <reference path="../generic/momentjs/moment.d.ts" />
/// <reference path="../generic/knockoutjs/knockout.d.ts" />
/// <reference path="./nts.uk.device.d.ts" />
/// <reference path="./nts.uk.com.web.nittsu.bundles.d.ts" />

/** Decorator for load ViewModel of main View*/
declare function bean(): any;
declare function bean(dialogOptions: nts.uk.ui.vm.DialogOption): any;

/** Decorator for auto create binding handler */
declare function handler(params: nts.uk.ui.vm.BindingOption): any;

/** Decorator for load ViewModel of Component */
declare function component(params: nts.uk.ui.vm.ViewModelOption): any;

/** Current language */
declare const systemLanguage: string;

/** Resources data */
declare const names: nts.uk.ui.vm.Resources;

/** Messages data */
declare const messages: nts.uk.ui.vm.Resources;

/** ViewContext (root object of UK App) */
declare const __viewContext: nts.uk.ui.vm.ViewContext;

interface KnockoutStatic {
	readonly ViewModel: {
		new(): nts.uk.ui.vm.ViewModel;
	};
}

declare module nts.uk.ui.vm {
	type WEB_APP = 'at' | 'com' | 'hr' | 'pr';

	export interface DialogOption {
		forGrid: boolean;
		headers: ErrorHandler[];
	}

	interface ErrorHandler {
		name: string;
		text: string;
		width: number | string;
		visible: boolean;
	}

	export interface ViewContext {
		readonly noHeader: boolean;

		readonly rootPath: string;

		readonly env: Environment;

		readonly messages: Resources;
		readonly codeNames: Resources;

		readonly primitiveValueConstraints: PrimitiveConstraints;
		readonly enums: any;

		readonly title: string;
		readonly transferred: nts.uk.util.optional.Optional<any>;

		readonly bind: {
			(viewModel: any): void;
			(viewModel: any, dialogOptions: DialogOption): void;
		};

		readonly ready: (callback: () => void) => void;

		readonly user: UserContext;
		readonly program: ProgramContext;
	}

	interface UserContext {
		readonly contractCode: string;
		readonly companyId: string;
		readonly companyCode: string;
		readonly isEmployee: boolean;
		readonly employeeId: string;
		readonly employeeCode: string;
		readonly selectedLanguage: {
			readonly basicLanguageId: string;
			readonly personNameLanguageId: string;
		};
		readonly role: {
			readonly attendance: string | null;
			readonly companyAdmin: string | null;
			readonly groupCompanyAdmin: string | null;
			readonly officeHelper: string | null;
			readonly payroll: string | null;
			readonly personalInfo: string | null;
			readonly personnel: string | null;
			readonly systemAdmin: string | null;
			readonly isInCharge: {
				readonly attendance: boolean;
				readonly payroll: boolean;
				readonly personalInfo: boolean;
				readonly personnel: boolean;
			};
		};
	}

	interface ProgramContext {
		readonly webapi: WEB_APP;
		readonly programId: string;
		readonly programName: string;
		readonly path: string;
		readonly isDebugMode: boolean;
	}

	// Data structure of names and messages
	export interface Resources {
		readonly [key: string]: string;
	}

	// Data structure of primitiveConstraints
	interface PrimitiveConstraints {
		[key: string]: Constraint;
	}

	// Constraint structure
	interface Constraint {
		min?: number | Date | string;
		max?: number | Date | string;
		maxLength?: number;
		mantissaMaxLength?: number;
		isZeroPadded?: boolean;
		formatOption?: {
			autofill: boolean;
			fillcharacter: string;
			filldirection: 'left' | 'right';
		};
		charType?: 'Any' | 'Kana' | 'AnyHalfWidth' | 'AlphaNumeric' | 'Numeric';
		valueType?: 'String' | 'Decimal' | 'Integer' | 'HalfInt' | 'Date' | 'Time' | 'Clock' | 'Duration' | 'TimePoint';
		[key: string]: any;
	}

	interface Environment {
		readonly isCloud: boolean;
		readonly isOnPremise: boolean;
		readonly japaneseEras: any[];
		readonly pathToManual: string;
		readonly products: {
			readonly attendance: boolean;
			readonly payroll: boolean;
			readonly personnel: boolean;
		};
		readonly systemName: string;
	}

	export interface BindingOption {
		readonly virtual?: boolean;
		readonly bindingName: string;
		readonly validatable?: boolean;
	}

	export interface ViewModelOption {
		readonly name: string;
		readonly template: string;
		readonly alternalBinding?: boolean;
	}

	interface ModalMethods {
		(url: string): JQueryDeferred<any>;
		(url: string, data: any): JQueryDeferred<any>;
		(url: string, data: any, options: JQueryUI.DialogOptions): JQueryDeferred<any>;
		(webapp: WEB_APP, url: string): JQueryDeferred<any>;
		(webapp: WEB_APP, url: string, data: any): JQueryDeferred<any>;
		(webapp: WEB_APP, url: string, data: any, options: JQueryUI.DialogOptions): JQueryDeferred<any>;
	}

	interface DialogMethod {
		(message: string): JQueryDeferred<void>;
		(options: { messageId: string; }): JQueryDeferred<void>;
		(options: { messageId: string; messageParams: string[]; }): JQueryDeferred<void>;
	}

	interface StorageMethod {
		(name: string): JQueryDeferred<any>;
		(name: string, params: any): JQueryDeferred<any>;
	}

	interface JumpMethod {
		(url: string): void;
		(url: string, params: any): void;
		(webapp: WEB_APP, url: string): void;
		(webapp: WEB_APP, url: string, params: any): void;
	}

	export type ViewModel = {
		created(params?: any): void;
		mounted(): void;
		destroyed(): void;
		readonly $el: HTMLElement;
		readonly $user: UserContext;
		readonly $program: ProgramContext;
		readonly $date: {
			readonly now: {
				(): Date;
			};
			readonly today: {
				(): Date;
			};
			readonly interval: {
				(intv: number): void;
			};
		};
		readonly $i18n: {
			(textId: string): string;
			(textId: string, params: string[]): string;
			readonly text: {
				(textId: string): string;
				(textId: string, params: string[]): string;
			};
			readonly message: {
				(messageId: string): string;
				(messageId: string, messageParams: string[]): string;
			};
			readonly controlName: {
				(name: string): string;
			};
		};
		readonly $ajax: {
			(url: string): JQueryDeferred<any>;
			(url: string, data: any): JQueryDeferred<any>;
			(webapp: WEB_APP, url: string, data: any): JQueryDeferred<any>;
		};
		readonly $window: {
			readonly mode: KnockoutObservable<'view' | 'modal'>;
			readonly title: KnockoutObservable<string>;
			readonly header: KnockoutObservable<boolean>;
			readonly size: {
				(height: string | number, width: string | number): void;
				readonly width: (width: number | string) => void;
				readonly height: (height: number | string) => void;
			};
			readonly close: {
				(): void;
				(result: any): void;
			};
			readonly modal: ModalMethods;
			readonly modeless: ModalMethods;
			/** Like:
			 *  nts.uk.ui.windows.setShared
			 *  nts.uk.ui.windows.getShared
			 */
			readonly shared: StorageMethod;
			/**
			 * Storage data to localStorage with encode data
			 */
			readonly storage: StorageMethod;
		}
		readonly $dialog: {
			readonly info: DialogMethod;
			readonly alert: DialogMethod;
			readonly error: DialogMethod;
			readonly confirm: {
				(message: string): JQueryDeferred<void>;
				(options: { messageId: string; }): JQueryDeferred<'no' | 'yes'>;
				(options: { messageId: string; messageParams: string[]; }): JQueryDeferred<'no' | 'yes'>;
				yesNo: {
					(message: string): JQueryDeferred<void>;
					(options: { messageId: string; }): JQueryDeferred<'no' | 'yes'>;
					(options: { messageId: string; messageParams: string[]; }): JQueryDeferred<'no' | 'yes'>;
				};
				yesCancel: {
					(message: string): JQueryDeferred<void>;
					(options: { messageId: string; }): JQueryDeferred<'cancel' | 'yes'>;
					(options: { messageId: string; messageParams: string[]; }): JQueryDeferred<'cancel' | 'yes'>;					
				};
			};
		}
		readonly $blockui: (act: 'show' | 'hide' | 'clear' | 'invisible' | 'grayout' | 'grayoutView' | 'invisibleView' | 'clearView') => JQueryDeferred<void>;
		readonly $validate: {
			(): JQueryDeferred<boolean>;
			(selector: string): JQueryDeferred<boolean>;
			(selectors: string[]): JQueryDeferred<boolean>;
			(...selectors: string[]): JQueryDeferred<boolean>;
			readonly valid: KnockoutReadonlyComputed<boolean>;
			readonly constraint: {
				(): JQueryDeferred<PrimitiveConstraints>;
				(name: string): JQueryDeferred<Constraint>;
				(name: string, value: Constraint): JQueryDeferred<void>;
			};
		};
		readonly $errors: {
			(): JQueryDeferred<boolean>;
			(act: 'clear'): JQueryDeferred<boolean>;
			(act: 'clear', names: string[]): JQueryDeferred<boolean>;
			(act: 'clear', ...names: string[]): JQueryDeferred<boolean>;
			(name: string, messageId: string): JQueryDeferred<boolean>;
			(name: string, message: { messageId: string }): JQueryDeferred<boolean>;
			(name: string, message: { messageId: string; messageParams: string[]; }): JQueryDeferred<boolean>;
			(errors: { [name: string]: { messageId: string; messageParams?: string[]; } }): JQueryDeferred<boolean>;
		}
		readonly $jump: JumpMethod & {
			readonly self: JumpMethod;
			readonly blank: JumpMethod;
		};

		/**
		 * $nextTick be call when DOM is ready or all descendant component, binding are updated.
		 */
		readonly $nextTick: {
			(cb: () => void): number;
		};
		/**
		 * Query Object binding search query in URL.
		 */
		readonly $query: { readonly [key: string]: string };
	}
}
