package nts.uk.ctx.bs.employee.ws.test;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class ParamTest2 {
	
	String cid;
	Boolean getEmploymentNameParam; 
	Boolean getEmpExternalCodeParam;
	Boolean getMemoParam; 
	Boolean getempCommonMasterIDParam;
	Boolean getempCommonMasterItemIDParam;
	
}
