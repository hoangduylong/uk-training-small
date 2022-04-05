package nts.uk.ctx.sys.portal.app.find.toppagesetting;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FlowMenuOutputCCG008 {	
	//	フローコード
	private String flowCode;
	
	//	フロー名称
	private String flowName;
	
	//	ファイルID
	private String fileId;
	
	private Boolean isFlowmenu;
}
