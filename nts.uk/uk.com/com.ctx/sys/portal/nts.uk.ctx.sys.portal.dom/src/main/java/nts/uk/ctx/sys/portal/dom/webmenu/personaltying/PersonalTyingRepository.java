package nts.uk.ctx.sys.portal.dom.webmenu.personaltying;

import java.util.List;



public interface PersonalTyingRepository {

	
	/**
	 * add person
	 * @param personalTying
	 */
	void add(PersonalTying personalTying);
	/**
	 * delete person
	 * @param companyId
	 */
	void delete(String companyId, String employeeId);
	
	/**
	 * find all person
	 * @param companyId
	 * @param webMenuCode
	 * @param employeeId
	 * @return
	 */
	List<PersonalTying> findAll(String companyId, String employeeId);
} 
