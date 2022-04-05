package nts.uk.ctx.bs.company.dom.company;

import java.util.Optional;

import nts.arc.time.calendar.period.YearMonthPeriod;

/**
 * 年度の期間を取得
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.会社.会社情報.年度の期間を取得
 * @author chungnt
 *
 */

public class GetThePeriodOfTheYear {

	public static YearMonthPeriod getPeriodOfTheYear (Require require, String cid, int year) {
		
		Optional<Company> company = require.getComanyInfoByCid(cid);
		
		YearMonthPeriod result = company.get().getPeriodTheYear(year);
		
		return result;
	}
	
	public static interface Require{
		
		//	[R-1] 会社情報を取得する(会社ID)	
		Optional<Company> getComanyInfoByCid(String cid);
	}
}
