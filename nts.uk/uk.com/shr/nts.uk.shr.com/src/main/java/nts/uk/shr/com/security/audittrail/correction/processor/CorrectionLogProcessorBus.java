package nts.uk.shr.com.security.audittrail.correction.processor;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.spi.CDI;

import lombok.val;
import lombok.extern.slf4j.Slf4j;
import nts.uk.shr.com.security.audittrail.AuditTrailTransaction;
import nts.uk.shr.com.security.audittrail.basic.LogBasicInformation;
import nts.uk.shr.com.security.audittrail.correction.DataCorrectionContext;
import nts.uk.shr.com.security.audittrail.correction.processor.matrix.MatrixCorrectionLogProcessor;
import nts.uk.shr.com.security.audittrail.correction.processor.pereg.PeregCorrectionLogProcessor;
import nts.uk.shr.com.system.config.InitializeWhenDeploy;

@ApplicationScoped
@Slf4j
public class CorrectionLogProcessorBus implements AuditTrailTransaction, InitializeWhenDeploy {
	
	private Map<CorrectionProcessorId, Class<? extends CorrectionLogProcessor<?>>> processorsMap;

	public void initialize() {
		log.info("[INIT START] " + this.getClass().getName());
		
		this.processorsMap = new HashMap<>();
		
		CDI.current().select(DataCorrectionLogProcessor.class).forEach(processorProxy -> {
			this.addProcessorToMap(processorProxy);
		});
		
		CDI.current().select(PeregCorrectionLogProcessor.class).forEach(processorProxy -> {
			this.addProcessorToMap(processorProxy);
		});
		
		CDI.current().select(MatrixCorrectionLogProcessor.class).forEach(processorProxy -> {
			this.addProcessorToMap(processorProxy);
		});
		log.info("[INIT END] " + this.getClass().getName());
	}

	private void addProcessorToMap(CorrectionLogProcessor<?> processorProxy) {
		@SuppressWarnings("unchecked")
		Class<? extends CorrectionLogProcessor<?>> processorClass
				= (Class<? extends CorrectionLogProcessor<?>>) processorProxy.getClass().getSuperclass();
		
		log.info("Found processor: " + processorClass);
		
		if (this.processorsMap.containsKey(processorProxy.getId())) {
			throw new RuntimeException(
					"Duplicated processor: " + this.processorsMap.get(processorProxy.getId()).getName());
		}
		
		this.processorsMap.put(processorProxy.getId(), processorClass);
	}

	@Override
	public void begin(LogBasicInformation basicInfo, CorrectionProcessorId processorId, HashMap<String, Serializable> parameters) {
		
		val processorClass = this.processorsMap.get(processorId);
		
		if (processorClass == null) {
			throw new RuntimeException("Unknown processor: " + processorId);
		}

		Object parameterForProcessor = parameters.get(DataCorrectionContext.DEFAULT_PARAMETER_KEY);
		if (parameterForProcessor == null) {
			parameterForProcessor = parameters;
		}

		val processor = CDI.current().select(processorClass).get();
		processor.processLoggingForBus(basicInfo, parameterForProcessor);
	}

}
