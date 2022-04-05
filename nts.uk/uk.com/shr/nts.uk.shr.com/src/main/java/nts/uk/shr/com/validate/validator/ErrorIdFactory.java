package nts.uk.shr.com.validate.validator;

public class ErrorIdFactory {

	/************************** STRING ****************************************/
	public static String CharTypeErrorId = "FND_E_STRING_TYPE";

	public static String MaxLengthErrorId = "FND_E_STRING_MAX_LENGTH";

	public static String RegExpErrorId = "FND_E_STRING_PATTERN";

	/************************** NUMERIC ****************************************/

	public static String NumericType = "FND_E_NUMBERIC_TYPE";
	
	public static String MinusErrorId = "FND_E_NUMBERIC_MINUS";

	public static String NumericMinErrorId = "FND_E_NUMBERIC_MIN";

	public static String NumericMaxErrorId = "FND_E_NUMERIC_MAX";

	public static String IntegerPartErrorId = "FND_E_NUMERIC_INT_PART";

	public static String DecimalPartErrorId = "FND_E_NUMERIC_DEC_PART";

	/************************** DATE ****************************************/

	public static String DateErrorId = "FND_E_DATE_STYLE";

	/************************** TIME ****************************************/

	public static String TimeStyleErrorId = "FND_E_TIME_STYLE";

	public static String TimeMinErrorId = "FND_E_TIME_MIN";

	public static String TimeMaxErrorId = "FND_E_TIME_MAX";

}
