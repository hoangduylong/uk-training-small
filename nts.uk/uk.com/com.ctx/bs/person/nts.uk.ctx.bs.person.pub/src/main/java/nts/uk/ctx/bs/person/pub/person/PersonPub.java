/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.person.pub.person;

import java.util.List;

/**
 * The Interface PersonPub.
 */
public interface PersonPub {

	/**
	 * Find by person ids.
	 *
	 * @param personIds
	 *            the person ids
	 * @return the list
	 */
	List<PubPersonDto> findByPersonIds(List<String> personIds);

	/**
	 * RequestList #86
	 * 
	 * @param personIds
	 * @return
	 */
	List<PersonInfoExport> findByListId(List<String> personIds);
	
	/**
	 * [RQ621]個人ID(List)から個人基本情報を取得する
	 * @param personIds
	 * @return
	 */
	List<PersonExport> findByPids(List<String> personIds);

}
