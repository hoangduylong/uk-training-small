package nts.uk.ctx.sys.gateway.dom.role;

import java.util.Optional;

import lombok.Value;
import nts.arc.time.GeneralDate;

public interface RoleFromUserIdAdapter {

	/**
	 * Gets the role from user.
	 *
	 * @param userId the user id
	 * @param roleType the role type
	 * @param baseDate the base date
	 * @return the role from user
	 */
	String getRoleFromUser(String userId,Integer roleType,GeneralDate baseDate);
	
	String getRoleFromUser(String userId,Integer roleType,GeneralDate baseDate, String comId);
	
	Optional<RoleInfoImport> getRoleInfoFromUser(String userId, int roleType, GeneralDate baseDate, String comId);
	
    /**
     * 担当ロールには　true　をつけて返すためのクラス
     * @author hiroki_katou
     *
     */
    @Value
    public static class RoleInfoImport {
        private final boolean isInCharge;
        private final String roleId;
        
        public boolean isInCharge() {
            return this.isInCharge;
        }
        
        public String getRoleId() {
            return this.roleId;
        }

        public static RoleInfoImport asInCharge(String roleId) {
            return new RoleInfoImport(true, roleId);
        }

        public static RoleInfoImport asGeneral(String roleId) {
            return new RoleInfoImport(false, roleId);
        }
    }	

}

