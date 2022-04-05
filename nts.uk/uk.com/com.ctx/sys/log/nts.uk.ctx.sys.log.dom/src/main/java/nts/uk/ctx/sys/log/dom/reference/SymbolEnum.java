package nts.uk.ctx.sys.log.dom.reference;

/*
 * author : hiep.th
 */
public enum SymbolEnum {
	
	INCLUDE(0, "Enum_Symbol_Include"),
	EQUAL(1, "Enum_Symbol_Equal"),
	DIFFERENT(2, "Enum_Symbol_Different");
	
	
	/** The code. */
	public final int code;

	/** The name id. */
	public final String name;

	private SymbolEnum(int code, String name) {
		this.code = code;
		this.name = name;
	}
	
	/** The Constant values. */
	private final static SymbolEnum[] values = SymbolEnum.values();
	/**
	 * Value of.
	 *
	 * @param value the value
	 * @return the role type
	 */
	public static SymbolEnum valueOf(int value) {
		// Find value.
		for (SymbolEnum val : SymbolEnum.values) {
			if (val.code == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
