package nts.uk.ctx.sys.auth.dom.algorithm;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.dom.grant.service.RoleIndividualService;
import nts.uk.ctx.sys.auth.dom.role.Role;
import nts.uk.ctx.sys.auth.dom.role.RoleRepository;

@Stateless
public class EmpReferenceRangeServiceImpl implements EmpReferenceRangeService {

	@Inject
	private RoleIndividualService roleIndividualService;

	@Inject
	private RoleRepository roleRepository;

	@Override
	public Optional<Role> getByUserIDAndReferenceDate(String UserID, int roleType, GeneralDate referenceDate) {
		// アルゴリズム「ユーザIDからロールを取得する」を実行する
		String roleID = roleIndividualService.getRoleFromUserId(UserID,roleType , referenceDate);
		// ドメインモデル「ロール」を取得する (Lấy Domain Model 「ロール」)
		Optional<Role> role = roleRepository.findByRoleId(roleID);
		return role;
	}

	// 社員参照範囲を取得する

}
