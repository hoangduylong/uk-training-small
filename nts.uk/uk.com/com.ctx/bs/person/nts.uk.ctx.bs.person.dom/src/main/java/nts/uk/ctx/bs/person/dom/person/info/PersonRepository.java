/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.person.dom.person.info;

import java.util.List;
import java.util.Optional;

/**
 * The Interface PersonRepository.
 */
public interface PersonRepository {
	
	/**
	 * Gets the person by person id.
	 *
	 * @param personIds the person ids
	 * @return the person by person id
	 */
	List<Person> getPersonByPersonIds(List<String> personIds);
	
	
	/**
	 * Gets the by person id.
	 *
	 * @param personId the person id
	 * @return the by person id
	 */
	Optional<Person> getByPersonId(String personId);
	
	String getLastCardNo(String companyId, String startCardNoLetters);
	/**
	 * Update person 取得した「個人」を更新する
	 * 
	 * @param person
	 */
	void update(Person person);


	void addNewPerson(Person newPerson);
	
	void delete(String personId);
	
	/**
	 * @author lanlt
	 * get full domain cps003
	 * getFullPersonByPersonIds
	 * @param personIds
	 * @return
	 */
	List<Person> getFullPersonByPersonIds(List<String> personIds);
	
	/**
	 * @author lanlt
	 * get full domain - for cps013
	 * getFullPersonByPersonIds
	 * @param personIds
	 * @return
	 */
	List<Object[]> getPersonsByPersonIds(List<String> personIds);
	
	
	/**
	 * @author lanlt
	 * Update all person 取得した「個人」を更新する
	 * @param person
	 */
	void updateAll(List<Person> domains);
	
	/**
	 *  個人を取得する
	 * @author lanlt
	 * @param personIds
	 * @return
	 */
	List<Person> getAllPersonByPids(List<String> pids);
	
}
