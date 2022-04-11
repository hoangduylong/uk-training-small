module nts.uk.com.view.cmm013.b {
	import ajax = nts.uk.request.ajax;
    // import format = nts.uk.text.format;

	export module service {

		/**
	 	 * Service path
	 	 */
		let servicePath: any = {
			abrogateJobTItle: "",

		}

		export function abrogateJobTItle(jobTitleCode: string, endDate: string): JQueryPromise<any> {
			return ajax(servicePath.abrogateJobTItle, {jobTitleCode, endDate});
		}

	}
}