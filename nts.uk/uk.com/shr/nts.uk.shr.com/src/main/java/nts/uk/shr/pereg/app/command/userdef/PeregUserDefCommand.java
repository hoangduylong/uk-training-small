package nts.uk.shr.pereg.app.command.userdef;

import java.util.List;

import lombok.Getter;
import nts.uk.shr.pereg.app.ItemValue;

@Getter
public abstract class PeregUserDefCommand {
	
	private final String personId;
	
	private final String employeeId;

	/** category code */
	private final String categoryCd;
	
	/** Record Id, but this is null when new record */
	private final String recordId;
	
	/** input items */
	private final List<ItemValue> items;
	
	public PeregUserDefCommand(String personId, String employeeId, String categoryCd, String recordId, List<ItemValue> items) {
		this.personId = personId;
		this.employeeId = employeeId;
		this.categoryCd = categoryCd;
		this.recordId = recordId;
		this.items = items;
	}
}
