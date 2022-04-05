package nts.uk.ctx.sys.portal.dom.generalsearch;

import java.util.List;

/**
 * The Interface GeneralSearchRepository.
 * 汎用検索の履歴 Repository
 */
public interface GeneralSearchRepository {

	/**
	 * Insert.
	 *
	 * @param domain the domain
	 * @param companyId the company id
	 * @param contractCd the contract cd
	 */
	public void insert(GeneralSearchHistory domain, String companyId, String contractCd);
	
	/**
	 * Update.
	 *
	 * @param domain the domain
	 * @param companyId the company id
	 * @param contractCd the contract cd
	 */
	public void update(GeneralSearchHistory domain, String companyId, String contractCd);
	
	/**
	 * Delete.
	 *
	 * @param domain the domain
	 * @param companyId the company id
	 * @param userId the user id
	 */
	public void delete(GeneralSearchHistory domain, String companyId, String userId);
	
	/**
	 * Gets the.
	 *
	 * @param userID the user ID
	 * @param companyID the company ID
	 * @param searchCategory the search category
	 * @return the list
	 */
	public List<GeneralSearchHistory> get(String userID, String companyID, int searchCategory);
	
	/**
	 * Gets the last 10 used searches.
	 *
	 * @param userID the user ID
	 * @param companyID the company ID
	 * @param searchCategory the search category
	 * @return the last 10 used searches
	 */
	public List<GeneralSearchHistory> getLast10UsedSearches(String userID, String companyID, int searchCategory);
	
	/**
	 * Gets the by contents.
	 *
	 * @param userID the user ID
	 * @param companyID the company ID
	 * @param searchCategory the search category
	 * @param searchContent the search content
	 * @return the by contents
	 */
	public List<GeneralSearchHistory> getByContents(String userID, String companyID, int searchCategory, String searchContent);
	
	
}
