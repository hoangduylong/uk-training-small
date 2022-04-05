package nts.uk.ctx.sys.portal.app.find.toppagesetting;

import lombok.AllArgsConstructor;
import lombok.Data;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPageSelfSet;
@Data
@AllArgsConstructor
public class TopPageSelfSettingDto {
	/** The employee id. */
	private String employeeId;
	
	/** The top page code. */
	private String code;

	public static TopPageSelfSettingDto fromDomain(TopPageSelfSet domain){
		return new TopPageSelfSettingDto(domain.getEmployeeId(),domain.getCode());
	}
}
