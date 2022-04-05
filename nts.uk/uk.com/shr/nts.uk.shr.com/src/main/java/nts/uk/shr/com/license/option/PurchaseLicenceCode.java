package nts.uk.shr.com.license.option;

import nts.arc.layer.dom.AggregateRoot;
import nts.uk.shr.com.license.employee.EmployeeLicenceCode;

/**
 * 購入済みのライセンスコード
 * @author keisuke_hoshina
 *
 */
public class PurchaseLicenceCode extends AggregateRoot{
	private EmployeeLicenceCode employeeLicenceCode;
	private OptionalLicenceCode optionLicenceCode;
}
