package nts.uk.shr.com.security.audittrail.correction.processor;

import javax.inject.Inject;

import nts.uk.shr.com.security.audittrail.UserInfoAdaptorForLog;
import nts.uk.shr.com.security.audittrail.basic.LogBasicInformation;

/**
 * The base class to log audit trail of corrections.
 */
public abstract class CorrectionLogProcessor<C> {

	/** userInfoAdaptorForLog */
	@Inject
	protected UserInfoAdaptorForLog userInfoAdaptor;

	/**
	 * Returns AuditTrailProcessorId.
	 * @return AuditTrailProcessorId
	 */
	public abstract CorrectionProcessorId getId();
	
	/**
	 * Process logging.
	 * @param parameter parameter object
	 */
	protected abstract void buildLogContents(C context);
	
	/**
	 * 
	 * @param operationId
	 * @param parameter
	 */
	public abstract void processLoggingForBus(LogBasicInformation basicInfo, Object parameter);
}
