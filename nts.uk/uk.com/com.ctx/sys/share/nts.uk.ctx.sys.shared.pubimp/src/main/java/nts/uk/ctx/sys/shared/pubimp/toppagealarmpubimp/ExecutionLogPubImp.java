package nts.uk.ctx.sys.shared.pubimp.toppagealarmpubimp;

import java.util.UUID;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.shared.dom.toppagealarm.TopPageAlarmDetail;
import nts.uk.ctx.sys.shared.dom.toppagealarm.TopPageAlarmRepository;
import nts.uk.ctx.sys.shared.pub.toppagealarmpub.ExecutionLogErrorDetail;
import nts.uk.ctx.sys.shared.pub.toppagealarmpub.ExecutionLogImport;
import nts.uk.ctx.sys.shared.pub.toppagealarmpub.ExecutionLogPub;

@Stateless
public class ExecutionLogPubImp implements ExecutionLogPub{
	@Inject
	private TopPageAlarmRepository topPageAlarmRepository;
	
//	@Inject 
//	private TopPageAlarmSetRepository topPageAlarmSetRepository;
	
	@Override
	public void updateExecuteLog(ExecutionLogImport param) {
		if(param.getExistenceError() == 0){
			for(String item : param.getManagerId()){
				String executionLogId = UUID.randomUUID().toString();
				topPageAlarmRepository.insertTopPage(executionLogId, item, param.getExecutionContent(), param.getIsCancelled(), param.getExistenceError());
			}
		}else{
			int countUp = 1;
			for(String item : param.getManagerId()){
				String executionLogId = UUID.randomUUID().toString();
				topPageAlarmRepository.insertTopPage(executionLogId, item, param.getExecutionContent(), param.getIsCancelled(), param.getExistenceError());
				for(ExecutionLogErrorDetail obj: param.getTargerEmployee()){
					TopPageAlarmDetail domainInsert = TopPageAlarmDetail.createFromJavaType(executionLogId, countUp, obj.getErrorMessage(), obj.getTargerEmployee());
					topPageAlarmRepository.insertDetail(domainInsert);
					countUp = countUp + 1;
				}
			}
		}
	}
}
