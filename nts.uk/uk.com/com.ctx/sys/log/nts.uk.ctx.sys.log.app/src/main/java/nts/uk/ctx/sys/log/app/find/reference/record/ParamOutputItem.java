package nts.uk.ctx.sys.log.app.find.reference.record;

/**
 * author : thuongtv
 */
import java.util.List;

import lombok.Value;

@Value
public class ParamOutputItem {

	private int recordType; // 0: logLogin; 1: Log startup; 3 : Log data update
							// persion ; 6: log data correct
	private List<String> itemNos;

}
