package nts.uk.ctx.sys.shared.dom.employee;

import java.util.Optional;

/**
 * 
 * 社員データ管理情報 <Adapter>
 *
 */
public interface EmployeeDataManageInfoAdapter {

	/**
	 * 社員コードから削除されていない社員を取得
	 * @param companyId
	 * @param employeeCode
	 * @return
	 */
	Optional<EmployeeDataMngInfoImport> findByEmployeeCode(String companyId, String employeeCode);

	Optional<EmployeeDataMngInfoImport> findByEmployeeId(String employeeId);
}
