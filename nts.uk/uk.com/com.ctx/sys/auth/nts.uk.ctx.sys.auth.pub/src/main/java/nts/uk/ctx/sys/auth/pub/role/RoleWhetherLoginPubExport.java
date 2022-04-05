package nts.uk.ctx.sys.auth.pub.role;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class RoleWhetherLoginPubExport {
	
	/**就業担当者か*/
	boolean isEmployeeCharge = false;
	/**給与担当者か*/
	boolean isSalaryProfessional = false;
	/**人事担当者か*/
	boolean isHumanResOfficer = false;
	/**オフィスヘルパー担当者か*/
	boolean isOfficeHelperPersonne = false;
	/**個人情報担当者か*/
	boolean isPersonalInformation = false;
	
	public RoleWhetherLoginPubExport(boolean isEmployeeCharge, boolean isSalaryProfessional, boolean isHumanResOfficer,
			boolean isOfficeHelperPersonne, boolean isPersonalInformation) {
		super();
		this.isEmployeeCharge = isEmployeeCharge;
		this.isSalaryProfessional = isSalaryProfessional;
		this.isHumanResOfficer = isHumanResOfficer;
		this.isOfficeHelperPersonne = isOfficeHelperPersonne;
		this.isPersonalInformation = isPersonalInformation;
	}
	
	

}
