package nts.uk.ctx.sys.log.app.find.datacorrectionlog;

import java.util.List;

import lombok.Value;
import nts.arc.time.GeneralDate;

@Value
public class DataCorrectionLogParams {
	
	private int functionId;
	private List<String> listEmployeeId;
	private GeneralDate startYmd;
	private GeneralDate endYmd;
	private Integer startYm;
	private Integer endYm;
	private Integer startY;
	private Integer endY;
	private int displayFormat; //0: by date; 1: by individual
	private String pgid;

}
