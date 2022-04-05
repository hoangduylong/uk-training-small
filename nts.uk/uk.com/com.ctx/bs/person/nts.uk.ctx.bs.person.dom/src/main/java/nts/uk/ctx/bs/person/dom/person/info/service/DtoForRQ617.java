package nts.uk.ctx.bs.person.dom.person.info.service;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class DtoForRQ617 {

	/** The person id - 個人ID */
	private String personId;
	
	/** ビジネスネーム -BusinessName */
	private String businessName;
	
	/** ビジネスネームカナ  - BusinessName Kana */
	private String businessNameKana;
}
