package nts.uk.ctx.sys.portal.dom.layout;

import java.math.BigDecimal;

import nts.arc.primitive.DecimalPrimitiveValue;
import nts.arc.primitive.constraint.DecimalMantissaMaxLength;
import nts.arc.primitive.constraint.DecimalRange;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.レイアウト.レイアウト（New）.レイアウトNO
 * 
 * @author LienPTK
 *
 */
@DecimalRange(min = "0", max = "2")
@DecimalMantissaMaxLength(1)
public class LayoutNO extends DecimalPrimitiveValue<LayoutNO> {
	/**
	 * SerialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	public LayoutNO(BigDecimal rawValue) {
		super(rawValue);
	}
}