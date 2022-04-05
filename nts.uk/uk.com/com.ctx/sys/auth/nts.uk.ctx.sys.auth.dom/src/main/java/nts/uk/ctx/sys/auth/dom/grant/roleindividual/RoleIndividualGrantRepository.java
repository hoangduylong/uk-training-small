/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.grant.roleindividual;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.dom.role.RoleType;

/**
 * The Interface RoleIndividualGrantRepository.
 */
public interface RoleIndividualGrantRepository {

	
	/**
	 * Find by user and date.
	 *
	 * @param userId the user id
	 * @param today the today
	 * @return the optional
	 */
	Optional<RoleIndividualGrant> findByUserAndDate(String userId, GeneralDate today);
	
	/**
	 * Find list by user and date.
	 *
	 * @param userId the user id
	 * @param today the today
	 * @return the list
	 */
	List<RoleIndividualGrant> findListByUserAndDate(String userId, GeneralDate today);
	
	/**
	 * Find list by user and date for company admin.
	 *
	 * @param userId the user id
	 * @param today the today
	 * @param roleType the role type
	 * @return the list
	 */
	List<RoleIndividualGrant> findListByUserAndDateForCompanyAdmin(String userId, GeneralDate today,RoleType roleType);
	
	/** Find by user and role */
	List<RoleIndividualGrant> findByUserAndRole(String userId, int roleType);

	Optional<RoleIndividualGrant> findByUserCompanyRoleType(String userID, String companyID, int roleType);
	
	Optional<RoleIndividualGrant> findByUserCompanyRoleTypeDate(String userId, String companyId, int roleType, GeneralDate date);

	Optional<RoleIndividualGrant> findByKey(String userId, String companyId, String roleId);

	/** Find all by role type */
	List<RoleIndividualGrant> findByRoleType(int roleType);

	List<RoleIndividualGrant> findByRoleId(String roleId);
	
	List<RoleIndividualGrant> findByCompanyRole(String companyId, String roleId);

	List<RoleIndividualGrant> findByCompanyIdAndRoleType(String companyID, int roleType);

	/** Add */
	void add(RoleIndividualGrant roleIndividualGrant);

	/** Update */
	void update(RoleIndividualGrant roleIndividualGrant);

	/** Remove */
	void remove(String userId, String companyId, int roleType);
	
	// add repo for CAS004
	/** Remove by user ID*/
	void removeByUserId(String userId);
	
	Optional<RoleIndividualGrant> findByDetail(String userId, String companyId, int roleType, List<String> roleIDLst, GeneralDate date);
	
	List<RoleIndividualGrant> findRoleIndividual( String companyId, int roleType, List<String> roleIDLst, GeneralDate date);
	/**
	 * @author hoatt
	 * ドメインモデル「ロール個人別付与」を取得する
	 * @param ユーザID  userId
	 * @param 会社ID companyId
	 * @param ロール種類 ＜＞ ? roleType
	 * @param 日付 date
	 * @return
	 */
	List<RoleIndividualGrant> getListDifRoleType(String userId, String companyId, int roleType, GeneralDate date);
}
