package nts.uk.shr.com.security.audittrail.correction.processor.matrix;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.PersonInfoCorrectionLog;

public class MatrixCorrectionLogProcessorContext {
	@Getter
	private final String operationId;
	
	@Getter
	private final Object parameter;
	
	@Getter
	private final List<PersonInfoCorrectionLog> corrections;
	
	private MatrixCorrectionLogProcessorContext(String operationId, Object parameters) {
		this.operationId = operationId;
		this.parameter = parameters;
		this.corrections = new ArrayList<>();
	}
	
	public static MatrixCorrectionLogProcessorContext newContext(String operationId, Object parameter) {
		return new MatrixCorrectionLogProcessorContext(operationId, parameter);
	}
	
	@SuppressWarnings("unchecked")
	public <P> P getParameter() {
		return (P) this.parameter;
	}
	
	public void addCorrection(PersonInfoCorrectionLog correction) {
		this.corrections.add(correction);
	}
	
}