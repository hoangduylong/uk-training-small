package nts.uk.shr.com.security.audittrail.correction.processor;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import nts.uk.shr.com.security.audittrail.basic.LogBasicInformation;
import nts.uk.shr.com.security.audittrail.correction.content.CorrectionAttr;
import nts.uk.shr.com.security.audittrail.correction.content.DataCorrection;
import nts.uk.shr.com.security.audittrail.correction.content.DataCorrectionLog;
import nts.uk.shr.com.security.audittrail.correction.content.ItemInfo;
import nts.uk.shr.com.security.audittrail.correction.content.TargetDataKey;
import nts.uk.shr.com.security.audittrail.correction.content.TargetDataType;
import nts.uk.shr.com.security.audittrail.correction.content.UserInfo;

public class CorrectionLogProcessorContext {
	
	@Getter
	private final LogBasicInformation basicInfo;

	private final Object parameter;
	
	@Getter
	private final List<DataCorrectionLog> corrections;

	private CorrectionLogProcessorContext(LogBasicInformation basicInfo, Object parameter) {
		this.basicInfo = basicInfo;
		this.parameter = parameter;
		this.corrections = new ArrayList<>();
	}
	
	public static CorrectionLogProcessorContext newContext(LogBasicInformation basicInfo, Object parameter) {
		return new CorrectionLogProcessorContext(basicInfo, parameter);
	}
	
	public String getOperationId() {
		return this.basicInfo.getOperationId();
	}
	
	@SuppressWarnings("unchecked")
	public <P> P getParameter() {
		return (P) this.parameter;
	}
	
	public void addCorrection(DataCorrection correction) {
		this.addCorrection(DataCorrectionLog.of(this.getOperationId(), correction));
	}
	
	public void addCorrection(
			UserInfo targetUser,
			TargetDataType targetDataType,
			TargetDataKey targetDataKey,
			CorrectionAttr correctionAttr,
			ItemInfo correctedItem,
			int showOrder) {
		
		this.addCorrection(new DataCorrectionLog(
				this.getOperationId(), targetUser, targetDataType, targetDataKey, correctionAttr, correctedItem, showOrder));
	}
	
	public void addCorrection(
			UserInfo targetUser,
			TargetDataType targetDataType,
			TargetDataKey targetDataKey,
			CorrectionAttr correctionAttr,
			ItemInfo correctedItem,
			int showOrder,
			String remark) {
		
		this.addCorrection(new DataCorrectionLog(
				this.getOperationId(), targetUser, targetDataType, targetDataKey, correctionAttr, correctedItem, showOrder, remark));
	}
	
	private void addCorrection(DataCorrectionLog correction) {
		this.corrections.add(correction);
	}
}
