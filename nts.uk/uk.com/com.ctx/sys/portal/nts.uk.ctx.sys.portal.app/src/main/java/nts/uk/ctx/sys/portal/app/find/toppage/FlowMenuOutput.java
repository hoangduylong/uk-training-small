package nts.uk.ctx.sys.portal.app.find.toppage;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FlowMenuOutput {
	
	private String flowCode;
	
	private String flowName;
	
	private String fileId;

}
