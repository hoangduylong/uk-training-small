package nts.uk.ctx.sys.portal.dom.toppagesetting;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;

/**
 * The Class PersonHomPageSetting.
 */
@Getter
public class TopPageSelfSet extends AggregateRoot {
	/** The employee id. */
	private String employeeId;
	
	/** The top page code. */
	private String code;

	
	/**
	 * Instantiates a new person home page setting.
	 *
	 * @param employeeId the employee id
	 * @param code the top page code
	 */
	public TopPageSelfSet(String employeeId, String code) {
		this.employeeId = employeeId;
		this.code = code;
	}
	
	/**
	 * Creates the from java type.
	 *
	 * @param employeeId the employee id
	 * @param code the top page code
	 */
	public static TopPageSelfSet createFromJavaType(String employeeId, String code) {
		return new TopPageSelfSet(employeeId, code);
	}
}
