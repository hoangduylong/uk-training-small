package nts.uk.shr.com.license.option;

import nts.arc.primitive.StringPrimitiveValue;

//@StringMaxLength(19)
// TO DO オプションライセンスコードの桁数がわかったら↑を変更する 
public class OptionalLicenceCode extends StringPrimitiveValue<OptionalLicenceCode>{

	private static final long serialVersionUID = 1L;

	public OptionalLicenceCode(String rawValue) {
		super(rawValue);
		// TODO Auto-generated constructor stub
	}
}
