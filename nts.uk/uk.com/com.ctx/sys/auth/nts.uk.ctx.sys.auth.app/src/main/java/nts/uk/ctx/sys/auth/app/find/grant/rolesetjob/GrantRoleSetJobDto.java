package nts.uk.ctx.sys.auth.app.find.grant.rolesetjob;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * 
 * @author HungTT
 *
 */

@AllArgsConstructor
@Data
public class GrantRoleSetJobDto {

	private List<RoleSetDto> listRoleSetDto;
	
	private RoleSetGrantedJobTitleDto roleSetGrantedJobTitleDto;
	
	private List<JobTitleDto> listJobTitleDto;
}
