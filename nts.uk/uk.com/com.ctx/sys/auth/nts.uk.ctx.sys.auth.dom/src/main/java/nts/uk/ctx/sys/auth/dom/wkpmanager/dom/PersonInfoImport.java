package nts.uk.ctx.sys.auth.dom.wkpmanager.dom;

import lombok.Builder;
import lombok.Data;
import nts.arc.time.GeneralDate;
@Data
@Builder
public class PersonInfoImport {
	/** The p id. */
	// 個人ID
	private String personId;
	
	/** The p name. */
	// 個人名
	private String personName;
	
	/** The birth day. */
	// 生年月日
	private GeneralDate birthDay;
	
	/** The p mail addr. */
	// 個人メールアドレス
	private String pMailAddr;
	
	/** The p mail addr. */
	// 個人メールアドレス
	private int gender;

	public PersonInfoImport(String personId, String personName, GeneralDate birthDay, String pMailAddr, int gender) {
		super();
		this.personId = personId;
		this.personName = personName;
		this.birthDay = birthDay;
		this.pMailAddr = pMailAddr;
		this.gender = gender;
	}
	
}
