/**
 * author hieult
 */
package nts.uk.ctx.sys.portal.dom.titlemenu;

import java.util.List;
import java.util.Optional;

public interface TitleMenuRepository {
	/**
	 * Find All
	 * 
	 * @param companyID
	 * @return List
	 */
	List<TitleMenu> findAll(String companyID);

	/**
	 * Find by Code
	 * 
	 * @param companyID
	 * @param toppagePartID
	 * @return Optional
	 */

	Optional<TitleMenu> findByCode(String companyID, String titleMenuCD);
	
	/**
	 * Add
	 * @param title
	 */
	void add (TitleMenu  title);
	
	/**
	 * Update
	 * @param title
	 * 
	 */
	void update (TitleMenu  title);
	/**
	 * Copy
	 * @param title
	 *//*
	void copy (TitleMenu  title);*/
	 /**
	 * Remove
	 * @param companyID
	 * @param titleMenuCD
	 */
	void remove (String companyID , String titleMenuCD);

	}
