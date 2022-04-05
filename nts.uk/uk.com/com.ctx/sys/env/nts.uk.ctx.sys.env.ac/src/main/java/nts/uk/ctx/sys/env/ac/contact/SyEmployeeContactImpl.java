package nts.uk.ctx.sys.env.ac.contact;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.employee.pub.contact.EmployeeContactPub;
import nts.uk.ctx.sys.env.dom.contact.EmployeeContactAdapter;
import nts.uk.ctx.sys.env.dom.contact.EmployeeContactObjectImport;
import nts.uk.ctx.sys.env.dom.contact.PersonContactObjectOfEmployeeImport;

@Stateless
public class SyEmployeeContactImpl implements EmployeeContactAdapter {

	@Inject
	private EmployeeContactPub employeeContactPub;

	@Override
	public List<EmployeeContactObjectImport> getList(List<String> sIds) {
		return employeeContactPub.getList(sIds).stream()
				.map(x -> new EmployeeContactObjectImport(
						x.getSid(), 
						x.getMailAddress(),
						x.getSeatDialIn(),
						x.getSeatExtensionNo(),
						x.getPhoneMailAddress(), 
						x.getCellPhoneNo()
						))
				.collect(Collectors.toList());
	}

	@Override
	public List<PersonContactObjectOfEmployeeImport> getListOfEmployees(List<String> employeeIds) {
		return employeeContactPub.getListOfEmployees(employeeIds).stream()
				.map(x -> new PersonContactObjectOfEmployeeImport(
						x.getEmployeeId(), 
						x.getPersonId(), 
						x.getCellPhoneNumber(), 
						x.getMailAdress(),
						x.getMobileMailAdress(), 
						x.getMemo1(), 
						x.getContactName1(), 
						x.getPhoneNumber1(), 
						x.getMemo2(), 
						x.getContactName2(),
						x.getPhoneNumber2()
						))
				.collect(Collectors.toList());
	}

}
