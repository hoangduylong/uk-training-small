/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.adapter.person;

import lombok.Builder;
import lombok.Data;
import nts.arc.time.GeneralDate;

/**
 * The Class PersonImport.
 */
// 個人
// Imported Class for RequestList #86
@Data
@Builder
public class PersonImport {

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

	public PersonImport(String personId, String personName, GeneralDate birthDay, String pMailAddr, int gender) {
		super();
		this.personId = personId;
		this.personName = personName;
		this.birthDay = birthDay;
		this.pMailAddr = pMailAddr;
		this.gender = gender;
	}
	


	
	
	
}
