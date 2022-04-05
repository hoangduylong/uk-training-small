package nts.uk.ctx.sys.auth.app.find.grant.roleindividual.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import nts.arc.enums.EnumConstant;
import nts.uk.ctx.sys.auth.dom.adapter.company.CompanyImport;

@Data
@AllArgsConstructor
public class RoleIndividualGrantMetaDto {
	
	private List<EnumConstant> enumRoleType;
	
	private List<CompanyImport> listCompany;

}
