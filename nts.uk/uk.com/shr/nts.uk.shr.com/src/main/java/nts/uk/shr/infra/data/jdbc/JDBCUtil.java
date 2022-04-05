package nts.uk.shr.infra.data.jdbc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.commons.lang3.StringUtils;

import nts.arc.time.GeneralDateTime;
import nts.gul.text.StringUtil;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.LoginUserContext;

public class JDBCUtil {

	public static final String TARGET_FIELD = "{targetField}";
	public static final String TARGET_TABLE = "{targetTable}";
	public static final String FIELD_VALUE = "{fieldValue}";
	public static final String CONDITION = "{condition}";
	private static final String SELECT = "SELECT";
	private static final String WHERE = "WHERE";
	private static final String UPDATE = "UPDATE";
	private static final String INSERT = "INSERT";
	private static final String DELETE = "DELETE";
	private static final String FROM = "FROM";
	private static final String SET = "SET";
	private static final String INTO = "INTO";
	private static final String VALUES = "VALUES";
	private static final String OPEN_KOMA = "(";
	private static final String CLOSE_KOMA = ")";
	private static final String DEFAULT_SEPERATOR = " ";
	private static final String DEFAULT_STRING_QUOTE = "'";
	private static final String NULL_VALUE = "NULL";
	private static final String STATEMENT_SEPERATOR = ";";

	public static String selectTemplate() {
		return build(SELECT, TARGET_FIELD, FROM, TARGET_TABLE);
	}

	public static String selectWhereTemplate() {
		return build(SELECT, TARGET_FIELD, FROM, TARGET_TABLE, WHERE, CONDITION);
	}

	public static String updateTemplate() {
		return build(UPDATE, TARGET_TABLE, SET, TARGET_FIELD, WHERE, CONDITION);
	}

	public static String deleteTemplate() {
		return build(DELETE, FROM, TARGET_TABLE, WHERE, CONDITION);
	}
	
	public static String insertTemplate() {
		return build(INSERT, INTO, TARGET_TABLE, OPEN_KOMA, TARGET_FIELD, CLOSE_KOMA, VALUES, OPEN_KOMA, FIELD_VALUE, CLOSE_KOMA);
	}
	
	public static String toInsertWithCommonField(String insertQuery){
		
		return toInsertWithCommonField(insertQuery, getDefaultInsertField().collect(Collectors.toList()));
	}
	
	public static String toInsertWithCommonField(String insertQuery, boolean isMultiStatement){
		List<FieldWithValue> defaultValues = getDefaultInsertField().collect(Collectors.toList());
		
		return changeStatements(insertQuery, isMultiStatement, statement 
				-> toInsertWithCommonField(statement, defaultValues), INSERT);
	}
	
	public static String toUpdateWithCommonField(String updateQuery, boolean isMultiStatement){
		List<FieldWithValue> defaultValues = getDefaultUpdateField().collect(Collectors.toList());
		
		return changeStatements(updateQuery, isMultiStatement, statement 
				-> toUpdateWithCommonField(statement, defaultValues), UPDATE);
	}
	
	public static String toUpdateWithCommonField(String updateQuery){

		return toUpdateWithCommonField(updateQuery, getDefaultUpdateField().collect(Collectors.toList()));
	}

	public static String buildInCondition(Collection<?> values){
		return StringUtils.join(OPEN_KOMA, StringUtils.join(values.stream()
				.map(v -> toString(v)).toArray(), ","), CLOSE_KOMA);
	}
	
	public static String toString(Object original){
		if(original == null){
			return NULL_VALUE;
		}
		return StringUtils.join(DEFAULT_STRING_QUOTE, original, DEFAULT_STRING_QUOTE);
	}
	
	public static String removeConditionIfHave(String query){
		return query.replace(WHERE, "").replace(CONDITION, "");
	}
	
	public static Stream<FieldWithValue> getDefaultInsertField(){
		GeneralDateTime now = GeneralDateTime.now();

		return defaultField((user, programId) -> 
						Stream.concat(
							Stream.concat(
								getDefaultInsertField(now, user, programId), 
								getDefaultUpdateField(now, user, programId)),
							getDefaultField(user))
				);
	}
	
	public static Stream<FieldWithValue> getDefaultUpdateField(){
		GeneralDateTime now = GeneralDateTime.now();
		
		return defaultField((user, programId) ->  getDefaultUpdateField(now, user, programId));
	}
	
	private static String changeStatements(String query, boolean isMultiStatement, Function<String, String> action, String keyword){
		
		if(!isMultiStatement){
			return action.apply(keyword);
		}
		
		Object statements[] = Stream.of(split(build("[ ;]" + keyword, ""), query))
				.map(statement -> {
					if(StringUtil.isNullOrEmpty(statement, true)){
						return "";
					}
					String result = action.apply(statement);
					if(indexOf(keyword, result) == 0){
						return result + STATEMENT_SEPERATOR;
					}
					return build(keyword, result, STATEMENT_SEPERATOR);
				}).toArray();
		
		return StringUtils.join(statements, "");
	}
	
	private static String toInsertWithCommonField(String insertQuery, List<FieldWithValue> defaultValues){
		StringBuilder builder = new StringBuilder(insertQuery);
		List<String> fields = new ArrayList<>();
		List<String> values = new ArrayList<>();
		defaultValues.forEach(fv -> {
			fields.add(fv.field);
			values.add(toString(fv.value));
		});
		
		String fieldInQ = StringUtils.join(fields.toArray(), ", ");
		String valueInQ = StringUtils.join(values.toArray(), ", ");
		
		int firstKoma = builder.indexOf(OPEN_KOMA);
		int second = builder.indexOf(OPEN_KOMA, firstKoma + 1);
		builder.insert(second + 1, valueInQ + ", ");
		builder.insert(firstKoma + 1,  fieldInQ + ", ");
		
		return builder.toString();
	}
	
	private static String toUpdateWithCommonField(String updateQuery, List<FieldWithValue> defaultValues){
		Object updated[] = defaultValues.stream().map(
				f -> StringUtils.join(f.field, " = ", toString(f.value)))
				.collect(Collectors.toList()).toArray();
		
		String valueInQ = StringUtils.join(updated, ", ");
		
		List<String> splitted = new ArrayList<>(Arrays.asList(split(" " + WHERE + " ", updateQuery)));

		if(splitted.size() > 1){
			splitted.add(1, " " + WHERE + " ");	
		}
		splitted.add(1, valueInQ);
		splitted.add(1, ", ");
		
		return StringUtils.join(splitted.toArray(), "");
	}
	
	private static Stream<FieldWithValue> defaultField(BiFunction<LoginUserContext, String, Stream<FieldWithValue>> action){
		
		LoginUserContext user = AppContexts.user();
		String programId = AppContexts.programId();

		return action.apply(user, programId);
	}

	private static Stream<FieldWithValue> getDefaultInsertField(GeneralDateTime now, LoginUserContext user,
			String programId) {
		return Stream.of(new FieldWithValue("INS_DATE", " = ", now),
						new FieldWithValue("INS_CCD", " = ", user.companyCode()),
						new FieldWithValue("INS_SCD", " = ", user.employeeCode()),
						new FieldWithValue("INS_PG", " = ", programId));
	} 

	private static int indexOf(String keyword, String result) {
//		Pattern.compile(keyword, Pattern.CASE_INSENSITIVE)
		return result.trim().toUpperCase().indexOf(keyword);
	}

	private static Stream<FieldWithValue> getDefaultUpdateField(GeneralDateTime now, LoginUserContext user,
			String programId) {
		return Stream.of(new FieldWithValue("UPD_DATE", " = ", now),
						new FieldWithValue("UPD_CCD", " = ", user.companyCode()),
						new FieldWithValue("UPD_SCD", " = ", user.employeeCode()),
						new FieldWithValue("UPD_PG", " = ", programId));
	} 
	
	private static Stream<FieldWithValue> getDefaultField(LoginUserContext user) {
		return Stream.of(new FieldWithValue("CONTRACT_CD", " = ", user.contractCode()));
	}
	
	private static String[] split(String keyword, String query) {
		return Pattern.compile(keyword, Pattern.CASE_INSENSITIVE).split(query);
	}
	
	private static String build(String... values) {
		return StringUtils.join(values, DEFAULT_SEPERATOR);
	}
}
