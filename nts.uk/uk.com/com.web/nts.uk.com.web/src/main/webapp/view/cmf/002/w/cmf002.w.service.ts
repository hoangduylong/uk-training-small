module nts.uk.com.view.cmf002.w.service {
  const paths = {
    findAllClosureHistory: "ctx/at/shared/workrule/closure/history/findAll",
    findOutputPeriodSetting: "exio/exo/condset/findOutputPeriodSetting",
    saveOutputPeriodSetting: "exio/exo/condset/saveOutputPeriodSetting",
  }

  export function findAllClosureHistory(): JQueryPromise<ClosureHistoryFindDto[]> {
    return nts.uk.request.ajax("at", paths.findAllClosureHistory);
  }

  export function findOutputPeriodSetting(conditionSetCode: string): JQueryPromise<OutputPeriodSetDto> {
    return nts.uk.request.ajax("com", `${paths.findOutputPeriodSetting}/${conditionSetCode}`);
  }

  export function saveOutputPeriodSetting(command: SaveOutputPeriodSetCommand): JQueryPromise<any> {
    return nts.uk.request.ajax("com", paths.saveOutputPeriodSetting, command);
  }

}