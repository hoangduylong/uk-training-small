package nts.uk.shr.com.license.employee;

import nts.arc.primitive.StringPrimitiveValue;

/**
 * 人数ライセンスコード
 * @author keisuke_hoshina
 *
 */
public class EmployeeLicenceCode extends StringPrimitiveValue<EmployeeLicenceCode>{

	private static final long serialVersionUID = 1L;

	public EmployeeLicenceCode(String rawValue) {
		super(rawValue);
	}
}
