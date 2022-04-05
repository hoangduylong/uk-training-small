package nts.uk.ctx.sys.auth.dom.roleset.webmenu.webmenulinking;

import lombok.Value;

@Value
public class RoleByRoleTiesImport {
    /**ロールID */
    private String roleId;
    /** メニューコードリスト */
    private String webMenuCd;

    private String companyId;
}
