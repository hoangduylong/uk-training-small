package nts.uk.ctx.sys.auth.dom.role;

import java.util.List;

public interface RoleService {
	List<Role> getAllByType(RoleType roleType);
	void insertRole(Role role);
	void updateRole(Role role);
	void removeRole (String roleId);
	
	/**
	 * Add by ThanhPV
	 * @param roleId
	 * @return throw BusinessException if role is being used
	 */
	void checksUseRole(String roleId);
}
