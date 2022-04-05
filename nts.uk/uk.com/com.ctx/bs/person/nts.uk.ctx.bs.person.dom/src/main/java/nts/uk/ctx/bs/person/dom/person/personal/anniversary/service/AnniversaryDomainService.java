package nts.uk.ctx.bs.person.dom.person.personal.anniversary.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.ejb.Stateless;

import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.bs.person.dom.person.personal.anniversary.AnniversaryNotice;

@Stateless
public class AnniversaryDomainService {

	/**
	 * @param Require
	 * @return boolean 
	 * DS_新記念日があるか
	 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.個人.個人のインフォメーション.新記念日があるか.新記念日があるか
	 */
	public boolean isTodayHaveNewAnniversary(Require require) {
		List<AnniversaryNotice> anniversaryNotices = require.getTodayAnniversary(GeneralDate.today()).stream()
				.filter(item -> item.isNewAnniversary(GeneralDate.today()))
				.collect(Collectors.toList());
		return !anniversaryNotices.isEmpty();
	}

	/**
	 * @param Require
	 * @param DatePeriod
	 * @return Map<AnniversaryNotice, Boolean> 
	 * DS_期間で記念日情報を取得する
	 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.個人.個人のインフォメーション.期間で記念日情報を取得する.期間で記念日情報を取得する
	 */
	public Map<AnniversaryNotice, Boolean> setFlag(Require require, DatePeriod datePeriod) {
		GeneralDate dateStart = datePeriod.start();
		GeneralDate dateEnd = datePeriod.end();
		List<AnniversaryNotice> anniversaryNotices = new ArrayList<>();
		if (dateStart.compareTo(dateEnd) == 0 && dateEnd.compareTo(GeneralDate.today()) == 0) {
			anniversaryNotices = require.getTodayAnniversary(GeneralDate.today());
		}
		if (dateStart.compareTo(GeneralDate.today()) != 0 || dateEnd.compareTo(GeneralDate.today()) != 0) {
			if (dateStart.year() == dateEnd.year()) {
				anniversaryNotices = require.getByDatePeriod(new DatePeriod(dateStart, dateEnd));
			} else {
				GeneralDate date = GeneralDate.ymd(dateStart.year(), 12, 31);
				anniversaryNotices = require.getByDatePeriod(new DatePeriod(dateStart, date));
				List<AnniversaryNotice> anniversaryNoticeList = require
						.getByDatePeriod(new DatePeriod(date.addDays(1), dateEnd));
				anniversaryNotices.addAll(anniversaryNoticeList);
			}
		}
		Map<AnniversaryNotice, Boolean> anniversaryNoticeMap = new LinkedHashMap<>();
		for (AnniversaryNotice anniversaryNotice : anniversaryNotices) {
			anniversaryNoticeMap.put(anniversaryNotice, anniversaryNotice.isNewAnniversary(dateEnd));
		}
		return anniversaryNoticeMap;
	}

	public static interface Require {
		/**
		 * [R-1] 今日の記念日を取得する(年月日) of DS_新記念日があるか 
		 * [R-2] 今日の記念日を取得する(年月日) of DS_期間で記念日情報を取得する 
		 * [個人の記念日情報Repository.今日の記念日を取得する(年月日)
		 * AnniversaryRepository.getTodayAnniversary(GeneralDate)
		 * 
		 * @param GeneralDate
		 * @return list AnniversaryNotice
		 */
		List<AnniversaryNotice> getTodayAnniversary(GeneralDate date);

		/**
		 * [R-1] 期間で記念日を取得する(期間) of DS_期間で記念日情報を取得する 
		 * [個人の記念日情報Repository.期間で記念日を取得する(期間)
		 * AnniversaryRepository.getByDatePeriod(DatePeriod period)
		 * 
		 * @param DatePeriod
		 * @return list AnniversaryNotice
		 */
		List<AnniversaryNotice> getByDatePeriod(DatePeriod period);
	}
}
