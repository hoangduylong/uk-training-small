/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.pubimp.service;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.dom.role.Role;
import nts.uk.ctx.sys.auth.dom.role.RoleRepository;
import nts.uk.ctx.sys.auth.pub.grant.RoleFromUserIdPub;
import nts.uk.ctx.sys.auth.pub.service.EmployeeReferenceRangePub;
import nts.uk.ctx.sys.auth.pub.service.RolePubService;

/**
 * The Class RoleServiceImpl.
 */
@Stateless
public class RoleServiceImpl implements RolePubService {

	@Inject
	private RoleFromUserIdPub roleFromUserIdPub;
	
	@Inject
	private RoleRepository roleRepository;
	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.auth.pub.service.RolePubService#getEmployeeReferenceRange(java.lang.String, java.lang.Integer, nts.arc.time.GeneralDate)
	 */
	@Override
	public EmployeeReferenceRangePub getEmployeeReferenceRange(String userId, Integer roleType, GeneralDate baseDate) {
		// アルゴリズム「ユーザIDからロールを取得する」を実行する
		String roleId = roleFromUserIdPub.getRoleFromUserId(userId, roleType, baseDate);
		//ドメインモデル「ロール」を取得する
		Role role = roleRepository.findByRoleId(roleId).get();
		//取得したドメインモデル「ロール．社員参照範囲」を呼び出し元に返す
		return EmployeeReferenceRangePub.valueOf(role.getEmployeeReferenceRange().value);
	}

}
