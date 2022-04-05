package nts.uk.shr.infra.web.component.validation;

import java.lang.annotation.Annotation;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.function.BiConsumer;
import java.util.stream.Stream;

import lombok.val;
import nts.arc.primitive.DecimalPrimitiveValue;
import nts.arc.primitive.HalfIntegerPrimitiveValue;
import nts.arc.primitive.IntegerPrimitiveValue;
import nts.arc.primitive.LongPrimitiveValue;
import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.TimeClockPrimitiveValue;
import nts.arc.primitive.TimeDurationPrimitiveValue;
import nts.arc.primitive.constraint.CharType;
import nts.arc.primitive.constraint.DecimalMantissaMaxLength;
import nts.arc.primitive.constraint.DecimalMaxValue;
import nts.arc.primitive.constraint.DecimalMinValue;
import nts.arc.primitive.constraint.DecimalRange;
import nts.arc.primitive.constraint.HalfIntegerMaxValue;
import nts.arc.primitive.constraint.HalfIntegerMinValue;
import nts.arc.primitive.constraint.HalfIntegerRange;
import nts.arc.primitive.constraint.IntegerMaxValue;
import nts.arc.primitive.constraint.IntegerMinValue;
import nts.arc.primitive.constraint.IntegerRange;
import nts.arc.primitive.constraint.LongMaxValue;
import nts.arc.primitive.constraint.LongMinValue;
import nts.arc.primitive.constraint.LongRange;
import nts.arc.primitive.constraint.PrimitiveValueConstraintPackage;
import nts.arc.primitive.constraint.StringCharType;
import nts.arc.primitive.constraint.StringMaxLength;
import nts.arc.primitive.constraint.StringRegEx;
import nts.arc.primitive.constraint.TimeMaxValue;
import nts.arc.primitive.constraint.TimeMinValue;
import nts.arc.primitive.constraint.TimeRange;
import nts.uk.shr.com.primitive.ZeroPaddedCode;

public class Helper {

	/**
	 * these constraints have single parameter
	 */
	public static HashMap<String, String> CONSTRAINTS_SIGNLE_PARAM = new HashMap<>();
	static {
		CONSTRAINTS_SIGNLE_PARAM.put(StringCharType.class.getSimpleName(), "charType");
		CONSTRAINTS_SIGNLE_PARAM.put(StringMaxLength.class.getSimpleName(), "maxLength");
		CONSTRAINTS_SIGNLE_PARAM.put(StringRegEx.class.getSimpleName(), "stringExpression");
		CONSTRAINTS_SIGNLE_PARAM.put(IntegerMaxValue.class.getSimpleName(), "max");
		CONSTRAINTS_SIGNLE_PARAM.put(IntegerMinValue.class.getSimpleName(), "min");
		CONSTRAINTS_SIGNLE_PARAM.put(LongMaxValue.class.getSimpleName(), "max");
		CONSTRAINTS_SIGNLE_PARAM.put(LongMinValue.class.getSimpleName(), "min");
		CONSTRAINTS_SIGNLE_PARAM.put(DecimalMaxValue.class.getSimpleName(), "max");
		CONSTRAINTS_SIGNLE_PARAM.put(DecimalMinValue.class.getSimpleName(), "min");
		CONSTRAINTS_SIGNLE_PARAM.put(TimeMaxValue.class.getSimpleName(), "max");
		CONSTRAINTS_SIGNLE_PARAM.put(TimeMinValue.class.getSimpleName(), "min");
		CONSTRAINTS_SIGNLE_PARAM.put(HalfIntegerMaxValue.class.getSimpleName(), "max");
		CONSTRAINTS_SIGNLE_PARAM.put(HalfIntegerMinValue.class.getSimpleName(), "min");
		CONSTRAINTS_SIGNLE_PARAM.put(DecimalMantissaMaxLength.class.getSimpleName(), "mantissaMaxLength");
		CONSTRAINTS_SIGNLE_PARAM.put(ZeroPaddedCode.class.getSimpleName(), "isZeroPadded");
	}

	/**
	 * these constraints have multiple parameters: max, min
	 */
	public static HashSet<String> CONSTRAINTS_MAX_MIN_PARAM = new HashSet<>();
	static {
		CONSTRAINTS_MAX_MIN_PARAM.add(IntegerRange.class.getSimpleName());
		CONSTRAINTS_MAX_MIN_PARAM.add(LongRange.class.getSimpleName());
		CONSTRAINTS_MAX_MIN_PARAM.add(DecimalRange.class.getSimpleName());
		CONSTRAINTS_MAX_MIN_PARAM.add(TimeRange.class.getSimpleName());
		CONSTRAINTS_MAX_MIN_PARAM.add(HalfIntegerRange.class.getSimpleName());
	}

	static HashMap<String, String> CHARTYPE_NAMES_MAP = new HashMap<>();
	static {
		CHARTYPE_NAMES_MAP.put(CharType.ANY_HALF_WIDTH.name(), "AnyHalfWidth");
		CHARTYPE_NAMES_MAP.put(CharType.ALPHA_NUMERIC.name(), "AlphaNumeric");
		CHARTYPE_NAMES_MAP.put(CharType.ALPHABET.name(), "Alphabet");
		CHARTYPE_NAMES_MAP.put(CharType.NUMERIC.name(), "Numeric");
		CHARTYPE_NAMES_MAP.put(CharType.KANA.name(), "Kana");
	}

	public static String getValueType(Class<?> inputClass) {
		if (StringPrimitiveValue.class.isAssignableFrom(inputClass)) {
			return "String";
		} else if (TimeDurationPrimitiveValue.class.isAssignableFrom(inputClass)) {
			return "Time";
		} else if (TimeClockPrimitiveValue.class.isAssignableFrom(inputClass)) {
			return "Clock";
		} else if (IntegerPrimitiveValue.class.isAssignableFrom(inputClass)) {
			return "Integer";
		} else if (LongPrimitiveValue.class.isAssignableFrom(inputClass)) {
			return "Integer";
		} else if (DecimalPrimitiveValue.class.isAssignableFrom(inputClass)) {
			return "Decimal";
		} else if (HalfIntegerPrimitiveValue.class.isAssignableFrom(inputClass)) {
			return "HalfInt";
		} else {
			throw new RuntimeException("not supported: " + inputClass.getName());
		}
	}
	
	public static void processConstraints(Class<?> pvClass, BiConsumer<String, String> action){
		annotationsStream(pvClass)
		.map(a -> a.toString())
		.filter(r -> r.contains(PrimitiveValueConstraintPackage.NAME) || r.contains("nts.uk.shr.com.primitive"))
        .forEach(representationOfAnnotation -> {

			String constraintName = Helper.getAnnotationName(representationOfAnnotation);
        	String parametersString = Helper.getAnnotationParametersString(representationOfAnnotation);
        	processAConstraint(constraintName, parametersString, action);
        });
	}
	
	private static void processAConstraint(String constraintName, String parametersString, BiConsumer<String, String> action) {
		
		if (Helper.CONSTRAINTS_SIGNLE_PARAM.containsKey(constraintName)) {
			String jsName = Helper.CONSTRAINTS_SIGNLE_PARAM.get(constraintName);
			String jsValue = Helper.parseSingleParameterValue(constraintName, parametersString);
			
			action.accept(jsName, jsValue);
			
		} else if (Helper.CONSTRAINTS_MAX_MIN_PARAM.contains(constraintName)) {
			val paramsMap = Helper.parseMultipleParametersString(parametersString);

			action.accept("max", paramsMap.get("max"));
			action.accept("min", paramsMap.get("min"));
		}
	}
	
	/**
	 * Get annotations stream of pvClass and its super class.
	 * @param pvClass pvClass
	 * @return annotations stream
	 */
	private static Stream<Annotation> annotationsStream(Class<?> pvClass) {
		return Stream.concat(Arrays.asList(pvClass.getDeclaredAnnotations()).stream(), 
							Arrays.asList(pvClass.getSuperclass().getDeclaredAnnotations()).stream());
	}

	public static String getAnnotationName(String representationOfAnnotation) {
		int end = representationOfAnnotation.indexOf("(");
		String noEnd = representationOfAnnotation.substring(0, end);
		int start = noEnd.lastIndexOf(".") + 1;

		return noEnd.substring(start, end);
	}

	public static String getAnnotationParametersString(String representationOfAnnotation) {
		int start = representationOfAnnotation.indexOf("(") + 1;
		int end = representationOfAnnotation.lastIndexOf(")");
		return representationOfAnnotation.substring(start, end);
	}

	public static String parseSingleParameterValue(String constraintName, String parametersString) {
		String jsValue = parametersString.replaceAll("value=", "");

		if (constraintName.equalsIgnoreCase("StringCharType")) {
			jsValue = "'" + Helper.CHARTYPE_NAMES_MAP.get(jsValue) + "'";
		} else if (constraintName.equalsIgnoreCase("StringRegEx")) {
			jsValue = "/" + jsValue + "/";
		} else if (constraintName.equalsIgnoreCase("ZeroPaddedCode")) {
			jsValue = "true";
		}

		return jsValue;
	}

	public static Map<String, String> parseMultipleParametersString(String parametersString) {
		val results = new HashMap<String, String>();

		for (String param : parametersString.split(",")) {
			String[] paramParts = param.split("=");
			results.put(paramParts[0].trim(), paramParts[1].trim());
		}

		return results;
	}
}
