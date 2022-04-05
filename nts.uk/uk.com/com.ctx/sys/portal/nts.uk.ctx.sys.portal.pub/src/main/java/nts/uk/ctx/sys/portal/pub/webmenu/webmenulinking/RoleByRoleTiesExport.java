package nts.uk.ctx.sys.portal.pub.webmenu.webmenulinking;

import lombok.Value;

@Value
public class RoleByRoleTiesExport {
    /**ロールID */
    private String roleId;
    /** メニューコードリスト */
    private String webMenuCd;

    private String companyId;
}
