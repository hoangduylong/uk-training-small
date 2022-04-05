package nts.uk.ctx.bs.employee.dom.setting.code;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.dom.AggregateRoot;

@Getter
@AllArgsConstructor
public class EmployeeCESetting extends AggregateRoot {

	private String companyId;

	private EmployeeCEMethodAttr ceMethodAtr;

	private NumberOfDigit digitNumb;

	public static EmployeeCESetting createFromJavaType(String companyId, int ceMethodAtr, int digitNumb) {
		return new EmployeeCESetting(companyId, EnumAdaptor.valueOf(ceMethodAtr, EmployeeCEMethodAttr.class),
				new NumberOfDigit(digitNumb));
	}
}
