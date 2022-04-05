package nts.uk.shr.sample.audittrail.correction;

import nts.uk.shr.com.security.audittrail.correction.content.CorrectionAttr;
import nts.uk.shr.com.security.audittrail.correction.content.ItemInfo;
import nts.uk.shr.com.security.audittrail.correction.processor.CorrectionProcessorId;
import nts.uk.shr.com.security.audittrail.correction.processor.DataCorrectionLogProcessor;
import nts.uk.shr.com.security.audittrail.correction.processor.CorrectionLogProcessorContext;

import javax.ejb.Stateless;

import lombok.val;
import nts.arc.time.GeneralDate;

@Stateless
public class SampleCorrectionLogProcessor extends DataCorrectionLogProcessor {

	@Override
	public CorrectionProcessorId getId() {
		return CorrectionProcessorId.SAMPLE;
	}

	@Override
	protected void buildLogContents(CorrectionLogProcessorContext context) {
		
		SampleCorrectionLogParameter parameter = context.getParameter();
		
		for (val target : parameter.getTargets()) {
			
			for (val correctedItem : target.getCorrectedItems()) {
				
				val correction = this.newCorrection(
						target.getEmployeeId(),
						target.getDate(),
						CorrectionAttr.EDIT,
						correctedItem.toItemInfo(),
						correctedItem.getItemNo());
				
				context.addCorrection(correction);
			}
		}
	}

	private SampleCorrection newCorrection(
			String employeeId,
			GeneralDate targetDate,
			CorrectionAttr correctionAttr,
			ItemInfo correctedItem,
			int showOrder) {
		
		val targetUser = this.userInfoAdaptor.findByEmployeeId(employeeId);
		
		return new SampleCorrection(targetUser, targetDate, correctionAttr, correctedItem, showOrder);
	}
}
