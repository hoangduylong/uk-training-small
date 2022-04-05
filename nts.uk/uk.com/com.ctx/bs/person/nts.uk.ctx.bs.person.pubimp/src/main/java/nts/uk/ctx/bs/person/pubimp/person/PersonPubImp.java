/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.person.pubimp.person;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.person.dom.person.info.Person;
import nts.uk.ctx.bs.person.dom.person.info.PersonRepository;
import nts.uk.ctx.bs.person.dom.person.info.personnamegroup.PersonNameGroup;
import nts.uk.ctx.bs.person.pub.person.FullNameSetExport;
import nts.uk.ctx.bs.person.pub.person.FullPersonInfoExport;
import nts.uk.ctx.bs.person.pub.person.PersonInfoExport;
import nts.uk.ctx.bs.person.pub.person.PersonNameGroupExport;
import nts.uk.ctx.bs.person.pub.person.PersonExport;
import nts.uk.ctx.bs.person.pub.person.PersonPub;
import nts.uk.ctx.bs.person.pub.person.PubPersonDto;

/**
 * The Class PersonPubImp.
 */
@Stateless
public class PersonPubImp implements PersonPub {

	/** The person repository. */
	@Inject
	private PersonRepository personRepository;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.bs.person.pub.person.PersonPub#findByPersonIds(java.util.List)
	 */
	@Override
	public List<PubPersonDto> findByPersonIds(List<String> personIds) {
		return personRepository.getPersonByPersonIds(personIds).stream()
				.map(item -> new PubPersonDto(item.getPersonId(),
						item.getPersonNameGroup().getPersonName().getFullName().v(),
						item.getPersonNameGroup().getBusinessName().v()))
				.collect(Collectors.toList());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.person.pub.person.PersonPub#findById(java.lang.String)
	 * 
	 * @Override public PersonInfoExport findById(String personId) { Person person =
	 * this.personRepository.getByPersonId(personId).get(); PersonInfoExport
	 * personInfo = PersonInfoExport.builder() .personId(person.getPersonId())
	 * .personName(person.getPersonNameGroup().getPersonName().v())
	 * .birthDay(person.getBirthDate()) .pMailAddr(new
	 * MailAddress(person.getMailAddress().v())) .build();
	 * 
	 * return personInfo; }
	 */

	@Override
	public List<PersonInfoExport> findByListId(List<String> personIds) {
		return personRepository.getPersonByPersonIds(personIds).stream()
				.map(item -> new PersonInfoExport(
						item.getPersonId(),
						item.getPersonNameGroup().getBusinessName() == null ? "" : item.getPersonNameGroup().getBusinessName().v(),
						item.getBirthDate(), 
						null,
						item.getGender() == null ? 0 : item.getGender().value))
				.collect(Collectors.toList());
	}

	@Override
	public List<PersonExport> findByPids(List<String> personIds) {
		//アルゴリズム「個人を取得する」を実行する
		return personRepository.getAllPersonByPids(personIds).stream().map(c -> {

			PersonNameGroup group = c.getPersonNameGroup();
			
			if (group != null) {
				
				FullNameSetExport  personName = new FullNameSetExport(
										group.getPersonName() == null ? null : group.getPersonName().getFullName().v(),
										group.getPersonName() == null ? null : group.getPersonName().getFullNameKana().v());
				FullNameSetExport  personalNameMultilingual = new FullNameSetExport(
										group.getPersonalNameMultilingual() == null ? null
												: group.getPersonalNameMultilingual().getFullName().v(),
										group.getPersonalNameMultilingual() == null ? null
												: group.getPersonalNameMultilingual().getFullNameKana().v());
				FullNameSetExport  personRomanji = new FullNameSetExport(
										group.getPersonRomanji() == null ? null : group.getPersonRomanji().getFullName().v(),
										group.getPersonRomanji() == null ? null
												: group.getPersonRomanji().getFullNameKana().v());
				FullNameSetExport  todokedeFullName = new FullNameSetExport(
										group.getTodokedeFullName() == null ? null
												: group.getTodokedeFullName().getFullName().v(),
										group.getTodokedeFullName() == null ? null
												: group.getTodokedeFullName().getFullNameKana().v());
				FullNameSetExport  oldName = new FullNameSetExport(group.getOldName() == null ? null : group.getOldName().getFullName().v(),
										group.getOldName() == null ? null : group.getOldName().getFullNameKana().v());
				
				PersonNameGroupExport groupExport = new PersonNameGroupExport(group.getBusinessName().v(),
																			group.getBusinessNameKana().v(), 
																			group.getBusinessOtherName().v(),
																			group.getBusinessEnglishName().v(),
																			personName,
																			personalNameMultilingual,
																			personRomanji,
																			todokedeFullName,
																			oldName);
				
				return new PersonExport(c.getBirthDate(), c.getGender() == null ? 1 : c.getGender().value,
						c.getPersonId(), groupExport);
			}
			
			return new PersonExport(c.getBirthDate(), c.getGender() == null ? 1 : c.getGender().value,
					c.getPersonId(), null);
			
		}).collect(Collectors.toList());

	}

}
