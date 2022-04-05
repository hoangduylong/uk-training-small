package nts.uk.shr.com.security.audittrail.correction.processor;

import nts.uk.shr.com.security.audittrail.basic.LogBasicInformation;

/**
 * LogBasicInformationRepository
 */
public interface LogBasicInformationWriter {
	
	/**
	 * Save ログ基本情報
	 * @param basicInfo ログ基本情報
	 */
	void save(LogBasicInformation basicInfo);
}
