package nts.uk.ctx.sys.log.dom.reference;

/*
 * author : thuongtv
 */
public enum ItemNoEnum {
	
	ITEM_NO_1(1,1),
	ITEM_NO_2(2,2),
	ITEM_NO_3(3,3),
	ITEM_NO_4(4,4),
	ITEM_NO_5(5,5),
	ITEM_NO_6(6,6),
	ITEM_NO_7(7,7),
	ITEM_NO_8(8,8),
	ITEM_NO_9(9,9),
	ITEM_NO_10(10,10),
	ITEM_NO_11(11,11),
	ITEM_NO_12(12,12),
	ITEM_NO_13(13,13),
	ITEM_NO_14(14,14),
	ITEM_NO_15(15,15),
	ITEM_NO_16(16,16),
	ITEM_NO_17(17,17),
	ITEM_NO_18(18,18),
	ITEM_NO_19(19,19),
	ITEM_NO_20(20,20),
	ITEM_NO_21(21,21),
	ITEM_NO_22(22,22),
	ITEM_NO_23(23,23),
	ITEM_NO_24(24,24),
	ITEM_NO_25(25,25),
	ITEM_NO_26(26,26),
	ITEM_NO_27(27,27),
	ITEM_NO_28(28,28),
	ITEM_NO_29(29,29),
	ITEM_NO_30(30,30),
	ITEM_NO_31(31,31),
	ITEM_NO_32(32,32),
	ITEM_NO_33(33,33),
	ITEM_NO_34(34,34),
	ITEM_NO_35(35,35),
	ITEM_NO_36(36,36);
	
	/** The code. */
	public final int code;

	/** The name id. */
	public final int name;

	private ItemNoEnum(int code, int name) {
		this.code = code;
		this.name = name;
	}
	
	/** The Constant values. */
	private final static ItemNoEnum[] values = ItemNoEnum.values();
	/**
	 * Value of.
	 *
	 * @param value the value
	 * @return the role type
	 */
	public static ItemNoEnum valueOf(int value) {
		
		// Find value.
		for (ItemNoEnum val : ItemNoEnum.values) {
			if (val.code == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
