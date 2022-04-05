package nts.uk.ctx.sys.portal.ac.find.person;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.employee.pub.employee.employeeInfo.EmployeeInfoDtoExport;
import nts.uk.ctx.bs.employee.pub.employee.employeeInfo.EmployeeInfoPub;
import nts.uk.ctx.bs.employee.pub.person.IPersonInfoPub;
import nts.uk.ctx.bs.employee.pub.person.PersonInfoExport;
import nts.uk.ctx.sys.portal.dom.adapter.person.PersonInfoAdapter;

@Stateless
public class PersonInfoPortalAdapterImpl implements PersonInfoAdapter {

	@Inject
	private IPersonInfoPub personInfoPub;
	
	@Inject
	private EmployeeInfoPub empInfoPub;
	
	@Override
	public String getBusinessName(String sId) {
		PersonInfoExport info = personInfoPub.getPersonInfo(sId);
		return info != null ? info.getBusinessName() : "";
	}

	@Override
	public Optional<String> getEmpName(String companyId, String employeeCode) {
		Optional<EmployeeInfoDtoExport> exportData = empInfoPub.getEmployeeInfo(companyId, employeeCode);
		if (!exportData.isPresent()){
			return Optional.empty();
		}
		return Optional.of(exportData.get().getPerName());
	}

}
