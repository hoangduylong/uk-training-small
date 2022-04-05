package command.person.personal;

import lombok.Data;
import nts.arc.time.GeneralDate;

/**
 * Command 個人の記念日を閲覧する
 * @author DungDV
 *
 */
@Data
public class BrowsePersonalAnniversarieCommand {
	
	/**
	 * 個人ID
	 */
	private String personalId;
	
	/**
	 * 記念日
	 */
	private String anniversary;
	
	/**
	 * 基準日
	 */
	private GeneralDate referDate;
}
