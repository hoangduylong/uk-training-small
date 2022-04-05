package nts.uk.ctx.sys.auth.app.find.person.role;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class RoleWhetherLoginDto {
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
	
	public RoleWhetherLoginDto(boolean isEmployeeCharge, boolean isSalaryProfessional, boolean isHumanResOfficer,
			boolean isOfficeHelperPersonne, boolean isPersonalInformation) {
		super();
		this.isEmployeeCharge = isEmployeeCharge;
		this.isSalaryProfessional = isSalaryProfessional;
		this.isHumanResOfficer = isHumanResOfficer;
		this.isOfficeHelperPersonne = isOfficeHelperPersonne;
		this.isPersonalInformation = isPersonalInformation;
	}
	public boolean checkRole(){
		return this.isEmployeeCharge 
				|| this.isSalaryProfessional
				|| this.isHumanResOfficer
				|| this.isOfficeHelperPersonne
				|| this.isPersonalInformation;
	}
	
}
