package nts.uk.ctx.sys.auth.app.find.wkpmanager.dto;

import lombok.Value;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceAuthority;

@Value
public class WorkplaceAuthorityDto {
	/* ロールID */
	private String roleId;
	
	/* 会社ID */
	private String companyId;
	
	/* NO */
	private int functionNo;
	
	private boolean availability;
	
	public static WorkplaceAuthorityDto fromDomain(WorkPlaceAuthority domain){
		return new WorkplaceAuthorityDto(
			domain.getRoleId(),
			domain.getCompanyId(),
			domain.getFunctionNo().v(),
			domain.isAvailability()
		);
	}
}
