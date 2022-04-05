/// <reference path="../reference.ts"/>

module nts.uk.ui.guide {

    const ROW_HEIGHT = 20;
    
    module resource {
        export let linkHide = "操作ガイド　非表示";
        export let linkShow = "操作ガイド　表示";
    }
    
    export function operateCurrent(path: string, data: any, page: Page) {
        operate.apply(null, _.concat(nts.uk.request.location.currentAppId, arguments));
    }
    
    export function operate(appId: string, path: string, data: any, tabMapping: any, page: Page) { 
        nts.uk.request.ajax(appId, path, data).done(config => {
            if (_.isFunction(tabMapping) && _.isArray(config)) {
                _.forEach(config, c => {
                    c.tabId = tabMapping(c.programId, c.screenId);
                });
            }
            
            let op = new OperationGuide(config);
            op.setPosition(page);
        });
    }
    
    class OperationGuide {
        
        configs: Array<GuideConfig> = [];
        
        constructor(config: any) {
            if (_.isArray(config)) {
                this.configs = config;
                return;
            }
            
            this.configs.push(config);
        }
        
        link(top: number, tabConfig: GuideConfig) {
            let self = this;
            tabConfig.display = true;
            let $link = $("<a/>").addClass("nts-guide-link").text(resource.linkHide);
            $link.css("margin-top", top);
            $link.on("click", () => {
                let $guideArea;
                if (!_.isNil(tabConfig.tabId)) {
                    let $tabPanel = $link.closest("div[role=tabpanel]");
                    $guideArea = $tabPanel.find(".nts-guide-area");
                } else {
                    $guideArea = $(".nts-guide-area");
                }
                
                if (tabConfig.display) {
                    $link.text(resource.linkShow);
                    $guideArea.hide();
                    tabConfig.display = !tabConfig.display;
                    return;
                }
                
                $link.text(resource.linkHide);
                $guideArea.show();
                tabConfig.display = !tabConfig.display;
            });
            
            return $link;
        }
        
        textArea(tabConfig: GuideConfig, position: Position) {
            let self = this;
            let $area = $("<div/>").addClass("nts-guide-area");
            if (position === Position.BOTTOM) {
                $area.addClass("nts-bottom");
            }
            
            $area.height(ROW_HEIGHT * tabConfig.lineCount);
            let content = tabConfig.content.split('\n').join("<br/>");
            $area.html(content);
            
            return $area;
        }
        
        setPosition(page: Page) {
            let self = this;
            switch (page) {
                case Page.NORMAL:
                default:
                    let $functionsArea = $("#functions-area");
                    if ($functionsArea.length == 0) {
                        $functionsArea = $("#functions-area-bottom");
                        if ($functionsArea.find(".nts-guide-link").length == 0) {
                            let top = ($functionsArea.height() - 24) / 2;
                            $functionsArea.append(self.link(top, self.configs[0]));
                        }
                        
                        if (!$functionsArea.prev().is(".nts-guide-area")) {
                            $functionsArea.before(self.textArea(self.configs[0], Position.BOTTOM));
                        }
                        
                        return;
                    }
                    
                    if ($functionsArea.find(".nts-guide-link").length == 0) {
                        let top = ($functionsArea.height() - 22) / 2;
                        $functionsArea.append(self.link(top, self.configs[0]));
                    }
                    
                    if (!$functionsArea.next().is(".nts-guide-area")) {
                        $functionsArea.after(self.textArea(self.configs[0]));
                    }
                    
                    break;
                case Page.SIDEBAR:
                    _.forEach(self.configs, (tabConfig: GuideConfig) => {
                        let $tab = $(`#${tabConfig.tabId}`);
                        let $contentHeader = $tab.find(".sidebar-content-header");
                        
                        if ($contentHeader.find(".nts-guide-link").length == 0) {
                            let top = ($contentHeader.height() - 18) / 2;
                            $contentHeader.append(self.link(top, tabConfig));
                        }
                        
                        if (!$contentHeader.next().is(".nts-guide-area")) {
                            $contentHeader.after(self.textArea(tabConfig)); 
                        }
                    });
                    
                    break;
                case Page.FREE_LAYOUT:
                    break;
            }
        }
    }
    
    class GuideConfig {
        tabId: string;
        isUsed: boolean;
        display: boolean;
        lineCount: number;
        content: string;    
        
        constructor(tabId: string, isUsed: boolean, display: boolean, lineCount: number, content: string) {
            this.tabId = tabId;
            this.isUsed = isUsed;
            this.display = display;
            this.lineCount = lineCount;
            this.content = content;
        }
    }
    
    enum Page {
        NORMAL = 0,
        SIDEBAR = 1,
        FREE_LAYOUT = 2
    }
    
    enum Position {
        TOP = 0,
        BOTTOM = 1
    }
}
