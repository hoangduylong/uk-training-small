/**
 * 
 */
package nts.uk.ctx.bs.employee.dom.foreigner.residence.hisinfo;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.bs.employee.dom.employee.service.EmpBasicInfo;
import nts.uk.ctx.bs.employee.dom.employee.service.SearchEmployeeService;
import nts.uk.ctx.bs.person.dom.person.foreigner.residence.hisinfo.ForeignerResidenceHistoryInforItem;
import nts.uk.ctx.bs.person.dom.person.foreigner.residence.hisinfo.ForeignerResidenceRepository;

/**
 * @author laitv
 */

@Stateless
public class EmpForeignerResidenceServices {

	@Inject
	private ForeignerResidenceRepository repo;
	
	@Inject
	private SearchEmployeeService employeeService;

	// 社員IDリストより外国人在留履歴情報をロードする
	public EmpForeignerResidenceManagement loadForeignerResidence(List<String> listSid, GeneralDateTime baseDate, EmpForeignerResidenceManagement result) {

		// 社員IDを個人IDへ変換する(chuyen employeID thanh PersonID)
		
		// 社員ID(List)から個人社員基本情報を取得 (request list 61)
		List<EmpBasicInfo> listEmpInfo = employeeService.getEmpBasicInfo(listSid);
		
		if (listEmpInfo.isEmpty()) {
			return null;
		}
		
		List<String> listPID = listEmpInfo.stream().map(i -> i.getPId()).collect(Collectors.toList());
		
		List<ForeignerResidenceHistoryInforItem> listDomain = repo.getListForeignerResidenceHistoryInforItem(listPID, baseDate);
		result.fillData(listDomain, listPID);
		return result;
	}

	// 外国人在留履歴情報の取得
	public ForeignerResidenceHistoryInforItem getForeignerResidence(String sid, GeneralDateTime baseDate,
			EmpForeignerResidenceManagement foreignerResidenceManagement) {
		// 社員ID(List)から個人社員基本情報を取得 (request list 61)
		List<EmpBasicInfo> listEmpInfo = employeeService.getEmpBasicInfo(Arrays.asList(sid));

		if (listEmpInfo.isEmpty()) {
			return null;
		}
		
		String pid = listEmpInfo.stream().map(i -> i.getPId()).collect(Collectors.toList()).get(0);
		
		
		Optional<ForeignerResidenceHistoryInforItem> domainOpt = foreignerResidenceManagement.getForeignerResidenceHisInfoItems()
				.stream().filter(e -> e.pid.equals(pid)).findFirst();
		if (domainOpt.isPresent()) {
			return domainOpt.get();
		} else {
			
			Optional<String> pidOpt = foreignerResidenceManagement.getSearchedPIDs()
					.stream().filter(e -> e.equals(pid)).findFirst();
			
			if (pidOpt.isPresent()) {
				return null;
			}

			List<ForeignerResidenceHistoryInforItem> domain = repo
					.getListForeignerResidenceHistoryInforItem(Arrays.asList(pid), baseDate);
			if (domain.isEmpty()) {
				return null;
			}
			return domain.get(0);
		}
	}
}
