package command.person.contact;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class DeletePerContactCommand{
	//個人ID
	@PeregRecordId
	private String personId;
}
