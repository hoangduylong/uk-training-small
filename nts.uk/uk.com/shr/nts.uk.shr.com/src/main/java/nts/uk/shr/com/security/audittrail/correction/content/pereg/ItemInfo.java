package nts.uk.shr.com.security.audittrail.correction.content.pereg;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import nts.arc.time.GeneralDate;
import nts.uk.shr.com.security.audittrail.correction.content.DataValueAttribute;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.ItemInfo.RawValue.Type;

/**
 * 項目情報
 */
@RequiredArgsConstructor
public class ItemInfo {

	/** 項目ID */
	@Getter
	private final String id;
	
	@Getter
	private final String itemId;
	
	/** 項目名 */
	@Getter
	private final String name;
	
	/** 修正前 */
	@Getter
	private final Value valueBefore;
	
	/** 修正後 */
	@Getter
	private final Value valueAfter;
	
	public static ItemInfo create(String id, String itemId, String name, DataValueAttribute attr, Object valueBefore, Object valueAfter) {
		return new ItemInfo(id, itemId, name, Value.create(valueBefore, attr), Value.create(valueAfter, attr));
	}
	
	public static ItemInfo create(String id, String itemId, String name, DataValueAttribute attr, Object valueBefore,
			String viewValueBefore, Object valueAfter, String viewValueAfter) {
		return new ItemInfo(id, itemId, name,
				Value.create(valueBefore, viewValueBefore == null ? attr.format(valueBefore) : viewValueBefore, attr),
				Value.create(valueAfter, viewValueAfter == null ? attr.format(valueAfter) : viewValueAfter, attr));
	}
	
	/**
	 * create to read data only, not to write
	 * @param id
	 * @param name
	 * @param valueBefore
	 * @param valueAfter
	 * @return
	 */
	public static ItemInfo createToView(String id, String itemId, String name, String valueBefore, String valueAfter) {
		return new ItemInfo(id, itemId, name, Value.createToView(valueBefore), Value.createToView(valueAfter));
	}

	@RequiredArgsConstructor
	@Getter
	public static class Value {
		
		/**
		 * 整形前の値。記録として残すためだけのもので、表示には使わない。
		 * 将来、データの復元などに利用する可能性がある。
		 */
		private final RawValue rawValue;
		
		/** 表示用に整形された値。画面に表示するときにはこちらを見れば良い。 */
		private final String viewValue;
		
		static Value create(Object value, DataValueAttribute attr) {
			return new Value(new RawValue(Type.defaultOf(attr), value), attr.format(value));
		}
		
		static Value create(Object value, String viewValue, DataValueAttribute attr) {
			return new Value(new RawValue(Type.defaultOf(attr), value), viewValue);
		}
		
		/**
		 * create to read data only, not to write
		 * @param value
		 * @return
		 */
		static Value createToView(String value) {
			return new Value(null, value);
		}
	}
	
	@RequiredArgsConstructor
	@Getter
	public static class RawValue {
		
		private final Type type;
		private final Object value;
		
		public static RawValue asString(String value) {
			return new RawValue(Type.STRING, value);
		}
		
		public static RawValue asInteger(Integer value) {
			return new RawValue(Type.INTEGER, value);
		}
		
		public static RawValue asDouble(Double value) {
			return new RawValue(Type.DOUBLE, value);
		}
		
		public static RawValue asDecimal(BigDecimal value) {
			return new RawValue(Type.DECIMAL, value);
		}
		
		public static RawValue asDate(GeneralDate value) {
			return new RawValue(Type.DATE, value);
		}
		
		@RequiredArgsConstructor
		public enum Type {
			STRING(1),
			INTEGER(2),
			DOUBLE(3),
			DECIMAL(4),
			DATE(5),
			;
			public final int value;
			
			public static Type defaultOf(DataValueAttribute attr) {
				switch (attr) {
				case COUNT:
					return DECIMAL;
				case MONEY:
				case TIME:
				case CLOCK:
					return INTEGER;
				case DATE:
					return DATE;
				default:
					return STRING;
				}
			}
		}
		
		public String toString() {
			if (this.value == null || this.value.equals("")) {
				return null;
			} else {
				return this.value.toString();
			}
		}
	}
}