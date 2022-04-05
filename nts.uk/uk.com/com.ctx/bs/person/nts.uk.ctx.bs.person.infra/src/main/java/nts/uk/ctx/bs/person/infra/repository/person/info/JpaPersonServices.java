/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.person.infra.repository.person.info;

import java.util.List;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.bs.person.dom.person.info.service.DtoForRQ617;
import nts.uk.ctx.bs.person.dom.person.info.service.PersonService;
import nts.uk.ctx.bs.person.infra.entity.person.info.BpsmtPerson;

/**
 * The Class JpaPersonRepository.
 */
@Stateless
public class JpaPersonServices extends JpaRepository implements PersonService {

	public static final String GET_FROM_KEYWORDS = "SELECT c FROM BpsmtPerson c "
			+ "WHERE c.businessName LIKE CONCAT(:keyWords, '%') "
			+ "OR c.businessNameKana LIKE CONCAT(:keyWords, '%') ";
	
	@Override
	public List<DtoForRQ617> getFromKeywords(String keyWords) {
		return this.queryProxy().query(GET_FROM_KEYWORDS, BpsmtPerson.class)
				.setParameter("keyWords", keyWords)
				.getList(c -> new DtoForRQ617(c.bpsmtPersonPk.pId, c.businessName, c.businessNameKana));
	}
	
	public static final String GET_FROM_KEYWORDS_FIX = "SELECT c FROM BpsmtPerson c, BsymtEmployeeDataMngInfo e "
			+ "WHERE e.companyId = :companyId "
			+ "AND (c.businessName LIKE CONCAT(:keyWords, '%') "
			+ "OR c.businessNameKana LIKE CONCAT(:keyWords, '%')) "
			+ "AND e.bsymtEmployeeDataMngInfoPk.pId = c.bpsmtPersonPk.pId ";
	
	@Override
	public List<DtoForRQ617> getFromKeywords(String keyWords, String cId) {
		return this.queryProxy().query(GET_FROM_KEYWORDS_FIX, BpsmtPerson.class)
				.setParameter("companyId", cId)
				.setParameter("keyWords", keyWords)
				.getList(c -> new DtoForRQ617(c.bpsmtPersonPk.pId, c.businessName, c.businessNameKana));
	}
}
