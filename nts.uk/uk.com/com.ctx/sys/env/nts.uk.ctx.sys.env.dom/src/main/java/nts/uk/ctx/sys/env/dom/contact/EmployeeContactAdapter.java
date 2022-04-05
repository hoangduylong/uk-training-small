package nts.uk.ctx.sys.env.dom.contact;

import java.util.List;

public interface EmployeeContactAdapter {
	/**
	 * RequestList 378
	 * 社員ID（List）から社員連絡先を取得
	 * @return
	 */
	List<EmployeeContactObjectImport> getList(List<String> employeeIds);
	
	
	/**
	 * 社員ID（List）から個人連絡先を取得
	 * RequestList420
	 * @param employeeIds
	 * @return
	 */
	List<PersonContactObjectOfEmployeeImport> getListOfEmployees(List<String> employeeIds);
}
