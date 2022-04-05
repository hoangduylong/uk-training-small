package nts.uk.ctx.sys.auth.pub.grant;

import java.util.Optional;
import lombok.Value;
import nts.arc.time.GeneralDate;

/**
 * @author dxthuong
 * 
 * ユーザIDからロールを取得する
 */
public interface RoleFromUserIdPub {
	
	/**
	 * @param userId
	 * @param roleType
	 * @param baseData
	 * 
	 * @return roleID
	 */
    String getRoleFromUserId(String userId,int roleType,GeneralDate baseDate);
    
    String getRoleFromUserId(String userId,int roleType,GeneralDate baseDate, String comId);

    Optional<RoleInfoExport> getRoleInfoFromUserId(String userId, int roleType, GeneralDate baseDate, String comId);
    
    /**
     * 担当ロールには　true　をつけて返すためのクラス
     * @author hiroki_katou
     *
     */
    @Value
    public static class RoleInfoExport {
        private final boolean isInCharge;
        private final String roleId;
        
        public boolean isInCharge() {
            return this.isInCharge;
        }
        
        public String getRoleId() {
            return this.roleId;
        }

        public static RoleInfoExport asInCharge(String roleId) {
            return new RoleInfoExport(true, roleId);
        }

        public static RoleInfoExport asGeneral(String roleId) {
            return new RoleInfoExport(false, roleId);
        }
    }	
}
