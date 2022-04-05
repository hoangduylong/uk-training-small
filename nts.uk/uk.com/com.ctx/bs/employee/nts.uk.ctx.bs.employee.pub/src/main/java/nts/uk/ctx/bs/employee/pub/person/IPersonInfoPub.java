package nts.uk.ctx.bs.employee.pub.person;

import java.util.List;

public interface IPersonInfoPub {

	/**
	 * for request list No.1
	 * @param sID
	 * @return
	 */
	PersonInfoExport getPersonInfo(String sID);
	
	List<PersonInfoExport> listPersonInfor(List<String> listSID);
}
