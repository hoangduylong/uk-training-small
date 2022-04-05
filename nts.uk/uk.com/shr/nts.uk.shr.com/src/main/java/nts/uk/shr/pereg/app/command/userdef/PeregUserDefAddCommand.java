package nts.uk.shr.pereg.app.command.userdef;

import nts.uk.shr.pereg.app.command.ItemsByCategory;

public class PeregUserDefAddCommand extends PeregUserDefCommand {
	
	public PeregUserDefAddCommand(String personId, String employeeId, String newRecordId, ItemsByCategory itemsByCategory) {
		super(
				personId,
				employeeId,
				itemsByCategory.getCategoryCd(),
				newRecordId,
				itemsByCategory.collectItemsDefinedByUser());
	}
}
