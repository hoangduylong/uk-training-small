package nts.uk.ctx.sys.log.app.command.pereg;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.gul.collection.CollectionUtil;
import nts.uk.shr.com.security.audittrail.basic.LogBasicInformation;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.CategoryCorrectionLog;
import nts.uk.shr.com.security.audittrail.correction.processor.CorrectionProcessorId;
import nts.uk.shr.com.security.audittrail.correction.processor.LogBasicInformationWriter;
import nts.uk.shr.com.security.audittrail.correction.processor.pereg.PeregCorrectionLogProcessor;
import nts.uk.shr.com.security.audittrail.correction.processor.pereg.PeregCorrectionLogProcessorContext;
import nts.uk.shr.com.security.audittrail.correction.processor.pereg.PeregCorrectionLogWriter;

@Stateless
public class PeregCorrectionLogProcessorExt extends PeregCorrectionLogProcessor {

	@Inject
	protected LogBasicInformationWriter basicInfoRepository;
	
	@Inject
	protected PeregCorrectionLogWriter correctionLogRepository;
	
	
	@Override
	public CorrectionProcessorId getId() {
		return CorrectionProcessorId.PEREG_REGISTER;
	}

	@Override
	protected void buildLogContents(PeregCorrectionLogProcessorContext context) {
		// xử lý PeregCorrectionLogParameter để chuyển thành domain
		// PersonInfoCorrectionLog ở đây		
		context.getParameters().entrySet().stream().filter(map -> {
			return map.getKey().startsWith("PERSON_");
		})
		.map(map -> (PersonCorrectionLogParameter)map.getValue())
		.map(map -> {			
			List<CategoryCorrectionLog> ctgLog = context.getParameters().entrySet().stream().filter(cat -> {
				return cat.getKey().startsWith("CATEGORY_");
			})
			.map(cat -> (PersonCategoryCorrectionLogParameter)cat.getValue())
			.map(cat ->  cat.toCategoryInfo()).collect(Collectors.toList());
			
			return map.toPersonInfoCorrection(context.getOperationId(), map.remark, ctgLog); 
		}).forEach(domain -> {
			context.addCorrection(domain);
		});
	}

	@Override
	public void processLoggingForBus(LogBasicInformation basicInfo, Object parameter) {
		
		@SuppressWarnings("unchecked")
		HashMap<String, Serializable> parameters = (HashMap<String, Serializable>) parameter;
		val context = PeregCorrectionLogProcessorContext.newContext(basicInfo.getOperationId(), parameters);
		
		this.buildLogContents(context);
		
		if (!CollectionUtil.isEmpty(context.getCorrections())) {
			this.basicInfoRepository.save(basicInfo);
			this.correctionLogRepository.save(context.getCorrections());
		}
		
	}
}
