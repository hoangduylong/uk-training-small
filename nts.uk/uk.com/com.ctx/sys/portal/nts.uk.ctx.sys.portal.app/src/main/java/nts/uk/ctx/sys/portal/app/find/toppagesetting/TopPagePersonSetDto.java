package nts.uk.ctx.sys.portal.app.find.toppagesetting;

import lombok.Value;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPagePersonSet;

/**
 * 
 * @author sonnh1
 *
 */
@Value
public class TopPagePersonSetDto {
	String sId;
	String topMenuCode;
	String loginMenuCode;
	int loginSystem;
	int menuClassification;

	public static TopPagePersonSetDto fromDomain(TopPagePersonSet domain) {
		return new TopPagePersonSetDto(domain.getEmployeeId(), domain.getTopMenuCode().v(),
				domain.getLoginMenuCode().v(), domain.getLoginSystem().value, domain.getMenuClassification().value);
	}
}
