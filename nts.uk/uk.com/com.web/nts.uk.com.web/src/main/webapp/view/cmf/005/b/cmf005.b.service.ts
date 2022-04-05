module nts.uk.com.view.cmf005.b {
  import ajax = nts.uk.request.ajax;
  import format = nts.uk.text.format;

  export module service {

    var paths = {
      getSystemDate: "ctx/sys/assist/app/getSystemDate",
      screenDisplayProcess: "ctx/sys/assist/autosetting/screenDelDisplayProcessing",
      patternSettingSelect: "ctx/sys/assist/autosetting/delPatternSettingSelect",
      addMalSet: "ctx/sys/assist/app/addMalSet",
      getClosurePeriod: "com/screen/closurePeriod/get",
    }

    export function getSystemDate(): JQueryPromise<any> {
      return ajax('com', paths.getSystemDate);
    };

    export function screenDisplayProcess(): JQueryPromise<any> {
      return ajax('com', paths.screenDisplayProcess);
    }

    export function patternSettingSelect(param: any): JQueryPromise<any> {
      return ajax('com', paths.patternSettingSelect, param);
    }

    export function addMalSet(param: any): JQueryPromise<any> {
      return nts.uk.request.ajax('com', paths.addMalSet, param);
    }

    export function getClosurePeriod(): JQueryPromise<any> {
      return ajax('com', paths.getClosurePeriod);
    }
  }
}
