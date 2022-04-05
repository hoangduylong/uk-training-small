module nts.uk.com.view.ccg.model {
    import ntsNumber = nts.uk.ntsNumber;
    import ntsFile = nts.uk.request.file; 
    import resource = nts.uk.resource;

    const ENUM_STANDART_WIDGET: number = 0;
    const ENUM_OPTIONAL_WIDGET: number = 1;
    const ENUM_DASBOARD: number = 2;
    const ENUM_FLOWMENU: number = 3;
    const ENUM_EXTERNALURL: number = 4

    
    /** Server topPagePartDto */
    export interface TopPagePartDto {
        companyID: string;
        topPagePartID: string;
        code: string;
        name: string;
        codeName: string;
        "type": number;
        width: number;
        height: number;
    }
    
    /** Transfer data from topPage to LayoutSetting */
    export interface TransferLayoutInfo {
        parentCode: string;
        layoutID: string;
        pgType: number;
    }
    
    /** Server LayoutDto */
    export interface LayoutDto {
        companyID: string;
        layoutID: string;
        pgType: number;
        placements: Array<PlacementDto>;
    }

    /** Server PlacementDto */
    export interface PlacementDto {
        companyID?: string,
        layoutID?: string;
        placementID: string;
        column: number;
        row: number;
        placementPartDto: PlacementPartDto;
    }

    /** Server PlacementPartDto */
    export interface PlacementPartDto {
        companyID?: string;
        topPagePartID?: string;
        topPageCode?: string;
        topPageName?: string;
        "type": number;
        width: number;
        height: number;
        /* External Url */
        url?: string;
        /* FlowMenu */
        fileID?: string;
        fileName?: string;
        defClassAtr?: number;
    }
    
    /** Client Placement class */
    export class Placement {
        // Required
        placementID: string;
        row: number;
        column: number;
        width: number;
        height: number;
        name: string;
        "type": number;
        // External Url info
        url: string = "";
        // TopPagePart info
        topPagePartID: string;
        topPagePart: TopPagePart;
        // External Url for standard Widget
        origin: string = window.location.origin;
        constructor(placementDto: PlacementDto) {
            // Placement
            this.placementID = placementDto.placementID;
            this.row = ntsNumber.getDecimal(placementDto.row, 0);
            this.column = ntsNumber.getDecimal(placementDto.column, 0);
            // Placement Part
            var placementPartDto = placementDto.placementPartDto;
            this.width = ntsNumber.getDecimal(placementPartDto.width, 0);
            this.height = ntsNumber.getDecimal(placementPartDto.height, 0);
            this.type = placementPartDto.type;
            this.topPagePartID = placementPartDto.topPagePartID;
            if (this.type == ENUM_FLOWMENU) {
                this.topPagePart = new FlowMenu(placementPartDto);
                this.name = placementPartDto.topPageName;
            } else if (this.type == ENUM_EXTERNALURL) {
                this.name = "外部URL";
                this.url = placementPartDto.url;
            }else if(this.type == ENUM_STANDART_WIDGET) {
                this.topPagePart = new StandardWidget(placementPartDto);
                this.name = placementPartDto.topPageName;
                if(placementPartDto.topPageCode === "0001"){
                    this.url = this.origin + "/nts.uk.at.web/view/ktg/001/a/index.xhtml"; 
                }else if(placementPartDto.topPageCode === "0002"){
                    this.url = this.origin + "/nts.uk.at.web/view/ktg/002/a/index.xhtml"; 
                }else if(placementPartDto.topPageCode === "0003"){
                    this.url = this.origin + "/nts.uk.at.web/view/ktg/027/a/index.xhtml"; 
                }else if(placementPartDto.topPageCode === "0004"){
                    this.url = this.origin + "/nts.uk.at.web/view/ktg/030/a/index.xhtml"; 
                }else if(placementPartDto.topPageCode === "0005"){
                    this.url = this.origin + ""; 
                }else if(placementPartDto.topPageCode === "0006"){
                    this.url = this.origin + "/nts.uk.com.web/view/ktg/031/a/index.xhtml"; 
                }else if(placementPartDto.topPageCode === "9999"){
                    this.url = this.origin + "/nts.uk.hr.web/view/jcg/004/a/index.xhtml"; 
                }
                
            }else if(this.type == ENUM_OPTIONAL_WIDGET) {
                this.topPagePart = new OptionalWidget(placementPartDto);
                this.name = placementPartDto.topPageName;
                this.url = this.origin + "/nts.uk.at.web/view/ktg/029/a/index.xhtml?code="+this.topPagePart.topPageCode();
            }
        }
        
        buildPlacementDto(): PlacementDto {
            var placementPartDto: PlacementPartDto = {
                "type": this.type,
                width: this.width,
                height: this.height,
                url: this.url
            }
            if (this.isFlowMenu()) {
                var flowmenu: FlowMenu = <FlowMenu> this.topPagePart;
                placementPartDto.topPagePartID = flowmenu.topPagePartID(),
                placementPartDto.topPageCode = flowmenu.topPageCode(),
                placementPartDto.topPageName = flowmenu.topPageName(),
                placementPartDto.fileID = flowmenu.fileID(),
                placementPartDto.fileName = flowmenu.fileName(),
                placementPartDto.defClassAtr = flowmenu.defClassAtr()
            } else if (this.isStandardWidget()) {
                placementPartDto.topPagePartID = this.topPagePartID,
                placementPartDto.topPageCode = this.topPagePart.topPageCode(),
                placementPartDto.topPageName = this.topPagePart.topPageName()
            } else if (this.isOptionalWidget()) {
                placementPartDto.topPagePartID = this.topPagePartID,
                placementPartDto.topPageCode = this.topPagePart.topPageCode(),
                placementPartDto.topPageName = this.topPagePart.topPageName()
            } else if (this.isDashBoard()) {
                
            } 
            
            return {
                placementID: this.placementID,
                column: this.column,
                row: this.row,
                placementPartDto: placementPartDto
            }
        }
        
        isExternalUrl(): boolean {
            return this.type == ENUM_EXTERNALURL;
        }
        
        isFlowMenu(): boolean {
            return this.type == ENUM_FLOWMENU;
        }
        
        isStandardWidget(): boolean {
            return this.type == ENUM_STANDART_WIDGET;
        }
        
        isOptionalWidget(): boolean {
            return this.type == ENUM_OPTIONAL_WIDGET;
        }
        
        isDashBoard(): boolean {
            return this.type == ENUM_DASBOARD;
        }
        
    }
    
    abstract class TopPagePart {
        topPagePartID: KnockoutObservable<string>;
        topPageCode: KnockoutObservable<string>;
        topPageName: KnockoutObservable<string>;
        width: KnockoutObservable<number>;
        height: KnockoutObservable<number>;
        "type": number;
    }
        
    export class FlowMenu extends TopPagePart {
        fileID: KnockoutObservable<string>;
        fileName: KnockoutObservable<string>;
        defClassAtr: KnockoutObservable<number>;
        constructor(dto?: PlacementPartDto) {
            super();
            this.topPagePartID = ko.observable((dto && dto.topPagePartID) ? dto.topPagePartID : "");
            this.fileID = ko.observable((dto && dto.fileID) ? dto.fileID : "");
            this.fileName = ko.observable((dto && dto.fileName) ? dto.fileName : resource.getText("CCG030_25"));
            this.defClassAtr = ko.observable((dto && dto.defClassAtr) ? dto.defClassAtr : 0);
            this.topPageCode = ko.observable((dto && dto.topPageCode) ? dto.topPageCode : "");
            this.topPageName = ko.observable((dto && dto.topPageName) ? dto.topPageName : "");
            this.width = ko.observable((dto && dto.width) ? dto.width : 4);
            this.height = ko.observable((dto && dto.height) ? dto.height : 4);
            this.type = ENUM_FLOWMENU;
        }
        
        getPreviewURL(): string {
            return ntsFile.liveViewUrl(this.fileID(), "index.htm");
        }
        
    }
    export class StandardWidget extends TopPagePart {
        constructor(dto?: PlacementPartDto) {
            super();
            this.topPagePartID = ko.observable((dto && dto.topPagePartID) ? dto.topPagePartID : "");
            this.topPageCode = ko.observable((dto && dto.topPageCode) ? dto.topPageCode : "");
            this.topPageName = ko.observable((dto && dto.topPageName) ? dto.topPageName : "");
            this.width = ko.observable((dto && dto.width) ? dto.width : 4);
            this.height = ko.observable((dto && dto.height) ? dto.height : 4);
            this.type = ENUM_STANDART_WIDGET;
        }
    }
    export class OptionalWidget extends TopPagePart {
        constructor(dto?: PlacementPartDto) {
            super();
            this.topPagePartID = ko.observable((dto && dto.topPagePartID) ? dto.topPagePartID : "");
            this.topPageCode = ko.observable((dto && dto.topPageCode) ? dto.topPageCode : "");
            this.topPageName = ko.observable((dto && dto.topPageName) ? dto.topPageName : "");
            this.width = ko.observable((dto && dto.width) ? dto.width : 4);
            this.height = ko.observable((dto && dto.height) ? dto.height : 4);
            this.type = ENUM_OPTIONAL_WIDGET;
        }
    }

    export class HorizontalAlign {
      static LEFT = 0;
      static MIDDLE = 1;
      static RIGHT = 2;
    }

    export class VerticalAlign {
      static TOP = 0;
      static CENTER = 1;
      static BOTTOM = 2;
    }
    
}