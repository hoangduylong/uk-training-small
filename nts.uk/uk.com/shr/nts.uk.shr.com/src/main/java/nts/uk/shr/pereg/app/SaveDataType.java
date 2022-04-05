package nts.uk.shr.pereg.app;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum SaveDataType {
	
	// 1:文字列(String)
	STRING(1),

	// 2:数値(Numeric)
	NUMERIC(2),

	// 3:日付(Date)
	DATE(3);

	public final int value;

}
