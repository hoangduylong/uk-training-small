package nts.uk.ctx.sys.log.app.find.reference.record;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * 
 * @author Thuongtv
 *
 */

@Getter
@Setter
@AllArgsConstructor
public class LogDataCorrectCsvDto {

	private String operationId;
	private String targetDate;
	private int targetDataType;
	private String itemName;
	private String valueBefore;
	private String valueAfter;
	private String remarks;
	private String correctionAttr;
}
