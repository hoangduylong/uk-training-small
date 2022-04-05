package nts.uk.ctx.sys.portal.app.find.toppagesetting;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SelectMyPageDto {
	/**
	 * Top page code & Menu code
	 */
	private String code;
	
	/**
	 * Top page name & Menu name
	 */
	private String name;
}
