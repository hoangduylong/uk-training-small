package nts.uk.shr.develop;

import lombok.Getter;
import lombok.val;
import nts.arc.enums.EnumAdaptor;
import nts.uk.shr.infra.web.component.validation.Helper;

@Getter
public class ValueConstraint {
	
	private String name;
	private String domainType;
	private String valueType;
	
	private String charType;
	private Integer maxLength;

	private String max;
	private String min;
	private String mantissaMaxLength;
	private Boolean isZeroPadded;
	
	public static ValueConstraint of(Class<?> constraintClass) {
		
		if (constraintClass.isEnum()) {
			return asEnum(constraintClass);
		} else {
			return asPrimitiveValue(constraintClass);
		}
		
	}
	
	public static ValueConstraint asPrimitiveValue(Class<?> pvClass) {
		
		val dto = new ValueConstraint();
		dto.name = pvClass.getSimpleName();
		dto.domainType = "PrimitiveValue";
		dto.valueType = Helper.getValueType(pvClass);
		
		Helper.processConstraints(pvClass, (name, value) -> {
			
			switch (name) {
			case "charType":
				dto.charType = value.replace("'", ""); // シングルクォートが付けられてくるので除外
				break;
			case "maxLength":
				dto.maxLength = Integer.parseInt(value);
				break;
			case "max":
				dto.max = value;
				break;
			case "min":
				dto.min = value;
				break;
			case "mantissaMaxLength":
				dto.mantissaMaxLength = value;
				break;
			case "isZeroPadded":
				dto.isZeroPadded = "true".equals(value);
				break;
			}
		});
		
		return dto;
	}

	@SuppressWarnings("unchecked")
	public static <E extends Enum<?>> ValueConstraint asEnum(Class<?> enumClass) {

		val dto = new ValueConstraint();
		dto.name = enumClass.getSimpleName();
		dto.domainType = "Enum";
		dto.valueType = "Integer";
		
		val constants = EnumAdaptor.convertToValueNameList((Class<E>) enumClass);
		
		int max = constants.stream().mapToInt(e -> e.getValue()).max().getAsInt();
		int min = constants.stream().mapToInt(e -> e.getValue()).min().getAsInt();
		
		dto.max = Integer.toString(max);
		dto.min = Integer.toString(min);
		
		return dto;
	}
}
