package nts.uk.ctx.sys.portal.ws.toppage;

import lombok.Data;

@Data
public class ChangeLayoutRequest {
	
	private String topPageCd;
	
	private int layoutType;

}
