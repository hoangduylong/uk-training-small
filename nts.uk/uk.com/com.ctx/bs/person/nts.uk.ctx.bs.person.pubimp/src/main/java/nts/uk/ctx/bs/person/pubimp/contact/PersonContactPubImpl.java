package nts.uk.ctx.bs.person.pubimp.contact;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import command.person.personal.contact.PersonalContactDto;
import nts.uk.ctx.bs.person.dom.person.personal.contact.EmergencyContact;
import nts.uk.ctx.bs.person.dom.person.personal.contact.PersonalContact;
import nts.uk.ctx.bs.person.dom.person.personal.contact.PersonalContactRepository;
import nts.uk.ctx.bs.person.pub.contact.OtherContact;
import nts.uk.ctx.bs.person.pub.contact.PersonContactObject;
import nts.uk.ctx.bs.person.pub.contact.PersonContactPub;

@Stateless
public class PersonContactPubImpl implements PersonContactPub {

	@Inject
	private PersonalContactRepository personalContactRepository;

	@Override
	public List<PersonContactObject> getList(List<String> personIds) {
		List<PersonalContact> personContactList = personalContactRepository.getByPersonalIds(personIds);
		return personContactList.stream().map(p -> convertToDto(p)).collect(Collectors.toList());
	}

	private PersonContactObject convertToDto(PersonalContact p) {

		PersonContactObject pcObject = new PersonContactObject();
		pcObject.setPersonId(p.getPersonalId());
		pcObject.setCellPhoneNumber(p.getPhoneNumber().isPresent() ? p.getPhoneNumber().get().v() : null);
		pcObject.setMailAdress(p.getMailAddress().isPresent() ? p.getMailAddress().get().v() : null);
		pcObject.setMobileMailAdress(p.getMobileEmailAddress().isPresent() ? p.getMobileEmailAddress().get().v() : null);

		Optional<EmergencyContact> emerContact1 = p.getEmergencyContact1();
		pcObject.setMemo1(emerContact1.map(item -> item.getRemark().v()).orElse(null));
		pcObject.setContactName1(emerContact1.map(item -> item.getContactName().v()).orElse(null));
		pcObject.setPhoneNumber1(emerContact1.map(item -> item.getPhoneNumber().v()).orElse(null));
		
		Optional<EmergencyContact> emerContact2 = p.getEmergencyContact2();
		pcObject.setMemo2(emerContact2.map(item -> item.getRemark().v()).orElse(null));
		pcObject.setContactName2(emerContact2.map(item -> item.getContactName().v()).orElse(null));
		pcObject.setPhoneNumber2(emerContact2.map(item -> item.getPhoneNumber().v()).orElse(null));
		
		List<OtherContact> otherContacts = p.getOtherContacts().stream()
				.map(x -> OtherContact.builder()
					.no(x.getOtherContactNo())
					.address(x.getAddress().v())
					.build())
				.collect(Collectors.toList());
		pcObject.setOtherContacts(otherContacts);
		return pcObject;
	}

	@Override
	public void register(String personId, String cellPhoneNumber, String mailAddress, String mobileMailAdress) {
		Optional<PersonalContact> personContactOpt = personalContactRepository.getByPersonalId(personId);
		PersonalContactDto dto = PersonalContactDto.builder()
				.personalId(personId)
				.phoneNumber(cellPhoneNumber)
				.mailAddress(mailAddress)
				.mobileEmailAddress(mobileMailAdress)
				.build();
		PersonalContact domain = PersonalContact.createFromMemento(dto);
		if (personContactOpt.isPresent()) {
			personalContactRepository.update(domain);
		} else {
			personalContactRepository.insert(domain);
		}
	}
	
	@Override
	public PersonContactObject getPersonalContact(String personId) {
		Optional<PersonalContact> personContactOpt = personalContactRepository.getByPersonalId(personId);
		if (personContactOpt.isPresent()) {
			return this.convertToDto(personContactOpt.get());
		}
		return null;
	}

}
