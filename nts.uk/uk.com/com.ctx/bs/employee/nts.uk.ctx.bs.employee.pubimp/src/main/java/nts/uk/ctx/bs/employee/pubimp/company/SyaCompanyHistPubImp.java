package nts.uk.ctx.bs.employee.pubimp.company;

import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHist;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistItem;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistRepository;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfoRepository;
import nts.uk.ctx.bs.employee.pub.company.SyaCompanyHistExport;
import nts.uk.ctx.bs.employee.pub.company.SyaCompanyHistPub;

@Stateless
public class SyaCompanyHistPubImp implements SyaCompanyHistPub{

	@Inject
	private AffCompanyHistRepository affComHistRepo;
	
	@Inject
	private EmployeeDataMngInfoRepository employeeDataMngInfoRepo;

	@Override
	public Optional<SyaCompanyHistExport> find(String employeeId, GeneralDate baseDate) {
		AffCompanyHist perComHist = affComHistRepo.getAffCompanyHistoryOfEmployeeAndBaseDate(employeeId, baseDate);
		// 会社所属履歴（全体）が取得できたか
		if (perComHist != null){
			List<AffCompanyHistItem> lstSyaComHist = perComHist.getAffCompanyHistByEmployee(employeeId)
																.getLstAffCompanyHistoryItem();
			// 会社所属履歴（社員ごと）が同時点で2件ある
			if(lstSyaComHist.size() > 1) {
				throw new RuntimeException("同時点で同一会社に複数所属履歴が存在するのは不正");
			}
			// 会社所属履歴（社員ごと）が1件だけ存在する場合
			else if (!lstSyaComHist.isEmpty()){
				val syaComHist = lstSyaComHist.get(0);
				// 社員の情報を取得
				val syaInfo = employeeDataMngInfoRepo.findByEmpId(employeeId);
				
				// 取得できた
				if(syaInfo.isPresent()) {
					return Optional.of(new SyaCompanyHistExport(
							employeeId, 
							syaInfo.get().getCompanyId(), 
							syaComHist.getDatePeriod()));
				}
			}
		}
		// 何かしらの情報が取得できない場合
		return Optional.empty();
	}
}
