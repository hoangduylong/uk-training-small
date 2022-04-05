package nts.uk.ctx.sys.log.app.command.pereg;

import lombok.AllArgsConstructor;
import nts.arc.enums.EnumAdaptor;

@AllArgsConstructor
public enum KeySetCorrectionLog {
	
	PERSON_CORRECTION_LOG(0),
	CATEGORY_CORRECTION_LOG(1);
	
	public final int value;
	
	public static KeySetCorrectionLog of(int value) {
		return EnumAdaptor.valueOf(value, KeySetCorrectionLog.class);
	}

}
