package nts.uk.ctx.bs.employee.pub.employment;

import java.util.List;

import nts.arc.time.GeneralDate;

public interface IEmployeeDataMngInfoPub {

	// 基準日時点で在職している社員の人数を取得する
	int countEmployeeByBaseDate(List<String> lstCompID, GeneralDate baseDate);
}
