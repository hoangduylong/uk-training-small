package nts.uk.ctx.bs.employee.pubimp.employee.setting.code;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.employee.dom.setting.code.EmployeeCESetting;
import nts.uk.ctx.bs.employee.dom.setting.code.IEmployeeCESettingRepository;
import nts.uk.ctx.bs.employee.pub.employee.employeeInfo.setting.code.EmployeeCodeEditSettingExport;
import nts.uk.ctx.bs.employee.pub.employee.employeeInfo.setting.code.IEmployeeCESettingPub;

@Stateless
public class EmployeeCESettingPub implements IEmployeeCESettingPub {

	@Inject
	IEmployeeCESettingRepository repo;

	@Override
	public Optional<EmployeeCodeEditSettingExport> getByComId(String companyId) {
		Optional<EmployeeCESetting> domain = repo.getByComId(companyId);

		if (!domain.isPresent()) {
			return Optional.empty();
		}

		EmployeeCESetting _domain = domain.get();

		return Optional.of(new EmployeeCodeEditSettingExport(_domain.getCompanyId(), _domain.getCeMethodAtr().value,
				_domain.getDigitNumb().v()));
	}
}
