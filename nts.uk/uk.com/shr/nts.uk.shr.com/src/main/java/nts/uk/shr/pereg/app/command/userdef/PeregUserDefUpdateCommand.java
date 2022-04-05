package nts.uk.shr.pereg.app.command.userdef;

import nts.uk.shr.pereg.app.command.ItemsByCategory;

public class PeregUserDefUpdateCommand extends PeregUserDefCommand {
	
	public PeregUserDefUpdateCommand(String personId, String employeeId, ItemsByCategory itemsByCategory) {
		super(personId, employeeId, itemsByCategory.getCategoryCd(), itemsByCategory.getRecordId(), itemsByCategory.collectItemsDefinedByUser());
	}
}
