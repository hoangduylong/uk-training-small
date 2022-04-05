package nts.uk.shr.com.security.audittrail.correction.processor.pereg;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import lombok.Getter;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.PersonInfoCorrectionLog;

public class PeregCorrectionLogProcessorContext {

	@Getter
	private final String operationId;
	
	@Getter
	private final HashMap<String, Serializable> parameters;
	
	@Getter
	private final List<PersonInfoCorrectionLog> corrections;

	private PeregCorrectionLogProcessorContext(String operationId, HashMap<String, Serializable> parameters) {
		this.operationId = operationId;
		this.parameters = parameters;
		this.corrections = new ArrayList<>();
	}
	
	public static PeregCorrectionLogProcessorContext newContext(String operationId, HashMap<String, Serializable> parameters) {
		return new PeregCorrectionLogProcessorContext(operationId, parameters);
	}
	
	@SuppressWarnings("unchecked")
	public <P> P getParameter(String key) {
		return (P) this.parameters.get(key);
	}
	
	public void addCorrection(PersonInfoCorrectionLog correction) {
		this.corrections.add(correction);
	}
}
