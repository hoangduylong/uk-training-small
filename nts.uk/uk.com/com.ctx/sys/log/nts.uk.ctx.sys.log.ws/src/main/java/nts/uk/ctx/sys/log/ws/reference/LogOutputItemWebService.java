package nts.uk.ctx.sys.log.ws.reference;


import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.log.app.find.reference.LogOuputItemFinder;
import nts.uk.ctx.sys.log.app.find.reference.LogOutputItemDto;
import nts.uk.ctx.sys.log.app.find.reference.record.ParamOutputItem;

/*
 * author: thuong.tv
 */

@Path("ctx/sys/log/app")
@Produces("application/json")
public class LogOutputItemWebService extends WebService {
	
	@Inject
	private LogOuputItemFinder logOuputItemFinder;
	
	@POST
	@Path("get-log-output-item-by-record-type")
	public List<LogOutputItemDto> getLogOutputItemByRecordType(String recordType){
		List<LogOutputItemDto> logOutputItemDtos = this.logOuputItemFinder.getLogOutputItemByRecordType(recordType);
		return logOutputItemDtos;
	}
	
	@POST
	@Path("get-log-output-item-by-record-type-item-no-list")
	public List<LogOutputItemDto> getLogOutputItemByRecordTypeItemNos(ParamOutputItem paramOutputItem){
		List<LogOutputItemDto> logOutputItemDtos = this.logOuputItemFinder.getLogOutputItemByItemNosAndRecordType(paramOutputItem.getItemNos(), paramOutputItem.getRecordType());
		return logOutputItemDtos;
	}
	
	@POST
	@Path("get-log-output-item-by-record-type-item-no-list-all")
	public List<LogOutputItemDto> getLogOutputItemByRecordTypeItemNosAll(ParamOutputItem paramOutputItem){
		List<LogOutputItemDto> logOutputItemDtos = this.logOuputItemFinder.getLogOutputItemByItemNosAndRecordTypeAll
				(paramOutputItem.getItemNos(), paramOutputItem.getRecordType());
		return logOutputItemDtos;
	}
	
	
}
