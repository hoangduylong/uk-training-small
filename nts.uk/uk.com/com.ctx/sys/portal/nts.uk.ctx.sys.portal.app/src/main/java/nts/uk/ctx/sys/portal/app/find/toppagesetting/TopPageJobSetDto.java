package nts.uk.ctx.sys.portal.app.find.toppagesetting;

import lombok.Value;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPageJobSet;

/**
 * 
 * @author sonnh1
 *
 */

@Value
public class TopPageJobSetDto {
	String topMenuCode;
	String loginMenuCode;
	String jobId;
	int personPermissionSet;
	int loginSystem;
	int menuClassification;

	public static TopPageJobSetDto fromDomain(TopPageJobSet domain) {
		return new TopPageJobSetDto(domain.getTopMenuCode().v(), domain.getLoginMenuCode().v(), domain.getJobId(),
				domain.getPersonPermissionSet().value, domain.getLoginSystem().value,
				domain.getMenuClassification().value);
	}
}
