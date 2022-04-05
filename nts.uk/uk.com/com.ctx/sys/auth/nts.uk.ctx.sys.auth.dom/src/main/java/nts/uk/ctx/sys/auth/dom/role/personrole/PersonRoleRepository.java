package nts.uk.ctx.sys.auth.dom.role.personrole;

import java.util.List;
import java.util.Optional;


public interface PersonRoleRepository {
	/**
	 * Find by id.
	 *
	 * @param roleId the role id
	 * @return optional
	 */
	Optional<PersonRole> find(String roleId);
	
	/** return list person role
	 * @param roleIds
	 * @return
	 */
	List<PersonRole> find(List<String> roleIds);
	
	/**
	 *  insert new PersonRole
	 * @param PersonRole
	 */
	void insert(PersonRole personRole);
	
	/**
	 *  update PersonRole
	 * @param PersonRole
	 */
	void update(PersonRole personRole);
	
	/** remove PersonRole 
	 * @param roleId
	 */
	void remove(String roleId);
	
}
