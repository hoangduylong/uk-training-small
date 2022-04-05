package nts.uk.shr.com.color;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * UKDesign.ドメインモデル."NittsuSystem.UniversalK".Common.カラー.カラーコード
 * @author Doan Duy Hung
 *
 */
@StringMaxLength(7)
public class ColorCode extends StringPrimitiveValue<ColorCode> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6163582782918134332L;

	public ColorCode(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}

}
