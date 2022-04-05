package nts.uk.ctx.sys.auth.ac.personinfor;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.uk.ctx.bs.employee.pub.person.IPersonInfoPub;
import nts.uk.ctx.bs.person.pub.person.PersonInfoExport;
import nts.uk.ctx.bs.person.pub.person.PersonPub;
import nts.uk.ctx.sys.auth.dom.adapter.person.EmployeeBasicInforAuthImport;
import nts.uk.ctx.sys.auth.dom.adapter.person.PersonAdapter;
import nts.uk.ctx.sys.auth.dom.adapter.person.PersonImport;
@Stateless
public class AuthPersonInforImpl implements PersonAdapter{

	@Inject
	private PersonPub personPub;
	
	@Inject
	private IPersonInfoPub iPersonInfoPub;
	
	
	
	private PersonImport toImport(PersonInfoExport ex){
		return new PersonImport(ex.getPersonId(), ex.getPersonName(), ex.getBirthDay(), ex.getPMailAddr(), ex.getGender());
	}
	@Override
	public List<PersonImport> findByPersonIds(List<String> personIds) {
		List<PersonImport> data =personPub.findByListId(personIds).stream().map(c -> this.toImport(c)).collect(Collectors.toList());
		
		return data;
	}
	private EmployeeBasicInforAuthImport toImport(nts.uk.ctx.bs.employee.pub.person.PersonInfoExport ex){
		return new EmployeeBasicInforAuthImport(ex.getPid(), ex.getBusinessName(), ex.getEntryDate(), ex.getGender(), ex.getBirthDay(), ex.getEmployeeId() , ex.getEmployeeCode() , ex.getRetiredDate());
		
	}
	@Override
	public List<EmployeeBasicInforAuthImport> listPersonInfor(List<String> listSID) {
		List<EmployeeBasicInforAuthImport> data = iPersonInfoPub.listPersonInfor(listSID).stream().map(c -> this.toImport(c)).collect(Collectors.toList());
		return data;
	}
	
	private EmployeeBasicInforAuthImport importEmpInfo(nts.uk.ctx.bs.employee.pub.person.PersonInfoExport ex){
		return new EmployeeBasicInforAuthImport(
				ex.getPid(),
				ex.getBusinessName(),
				ex.getEntryDate(),
				ex.getGender(),
				ex.getBirthDay(),
				ex.getEmployeeId(),
				ex.getEmployeeCode(),
				ex.getRetiredDate());
	}
	@Override
	public Optional<EmployeeBasicInforAuthImport> getPersonInfor(String employeeID) {
		// Lấy RequestList No.1
		val exportData = iPersonInfoPub.getPersonInfo(employeeID);
		if(exportData == null){
			return Optional.empty();
		}
		return Optional.of(importEmpInfo(iPersonInfoPub.getPersonInfo(employeeID)));
	}

}
