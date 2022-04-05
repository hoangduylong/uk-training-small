package nts.uk.ctx.sys.portal.dom.adapter.role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleSetGrantedJobTitleDetailDto {

	private String roleSetCd;

	private String jobTitleId;

	private String companyId;
}
