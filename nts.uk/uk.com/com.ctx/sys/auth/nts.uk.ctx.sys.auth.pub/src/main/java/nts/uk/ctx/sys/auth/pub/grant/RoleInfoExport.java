package nts.uk.ctx.sys.auth.pub.grant;

import lombok.Value;

/**
 * 担当ロールには　true　をつけて返すためのクラス
 * @author hiroki_katou
 *
 */
@Value
public class RoleInfoExport {

    private final String roleId;
    private RoleTypeExport roleType;
    private final boolean isInCharge;
    
    public boolean isInCharge() {
        return this.isInCharge;
    }
    
    public String getRoleId() {
        return this.roleId;
    }

    public static RoleInfoExport asInCharge(String roleId, RoleTypeExport roleType) {
        return new RoleInfoExport(roleId, roleType, true);
    }

    public static RoleInfoExport asGeneral(String roleId, RoleTypeExport roleType) {
        return new RoleInfoExport(roleId, roleType, false);
    }
}
