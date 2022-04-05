package nts.uk.ctx.bs.employee.dom.position.jobposition;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;

public interface SubJobPosRepository {

	public List<SubJobPosition> getSubJobPosByDeptId(String deptId);

	public Optional<SubJobPosition> getByEmpIdAndStandDate(String employeeId, GeneralDate standandDate);

	public List<SubJobPosition> getByEmpId(String employeeId);

	public Optional<SubJobPosition> getById(String id);
	/**
	 * ドメインモデル「職務職位（兼務）」を新規登録する
	 * 
	 * @param domain
	 */
	void addSubJobPosition(SubJobPosition domain);

	/**
	 * 取得した「職務職位（兼務）」を更新する
	 * 
	 * @param domain
	 */
	void updateSubJobPosition(SubJobPosition domain);
	/**
	 * ドメインモデル「職務職位（兼務）」を削除する
	 * @param domain
	 */
	void deleteSubJobPosition(String subJobPosId);
}
