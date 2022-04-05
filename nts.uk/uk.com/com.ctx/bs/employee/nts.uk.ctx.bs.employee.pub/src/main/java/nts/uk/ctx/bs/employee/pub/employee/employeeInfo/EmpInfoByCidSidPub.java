package nts.uk.ctx.bs.employee.pub.employee.employeeInfo;

public interface EmpInfoByCidSidPub {

	/**
	 * Find EmployeeInFo by companyId,employeeId For request No.101
	 *
	 */
	EmpInfoByCidSidExport getEmpInfoBySidCid(String pid, String cid);
}
