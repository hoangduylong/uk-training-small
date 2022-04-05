package nts.uk.ctx.bs.employee.app.find.employee.mngdata;

import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfo;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.find.dto.PeregDomainDto;

@Setter
@NoArgsConstructor
public class EmployeeDataMngInfoDto extends PeregDomainDto {
	/** 社員コード */

	@PeregItem("IS00001")
	private String employeeCode;

	/** 外部コード */
	@PeregItem("IS00002")
	private String externalCode;
	
	public EmployeeDataMngInfoDto(String recordId, String employeeCode,String externalCode ) {
		super(recordId);
		this.employeeCode = employeeCode;
		this.externalCode = externalCode;
	}

	public static EmployeeDataMngInfoDto fromDomain(EmployeeDataMngInfo domain) {
		return new EmployeeDataMngInfoDto(domain.getEmployeeId(), domain.getEmployeeCode().v(),
				domain.getExternalCode() == null? null: domain.getExternalCode().v());
	}
}
