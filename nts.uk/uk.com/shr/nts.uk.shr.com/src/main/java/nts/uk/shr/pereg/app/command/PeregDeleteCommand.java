package nts.uk.shr.pereg.app.command;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.shr.pereg.app.ItemValue;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PeregDeleteCommand {
	private String personId;
	private String employeeId;
	private String categoryId;
	private int categoryType;
	private String categoryCode;
	private String categoryName;
	private String recordId;
	// add for log delete
	private List<ItemValue> inputs;
}
