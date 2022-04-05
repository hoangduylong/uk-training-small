/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.roleset.webmenu;
/**
 *  Class WebMenuImport
 */
import lombok.Value;
@Value
public class WebMenuImport {

    /** Webメニューコード */
    private String webMenuCode;

    /** Webメニュー名称 */
    private String webMenuName;

    /** 会社ID */
    private String companyId;

    /** 既定メニュー */
    private boolean defaultMenu;

    public WebMenuImport(String companyId, String webMenuCode, String webMenuName, boolean defaultMenu) {
        this.webMenuCode = webMenuCode;
        this.webMenuName = webMenuName;
        this.companyId  = companyId;
        this.defaultMenu = defaultMenu;
    }
}
