package nts.uk.ctx.sys.portal.dom.toppagesetting;

import java.util.List;
import java.util.Optional;

/**
 * The Interface TopPagePersonSettingRepository.
 * Repository 個人別トップページ設定
 */
public interface TopPagePersonSettingRepository {

	/**
	 * Insert.
	 * [1]  insert(個人別トップページ設定)																									
	 *
	 * @param contractCd the contract cd
	 * @param companyId the company id
	 * @param domain the domain
	 */
	void insert(String contractCd, String companyId, TopPagePersonSetting domain);
	
	/**
	 * Update.
	 * [2]  update(個人別トップページ設定)																									
	 *
	 * @param contractCd the contract cd
	 * @param companyId the company id
	 * @param domain the domain
	 */
	void update(String contractCd, String companyId, TopPagePersonSetting domain);
	
	/**
	 * Delete.
	 * [3]  delete(個人別トップページ設定)																									
	 * @param domain the domain
	 */
	void delete(TopPagePersonSetting domain);
	
	/**
	 * Gets the by company id and employee ids.
	 * 社員IDListから個人別トップページ設定を取得する
	 * @param companyId the company id
	 * @param employeeIds the employee ids
	 * @return the by company id and employee ids
	 */
	List<TopPagePersonSetting> getByCompanyIdAndEmployeeIds(String companyId, List<String> employeeIds);
	
	/**
	 * Gets the by company id
	 * @param companyId the company id
	 * @return the by company id and employee ids
	 */
	List<TopPagePersonSetting> getByCompanyId(String companyId);
	
	/**
	 * Gets the by company id and employee id.
	 * 社員IDから個人別トップページ設定を取得する
	 * @param companyId the company id
	 * @param employeeId the employee id
	 * @return the by company id and employee id
	 */
	Optional<TopPagePersonSetting> getByCompanyIdAndEmployeeId(String companyId, String employeeId);
	
	void insertAll(String contractCd, String companyId, List<TopPagePersonSetting> domain);
	
	void updateAll(String contractCd, String companyId, List<TopPagePersonSetting> domain);
	
}
