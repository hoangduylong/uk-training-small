package nts.uk.shr.com.security.audittrail.correction.processor;

import lombok.RequiredArgsConstructor;
import nts.arc.enums.EnumAdaptor;

/**
 * Define CorrectionLogProcessors here.
 */
@RequiredArgsConstructor
public enum CorrectionProcessorId {

	SAMPLE(0),
	
	DAILY(1),
	
	SCHEDULE(2),

	PEREG_REGISTER(3),
	
	MONTHLY(4),
	
	MATRIX_REGISTER(5)
	;
	public final int value;
	
	public static CorrectionProcessorId of(int value) {
		return EnumAdaptor.valueOf(value, CorrectionProcessorId.class);
	}
}
