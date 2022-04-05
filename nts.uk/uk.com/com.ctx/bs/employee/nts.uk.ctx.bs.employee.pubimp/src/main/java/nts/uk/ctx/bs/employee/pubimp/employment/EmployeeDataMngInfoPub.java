package nts.uk.ctx.bs.employee.pubimp.employment;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfoRepository;
import nts.uk.ctx.bs.employee.pub.employment.IEmployeeDataMngInfoPub;
@Stateless
public class EmployeeDataMngInfoPub implements IEmployeeDataMngInfoPub {

	@Inject
	EmployeeDataMngInfoRepository empDmiRepo;

	@Override
	// 基準日時点で在職している社員の人数を取得する
	public int countEmployeeByBaseDate(List<String> lstCompID, GeneralDate baseDate) {
		// TODO Auto-generated method stub
		return empDmiRepo.countEmplsByBaseDate(lstCompID, baseDate);
	}

}
