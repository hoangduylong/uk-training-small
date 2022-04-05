package nts.uk.ctx.bs.person.pubimp.family;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.dom.adapter.employee.EmployeeBasicInfoAdapter;
import nts.uk.ctx.bs.dom.adapter.employee.EmployeeBasicInfoImport;
import nts.uk.ctx.bs.person.dom.person.family.FamilyMember;
import nts.uk.ctx.bs.person.dom.person.family.FamilyMemberRepository;
import nts.uk.ctx.bs.person.pub.family.FamilyEmployeeInfoExport;
import nts.uk.ctx.bs.person.pub.family.FamilyMemberEmployeeInfoPub;

/**
 * [RQ682]社員IDが一致する家族情報を取得
 */
@Stateless
public class FamilyEmployeeInfoPubImpl implements FamilyMemberEmployeeInfoPub{


	@Inject
	private FamilyMemberRepository familyMemberEmployeeInfo;

	@Inject
	private EmployeeBasicInfoAdapter employeeAdapter;

	@Override
	public List<FamilyEmployeeInfoExport> getFamilyMemberEmployeeInfoByPid(String employeeId) {

		// 社員IDから個人社員基本情報を取得
		EmployeeBasicInfoImport personalBasicInfo = employeeAdapter.get(employeeId);


		// 個人IDが一致する家族を全て取得する
		// ===家族．個人ID = 個人社員基本情報.「個人ID」
		List<FamilyMember> familyMember = familyMemberEmployeeInfo.getListByPid(personalBasicInfo.getPId());

		// 「家族（List）」を返す
		return familyMember.stream().map(c -> {
			return new FamilyEmployeeInfoExport(c.getPersonId(), c.getBirthday(), c.getDeadDay());
		}).collect(Collectors.toList());
	}
}
