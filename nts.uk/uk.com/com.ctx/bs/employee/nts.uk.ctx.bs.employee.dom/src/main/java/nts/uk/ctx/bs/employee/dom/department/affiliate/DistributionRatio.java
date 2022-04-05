package nts.uk.ctx.bs.employee.dom.department.affiliate;

import java.math.BigDecimal;

import nts.arc.primitive.DecimalPrimitiveValue;
import nts.arc.primitive.constraint.DecimalMaxValue;
import nts.arc.primitive.constraint.DecimalMinValue;


@DecimalMinValue("0")
@DecimalMaxValue("100")
public class DistributionRatio extends DecimalPrimitiveValue<DistributionRatio>{

	/**
	 *  
	 */
	private static final long serialVersionUID = 1L;

	public DistributionRatio(BigDecimal rawValue) {
		super(rawValue);
	}

}
