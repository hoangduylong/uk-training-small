/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.person.dom.person.info.service;

import java.util.List;

/**
 * The Interface PersonRepository.
 */
public interface PersonService {
	
	/**
	 * sub query for 617
	 * [RQ617]キーワードから個人を取得する
	 */
	List<DtoForRQ617> getFromKeywords(String keyWords);
	
	/**
	 * sub query for 617
	 * [RQ617]キーワードから個人を取得する
	 * fix performance
	 */
	List<DtoForRQ617> getFromKeywords(String keyWords, String cId);
}
