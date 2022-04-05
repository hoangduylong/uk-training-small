package nts.uk.ctx.bs.employee.dom.deleteempmanagement;

import java.util.Optional;

public interface DeleteEmpRepository {
	
	/**
	 * 
	 * temporary delete Employee
	 * 
	 * @param domain:
	 *            DeleteEmpManagement
	 */
	void insertToDeleteEmpManagemrnt(DeleteEmpManagement deleteEmpManagement);
	
	Optional<DeleteEmpManagement> getBySid(String employeeId);
	
	void remove(DeleteEmpManagement domain);
	
	void update(DeleteEmpManagement domain);

}
