package nts.uk.ctx.sys.auth.app.find.wplmanagementauthority.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceAuthority;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WorkPlaceAuthorityDto {
	/**
	 * ロールID
	 */
	private String roleId;
	/**
	 * 会社ID
	 */
	private String companyId;
	/**
	 * NO
	 */
	private int functionNo;
	/**
	 * 利用できる
	 */
	private boolean availability;
	
	public static WorkPlaceAuthorityDto fromDomain( WorkPlaceAuthority domain) {
		return new WorkPlaceAuthorityDto(
				domain.getRoleId(),
				domain.getCompanyId(),
				domain.getFunctionNo().v(),
				domain.isAvailability()
				);
		
	}
}
