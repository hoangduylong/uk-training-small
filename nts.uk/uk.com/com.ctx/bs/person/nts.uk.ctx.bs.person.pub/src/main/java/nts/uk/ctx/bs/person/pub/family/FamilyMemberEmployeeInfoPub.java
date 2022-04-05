package nts.uk.ctx.bs.person.pub.family;

import java.util.List;

public interface FamilyMemberEmployeeInfoPub {
	/**
	 * [RQ682]社員IDが一致する家族情報を取得
	 * @param employeeId 社員ID
	 * @return 家族（List）
	 */
	public List<FamilyEmployeeInfoExport> getFamilyMemberEmployeeInfoByPid(String employeeId);
}
