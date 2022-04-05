package nts.uk.ctx.sys.log.app.find.reference.record;

import java.util.List;

import lombok.Value;
import nts.uk.ctx.sys.log.app.find.reference.LogOutputItemDto;

@Value
public class LogScreenIParam {
	
	private LogParams logParams;
	
	private ParamOutputItem paramOutputItem;

	private List<LogOutputItemDto> lstHeaderDto;
	
	//CLI003: fix bug #108873, #108865
	private List<LogOutputItemDto> lstSubHeaderDto;
}
