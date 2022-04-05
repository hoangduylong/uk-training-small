package nts.uk.shr.infra.data.jdbc;

import java.util.Collection;

import org.apache.commons.lang3.StringUtils;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class FieldWithValue {
	
	public final String field;
	
	public final String operator;
	
	public final Object value;

	public String buildCondition() {
		return StringUtils.join(field, operator, getValue());
	}

	private String getValue() {
		if (value instanceof Collection) {
			
			return (JDBCUtil.buildInCondition((Collection<?>) value));
		} else {
			
			return JDBCUtil.toString(value);
		}
	}

	public String toString() {
		return this.buildCondition();
	}
}
