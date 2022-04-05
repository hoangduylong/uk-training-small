package nts.uk.ctx.bs.employee.pub.company;

import java.util.Optional;

import nts.arc.time.GeneralDate;

public interface SyaCompanyHistPub {
	
	/**
	 * 社員の会社所属履歴を取得する
	 * @param employeeId
	 * @param baseDate
	 * @return
	 */
	Optional<SyaCompanyHistExport> find(String employeeId, GeneralDate baseDate);
}
