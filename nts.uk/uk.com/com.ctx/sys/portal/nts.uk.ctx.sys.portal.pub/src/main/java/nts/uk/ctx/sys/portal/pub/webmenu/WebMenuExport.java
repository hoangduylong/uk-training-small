/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.pub.webmenu;

import lombok.Data;

/**
* The Class WebMenuExport.
* @author HieuNV
*/
@Data
public class WebMenuExport {
    /** Webメニューコード */
    private String webMenuCode;

    /** Webメニュー名称 */
    private String webMenuName;

    /** 会社ID */
    private String companyId;

    /** 既定メニュー */
    private boolean defaultMenu;

    public WebMenuExport(String webMenuCode, String webMenuName, String companyId, boolean defaultMenu) {
        this.webMenuCode = webMenuCode;
        this.webMenuName = webMenuName;
        this.companyId   = companyId;
        this.defaultMenu = defaultMenu;
    }
}
