package nts.uk.ctx.bs.employee.pub.workplace.config;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;

public interface WorkPlaceConfigPub {
	/**
	 * findByBaseDate
	 * 
	 * @param companyId
	 * @param baseDate
	 * @return
	 */
	Optional<WorkPlaceConfigExport> findByBaseDate(String companyId, GeneralDate baseDate);
	
	/**
	 * [No.647期間に対応する職場構成を取得する
	 *
	 * @param companyId
	 * @param datePeriod
	 * @return List<職場構成>
	 */
	List<WorkPlaceConfigExport> findByCompanyIdAndPeriod(String companyId, DatePeriod datePeriod);
}
