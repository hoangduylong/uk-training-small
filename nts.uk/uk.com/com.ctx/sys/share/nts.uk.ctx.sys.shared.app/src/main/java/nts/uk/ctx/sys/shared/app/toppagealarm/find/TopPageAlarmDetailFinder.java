package nts.uk.ctx.sys.shared.app.toppagealarm.find;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.employee.pub.person.IPersonInfoPub;
import nts.uk.ctx.bs.employee.pub.person.PersonInfoExport;
import nts.uk.ctx.sys.shared.dom.toppagealarm.TopPageAlarmDetail;
import nts.uk.ctx.sys.shared.dom.toppagealarm.TopPageAlarmRepository;

@Stateless
public class TopPageAlarmDetailFinder {
	@Inject
	private TopPageAlarmRepository toppageRep;
	
	@Inject
	private IPersonInfoPub perPub;
	
	public List<TopPageAlarmDetailDto> findDetail(ParamKtg031 param){
		List<TopPageAlarmDetailDto> listDto = new ArrayList<>();
		List<TopPageAlarmDetail> listDomain = toppageRep.findDetail(param.getExecutionLogId());
		for(TopPageAlarmDetail obj: listDomain){
			// get information from request list no1
			PersonInfoExport requestNo1 = perPub.getPersonInfo(obj.getTargerEmployee());
			if(requestNo1 != null){
				TopPageAlarmDetailDto dto = new TopPageAlarmDetailDto(requestNo1.getEmployeeCode(), 
																		obj.getSerialNo().v(), requestNo1.getBusinessName(), 
																		obj.getErrorMessage().v(), param.getProcessingName());
				listDto.add(dto);
			}else{
				TopPageAlarmDetailDto dto = new TopPageAlarmDetailDto("", obj.getSerialNo().v(), "", obj.getErrorMessage().v(), param.getProcessingName());
				listDto.add(dto);
			}
		}
		return listDto;
	}
}
