package nts.uk.shr.com.security.audittrail.correction.processor;

import java.util.List;

import nts.uk.shr.com.security.audittrail.correction.content.DataCorrectionLog;

/**
 * DataCorrectionLogWriter
 */
public interface DataCorrectionLogWriter {
	
	/**
	 * Save データ修正記録
	 * @param dataCorrectionLog データ修正記録
	 */
	void save(List<DataCorrectionLog> dataCorrectionLog);
}
