package nts.uk.ctx.bs.company.dom.company;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import nts.arc.time.YearMonth;
import nts.arc.time.calendar.Year;
import nts.arc.time.calendar.period.YearMonthPeriod;

/**
 * 年月期間から年度を取得
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.会社.会社情報.年月期間から年度を取得
 * @author chungnt
 *
 */

public class GetYearFromYearMonthPeriod {
	
	/**
	 * 
	 * @param require
	 * @param cid		会社ID
	 * @param yearMonth	年月(List)
	 * @return			年度(List)
	 */
	public static List<Year> getYearFromYearMonthPeriod(Require require, String cid, List<YearMonth> yearMonths) {
		List<Year> result = new ArrayList<>();
		
		if(yearMonths.isEmpty()) {
			return result;
		}
		
		Optional<Company> company = require.find(cid);
		yearMonths = yearMonths.stream().sorted().collect(Collectors.toList());

		if (company.isPresent()) {
			Year startYear = company.get()
					.getYearBySpecifying(yearMonths.stream().findFirst().map(m -> m).orElse(null));
			Year endYear = company.get().getYearBySpecifying(yearMonths.get(yearMonths.size() - 1));
			
			List<Integer> years = new ArrayList<>();
			
			for (int i = startYear.v(); i <= endYear.v(); i++){
				years.add(i);
			}
			
			for (int i = 0 ; i <= years.size() -1 ; i ++){
				if(judgeWhetherYearMonthListIncludes(yearMonths, company.get().getPeriodTheYear(years.get(i)))){
					result.add(new Year(years.get(i)));
				}
			}
			return result;
		}

		return result;
	}
	
	/**
	 * [pvt-1]年度は年月Listが1件も含まれているか判断する
	 * @param yearMonths				年月(List)
	 * @param yearMonthPeriod		年月期間
	 * @return
	 */
	private static boolean judgeWhetherYearMonthListIncludes(List<YearMonth> yearMonths, YearMonthPeriod yearMonthPeriod) {
		
		List<YearMonth> s = new ArrayList<>();
		
		yearMonths.forEach(data -> {
			int y = data.year()*100 + data.month();
			
			if (yearMonthPeriod.start().v() <= y && y <= yearMonthPeriod.end().v()){
				s.add(data);
			}
		});
		
		if (!s.isEmpty()){
			return true;
		}
		return false;
	}
	
	public static interface Require {
		
		// [R-1] 会社情報を取得する(会社ID)
		Optional<Company> find(String companyId);
		
	}
}
