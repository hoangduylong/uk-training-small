module nts.uk.com.view.cmf004.c.service {
  import ajax = nts.uk.request.ajax;
  import format = nts.uk.text.format;
  var paths = {
    checkPassword: "ctx/sys/assist/datarestoration/checkPassword",
  }

  export function checkPassword(param: any): JQueryPromise<boolean> {
      return ajax('com', paths.checkPassword, param);
  }
}