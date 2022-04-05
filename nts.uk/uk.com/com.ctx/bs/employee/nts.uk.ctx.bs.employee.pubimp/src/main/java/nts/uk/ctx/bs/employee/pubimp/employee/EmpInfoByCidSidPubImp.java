package nts.uk.ctx.bs.employee.pubimp.employee;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHist;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistByEmployee;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistItem;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistRepository;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfo;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfoRepository;
import nts.uk.ctx.bs.employee.pub.employee.employeeInfo.EmpInfoByCidSidExport;
import nts.uk.ctx.bs.employee.pub.employee.employeeInfo.EmpInfoByCidSidPub;
import nts.uk.ctx.bs.person.dom.person.info.Person;
import nts.uk.ctx.bs.person.dom.person.info.PersonRepository;

@Stateless
public class EmpInfoByCidSidPubImp implements EmpInfoByCidSidPub {

	@Inject
	private EmployeeDataMngInfoRepository empDataMngRepo;

	@Inject
	private AffCompanyHistRepository affComHistRepo;

	@Inject
	private PersonRepository perRepo;

	@Override
	public EmpInfoByCidSidExport getEmpInfoBySidCid(String pid, String cid) {

		EmpInfoByCidSidExport result = new EmpInfoByCidSidExport();

		Date date = new Date();
		GeneralDate systemDate = GeneralDate.legacyDate(date);

		Optional<EmployeeDataMngInfo> empOpt = empDataMngRepo.findByCidPid(cid, pid);

		EmployeeDataMngInfo empDataMng = new EmployeeDataMngInfo();
		if(!empOpt.isPresent()){
			return null;
		}
			empDataMng = empOpt.get();

			result.setSid(empDataMng.getEmployeeId());
			result.setScd(empDataMng.getEmployeeCode() == null ? null : empDataMng.getEmployeeCode().v());
			result.setCid(empDataMng.getCompanyId());
			result.setPid(empDataMng.getPersonId());

			AffCompanyHist affComHist = affComHistRepo.getAffCompanyHistoryOfPerson(pid);

			AffCompanyHistByEmployee affComHistByEmp = affComHist
					.getAffCompanyHistByEmployee(empDataMng.getEmployeeId());

//			AffCompanyHistItem affComHistItem = new AffCompanyHistItem();
			Person person = new Person();
			
			if (affComHistByEmp.items() != null) {
				
				List<AffCompanyHistItem> filter = affComHistByEmp.getLstAffCompanyHistoryItem().stream().filter(m -> {
					return m.end().beforeOrEquals(systemDate) && m.start().afterOrEquals(systemDate);
				}).collect(Collectors.toList());

				if (!filter.isEmpty()) {
//					affComHistItem = filter.get(0);

					person = getPersonInfo(affComHist.getPId());
					if (person != null) {
						result = setResult(empDataMng, person);
					}
				}
			}

		return result;
	}

	/**
	 * @param person
	 * @param employee
	 */
	private EmpInfoByCidSidExport setResult(EmployeeDataMngInfo emp, Person person) {
		EmpInfoByCidSidExport result = new EmpInfoByCidSidExport();
		result.setPid(emp.getPersonId());
		result.setCid(emp.getCompanyId());
		result.setScd(emp.getEmployeeCode() == null ? "" : emp.getEmployeeCode().v());
		result.setSid(emp.getEmployeeId());
		result.setPersonName(person.getPersonNameGroup().getBusinessName() == null ? ""
				: person.getPersonNameGroup().getBusinessName().v());
		return result;
	}

	private Person getPersonInfo(String pid) {
		Optional<Person> personOpt = perRepo.getByPersonId(pid);
		Person person = new Person();
		if (personOpt.isPresent()) {
			person = personOpt.get();
		}else {
			return null;
		}
		return person;
	}

}
