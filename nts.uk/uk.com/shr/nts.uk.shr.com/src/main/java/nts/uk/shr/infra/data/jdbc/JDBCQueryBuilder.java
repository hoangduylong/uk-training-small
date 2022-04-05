package nts.uk.shr.infra.data.jdbc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.Table;

import org.apache.commons.lang3.StringUtils;

public class JDBCQueryBuilder {

	private JDBCQueryBuilder(Class<?> target) {
		this.targetClass = target;
	}

	private QueryType type;

	private Class<?> targetClass;

	private List<String> selectFields = new ArrayList<>();

	private List<FieldWithValue> changeFields = new ArrayList<>();

	private List<FieldWithValue> andConditions = new ArrayList<>();

	private List<FieldWithValue> orConditions = new ArrayList<>();

	public static JDBCQueryBuilder start(Class<?> target) {
		return new JDBCQueryBuilder(target);
	}

	public JDBCQueryBuilder type(QueryType type) {
		this.type = type;
		return this;
	}

	public JDBCQueryBuilder selectFields(List<String> targetField) {
		this.selectFields.addAll(targetField);
		return this;
	}

	public JDBCQueryBuilder selectFields(String... targetField) {
		this.selectFields.addAll(Arrays.asList(targetField));
		return this;
	}

	public JDBCQueryBuilder changeFields(List<FieldWithValue> values) {
		this.changeFields.addAll(values);
		return this;
	}

	public JDBCQueryBuilder changeFields(FieldWithValue... value) {
		this.changeFields.addAll(Arrays.asList(value));
		return this;
	}

	public JDBCQueryBuilder conditions(List<FieldWithValue> conditions, ConditionJoin join) {
		if (join == ConditionJoin.AND) {
			
			this.andConditions.addAll(conditions);
		} else {
			
			this.orConditions.addAll(conditions);
		}
		return this;
	}

	public JDBCQueryBuilder conditions(FieldWithValue condition, ConditionJoin join) {
		if (join == ConditionJoin.AND) {
			
			this.andConditions.add(condition);
		} else {
			
			this.orConditions.add(condition);
		}
		return this;
	}

	public String build() {
		return buildQueryInternal();
	}

	private String buildQueryInternal() {
		switch (type) {

		case SELECT:
			if (!shouldCheckCondition()) {
				return buildSelect(JDBCUtil.selectTemplate());
			}

			return buildSelect(JDBCUtil.selectWhereTemplate());

		case DELETE:
			return buildDelete(JDBCUtil.deleteTemplate());

		case INSERT:
			return buildInsert(JDBCUtil.insertTemplate());

		case UPDATE:
			return buildUpdate(JDBCUtil.updateTemplate());

		default:
			return "";
		}
	}

	private String buildSelect(String template) {
		template = template.replace(JDBCUtil.TARGET_TABLE, getTargetTable());
		if (selectFields.isEmpty()) {

			template = template.replace(JDBCUtil.TARGET_FIELD, "*");
		} else {

			template = template.replace(JDBCUtil.TARGET_FIELD, StringUtils.join(selectFields.toArray(), ", "));
		}
		return buildConditions(template);
	}

	private String buildDelete(String template) {
		return buildConditions(template.replace(JDBCUtil.TARGET_TABLE, getTargetTable()));
	}

	private String buildInsert(String template) {
		return buildConditions(buildInsertV(template.replace(JDBCUtil.TARGET_TABLE, getTargetTable())));
	}

	private String buildInsertV(String template) {
		Stream<FieldWithValue> defaultI = JDBCUtil.getDefaultInsertField();

		List<String> fields = new ArrayList<>();
		List<String> values = new ArrayList<>();
		Stream.concat(defaultI, changeFields.stream()).forEach(fv -> {
			fields.add(fv.field);
			values.add(JDBCUtil.toString(fv.value));
		});

		template = template.replace(JDBCUtil.TARGET_FIELD, StringUtils.join(fields.toArray(), ", "));
		template = template.replace(JDBCUtil.FIELD_VALUE, StringUtils.join(values.toArray(), ", "));

		return template;
	}

	private String buildUpdate(String template) {
		return buildConditions(buildUpdateV(template.replace(JDBCUtil.TARGET_TABLE, getTargetTable())));
	}

	private String buildUpdateV(String template) {
		Stream<FieldWithValue> defaultU = JDBCUtil.getDefaultUpdateField();

		Object updated[] = Stream.concat(changeFields.stream(), defaultU).map(
				f -> StringUtils.join(f.field, " = ", JDBCUtil.toString(f.value)))
				.collect(Collectors.toList()).toArray();

		return template.replace(JDBCUtil.TARGET_FIELD, StringUtils.join(updated, ", "));
	}

	private String buildConditions(String template) {
		if (shouldCheckCondition()) {

			String andCondition = StringUtils.join(andConditions.toArray(), " AND ");
			String orCondition = StringUtils.join(orConditions.toArray(), " OR ");

			if (andCondition.isEmpty() && !orCondition.isEmpty()) {
				return template.replace(JDBCUtil.CONDITION, orCondition);
			}

			if (orCondition.isEmpty() && !andCondition.isEmpty()) {
				return template.replace(JDBCUtil.CONDITION, orCondition);
			}

			return template.replace(JDBCUtil.CONDITION, StringUtils.join(andCondition, " OR ", orCondition));
		}
		return JDBCUtil.removeConditionIfHave(template);

	}

	private boolean shouldCheckCondition() {
		return !andConditions.isEmpty() || !orConditions.isEmpty();
	}

	private String getTargetTable() {
		Table tableAnno = targetClass.getAnnotation(Table.class);
		if (tableAnno == null) {
			throw new RuntimeException("Unknow type entity: " + targetClass.getName());
		}
		return tableAnno.name();
	}
}
