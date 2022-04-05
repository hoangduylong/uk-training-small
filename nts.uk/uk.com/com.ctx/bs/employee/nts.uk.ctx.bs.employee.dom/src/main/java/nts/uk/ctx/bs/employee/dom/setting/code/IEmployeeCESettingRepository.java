package nts.uk.ctx.bs.employee.dom.setting.code;

import java.util.Optional;

public interface IEmployeeCESettingRepository {

	Optional<EmployeeCESetting> getByComId(String companyId);

	void saveSetting(EmployeeCESetting domain);

	void removeSetting(String companyId);

	void removeSetting(EmployeeCESetting domain);
}
