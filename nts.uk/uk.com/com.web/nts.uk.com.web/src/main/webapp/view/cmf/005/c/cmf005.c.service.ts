module nts.uk.com.view.cmf005.c {
  import ajax = nts.uk.request.ajax;
  import format = nts.uk.text.format;

  export module service {
    const paths = {
      initDisplay: "ctx/sys/assist/autosetting/deletionPattern/initialDisplay",
      selectPattern: "ctx/sys/assist/autosetting/deletionPattern/select",
      addPattern: "ctx/sys/assist/autosetting/deletionPattern/add",
      deletePattern: "ctx/sys/assist/autosetting/deletionPattern/delete",
    }

    export function initDisplay(): JQueryPromise<any> {
      return ajax('com', paths.initDisplay);
    }

    export function selectPattern(param: any): JQueryPromise<any> {
      return ajax('com', paths.selectPattern, param);
    }

    export function addPattern(param: any): JQueryPromise<any> {
      return ajax('com', paths.addPattern, param);
    }

    export function deletePattern(param: any): JQueryPromise<any> {
      return ajax('com', paths.deletePattern, param);
    }
  }
}