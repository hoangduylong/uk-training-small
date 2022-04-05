package nts.uk.ctx.sys.auth.dom.adapter.webmenu;

import lombok.Value;

@Value
public class WebMenuExport {
    /** Webメニューコード */
    private String webMenuCode;

    /** Webメニュー名称 */
    private String webMenuName;

    /** 会社ID */
    private String companyId;

    /** 既定メニュー */
    private boolean defaultMenu;


}