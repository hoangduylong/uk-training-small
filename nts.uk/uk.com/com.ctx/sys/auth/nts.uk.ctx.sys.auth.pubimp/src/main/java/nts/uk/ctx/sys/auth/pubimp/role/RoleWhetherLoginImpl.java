package nts.uk.ctx.sys.auth.pubimp.role;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.auth.app.find.person.role.GetWhetherLoginerCharge;
import nts.uk.ctx.sys.auth.app.find.person.role.RoleWhetherLoginDto;
import nts.uk.ctx.sys.auth.pub.role.RoleWhetherLoginPubExport;

@Stateless
public class RoleWhetherLoginImpl {

	@Inject
	private GetWhetherLoginerCharge get;
	
	public RoleWhetherLoginPubExport get(){
		RoleWhetherLoginDto data = get.getWhetherLoginerCharge();
		RoleWhetherLoginPubExport exportData = new RoleWhetherLoginPubExport();
		exportData.setEmployeeCharge(data.isEmployeeCharge());
		exportData.setSalaryProfessional(data.isSalaryProfessional());
		exportData.setHumanResOfficer(data.isHumanResOfficer());
		exportData.setOfficeHelperPersonne(data.isOfficeHelperPersonne());
		exportData.setPersonalInformation(data.isPersonalInformation());
		return exportData;
	}
}
