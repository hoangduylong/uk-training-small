package nts.uk.ctx.bs.employee.pubimp.employee;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfoRepository;
import nts.uk.ctx.bs.employee.pub.employee.EmpDataExport;
import nts.uk.ctx.bs.employee.pub.employee.GetMngInfoFromEmpIDListPub;

/**
 * 
 * @author xuannt
 *
 */
@Stateless
public class GetMngInfoFromEmpIDListPubImpl implements GetMngInfoFromEmpIDListPub {
	//	社員データ管理情報
	@Inject 
	private EmployeeDataMngInfoRepository employeeDataMngInfoRepository;
	
	@Override
	public List<EmpDataExport> getEmpData(List<String> empIDList) {
		List<EmpDataExport> empDataList = Collections.emptyList();
		if(empIDList.isEmpty())
			return empDataList;
		empDataList = employeeDataMngInfoRepository.findByListEmployeeId(empIDList).stream()
												   .filter(e -> e.getDeletedStatus().value == 0)
												   .map(e -> new EmpDataExport(e.getCompanyId(),
																			   e.getPersonId(),
																			   e.getEmployeeId(),
																			   e.getEmployeeCode().v(),
																			   e.getExternalCode() == null ? Optional.empty() : Optional.ofNullable(e.getExternalCode().v())))
													.collect(Collectors.toList());
		return empDataList;
	}

}
