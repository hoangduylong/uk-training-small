package nts.uk.ctx.sys.log.app.find.reference.record;

import java.util.List;

import lombok.Getter;

@Getter
public class LogDataExportCsv {
	
	private LogParams logParams;
	
	private List<String> lstHeaderDto;
	
	private List<String> lstSubHeaderDto;
	
	private List<String> lstSelectedItemHeader;
}
