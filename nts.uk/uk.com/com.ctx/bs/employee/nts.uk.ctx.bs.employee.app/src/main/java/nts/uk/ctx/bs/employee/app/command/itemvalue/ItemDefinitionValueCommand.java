package nts.uk.ctx.bs.employee.app.command.itemvalue;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ItemDefinitionValueCommand {
	// itemdefinition id mapped
	// with value
	private String itemDefId;
	
	// itemCode of item
	private String itemCode;
	
	// row index if item is multiple value
	private int row;
	
	// value input from control
	// in layout control
	private Object value;
}
