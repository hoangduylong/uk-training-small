package nts.uk.ctx.bs.employee.pubimp.contact;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.ejb.Stateless;
import javax.inject.Inject;
import nts.uk.ctx.bs.employee.app.command.employee.data.management.EmployeeContactDto;
import nts.uk.ctx.bs.employee.dom.employee.data.management.contact.EmployeeContact;
import nts.uk.ctx.bs.employee.dom.employee.data.management.contact.EmployeeContactRepository;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfoRepository;
import nts.uk.ctx.bs.employee.pub.contact.EmployeeContactObject;
import nts.uk.ctx.bs.employee.pub.contact.EmployeeContactPub;
import nts.uk.ctx.bs.employee.pub.contact.PersonContactObjectOfEmployee;
import nts.uk.ctx.bs.person.dom.person.personal.contact.PersonalContact;
import nts.uk.ctx.bs.person.dom.person.personal.contact.PersonalContactRepository;

@Stateless
public class EmployeeContactPubImpl implements EmployeeContactPub {

	@Inject
	private EmployeeContactRepository empContactRepo;
	
	@Inject
	private EmployeeDataMngInfoRepository empDataMngInfoRepo;
	
	@Inject
	private PersonalContactRepository personalContactRepository;

	@Override
	public List<EmployeeContactObject> getList(List<String> employeeIds) {
		return empContactRepo.getByEmployeeIds(employeeIds).stream()
		.map(item -> convert(item))
		.collect(Collectors.toList());
	}

	private EmployeeContactObject convert(EmployeeContact item) {
		return new EmployeeContactObject(
				item.getEmployeeId(),
				item.getMailAddress().map(m -> m.v()).orElse(null),
				item.getSeatDialIn().map(m -> m.v()).orElse(null),
				item.getSeatExtensionNumber().map(m -> m.v()).orElse(null),
				item.getMobileMailAddress().map(m -> m.v()).orElse(null),
				item.getCellPhoneNumber().map(m -> m.v()).orElse(null)
				);
	}

	@Override
	public void register(String employeeId, String mailAddress, String phoneMailAddress, String cellPhoneNo) {
		
		Optional<EmployeeContact> existContact = empContactRepo.getByEmployeeId(employeeId);
		EmployeeContactDto dto = EmployeeContactDto.builder()
				.employeeId(employeeId)
				.mailAddress(mailAddress)
				.mobileMailAddress(phoneMailAddress)
				.cellPhoneNumber(cellPhoneNo)
				.build();

		EmployeeContact domain = EmployeeContact.createFromMemento(dto);
		if (existContact.isPresent()) {
			empContactRepo.update(domain);
		} else {
			empContactRepo.insert(domain);
		}
	}

	@Override
	public List<PersonContactObjectOfEmployee> getListOfEmployees(List<String> employeeIds) {
		Map<String, String> employeeIdPersonIdMap = empDataMngInfoRepo.findByListEmployeeId(employeeIds).stream()
				.collect(Collectors.toMap(x -> x.getEmployeeId(), x -> x.getPersonId()));

		Map<String, PersonalContact> personContacts = personalContactRepository.getByPersonalIds(employeeIdPersonIdMap.values()
				.stream().collect(Collectors.toList())).stream()
				.collect(Collectors.toMap(p -> p.getPersonalId(), p -> p));
		
		List<PersonContactObjectOfEmployee> resultList = new ArrayList<>();
		employeeIdPersonIdMap.forEach((empId, perId) -> {
			PersonalContact personalContact = personContacts.get(perId);
			if(personalContact != null) {
				PersonContactObjectOfEmployee personContactOfEmp = convert(empId, personalContact);
				resultList.add(personContactOfEmp);
			}
		});
		return resultList;
	}
	
	private PersonContactObjectOfEmployee convert(String employeeId, PersonalContact p) {
		return PersonContactObjectOfEmployee.builder()
				.employeeId(employeeId)
				.personId(p.getPersonalId())
				.cellPhoneNumber(p.getPhoneNumber().map(m -> m.v()).orElse(null))
				.mailAdress(p.getMailAddress().map(m -> m.v()).orElse(null))
				.mobileMailAdress(p.getMobileEmailAddress().map(m -> m.v()).orElse(null))
				.memo1(p.getEmergencyContact1().map(item -> item.getRemark().v()).orElse(null))
				.contactName1(p.getEmergencyContact1().map(item -> item.getContactName().v()).orElse(null))
				.phoneNumber1(p.getEmergencyContact1().map(item -> item.getPhoneNumber().v()).orElse(null))
				.memo2(p.getEmergencyContact2().map(item -> item.getRemark().v()).orElse(null))
				.contactName2(p.getEmergencyContact2().map(item -> item.getContactName().v()).orElse(null))
				.phoneNumber2(p.getEmergencyContact2().map(item -> item.getPhoneNumber().v()).orElse(null))
				.build();
	}
	
	@Override
	public EmployeeContactObject get(String employeeId) {
		Optional<EmployeeContact> employeeContactOpt = this.empContactRepo.getByEmployeeId(employeeId);
		EmployeeContactObject employeeContactObject = null;
		if (employeeContactOpt.isPresent()) {
			employeeContactObject = this.convert(employeeContactOpt.get());
		}
		return employeeContactObject;
	}

}
