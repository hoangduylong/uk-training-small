package nts.uk.ctx.bs.employee.app.find.employee.setting.code;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.employee.dom.setting.code.IEmployeeCESettingRepository;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class EmployeeCodeSettingFinder {

	@Inject
	private IEmployeeCESettingRepository settingRepository;
	
	public Optional<EmployeeCodeSettingDto> find() {
		return settingRepository.getByComId(AppContexts.user().companyId())
			.map(s -> new EmployeeCodeSettingDto(s.getCompanyId(), s.getCeMethodAtr().value, s.getDigitNumb().v()));
	}
}
