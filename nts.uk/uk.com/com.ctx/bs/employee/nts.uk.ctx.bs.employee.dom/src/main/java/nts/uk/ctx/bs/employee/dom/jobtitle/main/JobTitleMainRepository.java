package nts.uk.ctx.bs.employee.dom.jobtitle.main;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;

public interface JobTitleMainRepository {

	public Optional<JobTitleMain> getJobTitleMainById(String jobTitleMainId);

	// chua implement
	public Optional<JobTitleMain> getByEmpIdAndStandDate(String employeeId, GeneralDate standandDate);
	
	// get listbypid
	List<JobTitleMain> getListBiSid(String sid);
	
	/**
	 * ドメインモデル「職務職位」を新規登録する
	 * @param domain
	 */
	void addJobTitleMain(JobTitleMain domain);
	
	/**
	 * 取得した「職務職位」を更新する
	 * @param domain
	 */
	void updateJobTitleMain(JobTitleMain domain);
	
	/**
	 * ドメインモデル「職務職位」を削除する
	 * @param jobTitleMainId
	 */
	void deleteJobTitleMain(String jobTitleMainId);
	
}
