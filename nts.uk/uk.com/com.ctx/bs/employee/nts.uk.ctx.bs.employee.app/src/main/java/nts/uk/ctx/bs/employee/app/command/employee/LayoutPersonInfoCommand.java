package nts.uk.ctx.bs.employee.app.command.employee;

import lombok.Data;

@Data
public class LayoutPersonInfoCommand {

	// categoryID
	private String categoryId;

	// categoryCode
	private String categoryCode;

	// itemDefID
	private String itemDefId;

	// for label text
	private String itemName;

	// for label constraint
	private String itemCode;

	// index of item in list (multiple, history)
	private Integer row;

	// value of item definition
	private Object value;

	// is required?
	// for render control label
	private boolean required;

}
