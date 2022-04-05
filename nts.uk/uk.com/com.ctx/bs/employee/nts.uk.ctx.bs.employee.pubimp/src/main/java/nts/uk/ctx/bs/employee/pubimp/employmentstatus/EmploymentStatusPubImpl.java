package nts.uk.ctx.bs.employee.pubimp.employmentstatus;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistByEmployee;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistItem;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistRepository;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsHistRepository;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsItemRepository;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsenceHisItem;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsenceHistory;
import nts.uk.ctx.bs.employee.pub.employmentstatus.EmploymentInfo;
import nts.uk.ctx.bs.employee.pub.employmentstatus.EmploymentState;
import nts.uk.ctx.bs.employee.pub.employmentstatus.EmploymentStatus;
import nts.uk.ctx.bs.employee.pub.employmentstatus.EmploymentStatusPub;
import nts.arc.time.calendar.period.DatePeriod;

@Stateless
public class EmploymentStatusPubImpl implements EmploymentStatusPub {

	@Inject
	private TempAbsHistRepository tempAbsHistRepo;

	@Inject
	private TempAbsItemRepository tempAbsItemRepo;

	@Inject
	private AffCompanyHistRepository affComHistRepo;

	@Override
	public List<EmploymentStatus> findListOfEmployee(List<String> employeeIds, DatePeriod inputPeriod) {

		// EMPLOYEE HISTORY
		List<AffCompanyHistByEmployee> employeeHistories = affComHistRepo.getAffEmployeeHistory(employeeIds);

		// TEMP_ABSENCE DATA
		Map<String, TempAbsenceHistory> tempAbsMap = tempAbsHistRepo.getByListSid(employeeIds, inputPeriod).stream()
				.collect(Collectors.toMap(x -> x.getEmployeeId(), x -> x));
		List<String> historyIds = new ArrayList<>();
		tempAbsMap.forEach((empId, tempHist) -> historyIds.addAll(tempHist.getHistoryIds()));
		Map<String, TempAbsenceHisItem> mapTempAbsItemMap = tempAbsItemRepo.getItemByHitoryIdList(historyIds).stream()
				.collect(Collectors.toMap(x -> x.getHistoryId(), x -> x));

		List<EmploymentStatus> employmentStatusList = new ArrayList<>();

		for (AffCompanyHistByEmployee employeeHist : employeeHistories) {
			List<AffCompanyHistItem> responseHistories = employeeHist.historyIncludePeriod(inputPeriod);
			TempAbsenceHistory tempAbsence = tempAbsMap.get(employeeHist.getSId());

			List<EmploymentInfo> employmentInfo = new ArrayList<>();
			switch (responseHistories.size()) {
			case 0:
				employmentInfo = hasNotHistory(employeeHist, inputPeriod);
				break;
			case 1:
				employmentInfo = haveOneHistory(employeeHist, responseHistories.get(0), tempAbsence, inputPeriod,
						mapTempAbsItemMap);
				break;
			default:
				employmentInfo = haveMoreHistories(employeeHist, responseHistories, inputPeriod, tempAbsence,
						mapTempAbsItemMap);
				break;
			}

			employmentStatusList.add(new EmploymentStatus(employeeHist.getSId(), employmentInfo));
		}

		return employmentStatusList;
	}

	private List<EmploymentInfo> hasNotHistory(AffCompanyHistByEmployee employeeHist, DatePeriod inputPeriod) {
		List<GeneralDate> datesBetween = inputPeriod.datesBetween();

		if (employeeHist.hasPreviousHistory(inputPeriod.start())) {
			return convertToEmpInfoList(datesBetween, EmploymentState.RETIREMENT, Optional.empty());

		} else {
			return convertToEmpInfoList(datesBetween, EmploymentState.BEFORE_JOINING, Optional.empty());
		}
	}

	private List<EmploymentInfo> haveOneHistory(AffCompanyHistByEmployee employeeHist,
			AffCompanyHistItem responseHistory, TempAbsenceHistory tempAbsence, DatePeriod inputPeriod,
			Map<String, TempAbsenceHisItem> mapTempAbsItemMap) {
		List<EmploymentInfo> employmentInfo = new ArrayList<>();

		// CHECK BEFORE
		employmentInfo.addAll(getBeforeHistory(employeeHist, responseHistory, inputPeriod));

		// CHECK IN WORKING DATE
		employmentInfo.addAll(checkWithTempAbsence(responseHistory, inputPeriod, tempAbsence, mapTempAbsItemMap));

		// CHECK AFTER
		employmentInfo.addAll(getAfterHistory(responseHistory, inputPeriod));

		return employmentInfo;
	}

	private List<EmploymentInfo> haveMoreHistories(AffCompanyHistByEmployee employeeHist,
			List<AffCompanyHistItem> responseHistories, DatePeriod inputPeriod, TempAbsenceHistory tempAbsence,
			Map<String, TempAbsenceHisItem> mapTempAbsItemMap) {
		List<EmploymentInfo> employmentInfo = new ArrayList<>();

		// CHECK BEFORE
		AffCompanyHistItem firstHistory = responseHistories.get(0);
		employmentInfo.addAll(getBeforeHistory(employeeHist, firstHistory, inputPeriod));

		int responseHistoriesSize = responseHistories.size();
		for (int hisNumber = 0; hisNumber < responseHistoriesSize; hisNumber++) {
			AffCompanyHistItem history = responseHistories.get(hisNumber);

			// CHECK IN WORKING DATE
			employmentInfo.addAll(checkWithTempAbsence(history, inputPeriod, tempAbsence, mapTempAbsItemMap));

			if (hisNumber != responseHistoriesSize - 1) {
				// CHECK BETWEEN
				AffCompanyHistItem afterHistory = responseHistories.get(hisNumber + 1);
				employmentInfo.addAll(getBetweenTwoHistories(history, afterHistory));
			} else {
				// CHECK AFTER
				employmentInfo.addAll(getAfterHistory(history, inputPeriod));
			}

		}

		return employmentInfo;
	}

	private List<EmploymentInfo> getBeforeHistory(AffCompanyHistByEmployee employeeHist, AffCompanyHistItem history,
			DatePeriod inputPeriod) {
		if (inputPeriod.start().before(history.start())) {
			DatePeriod beforeHistory = new DatePeriod(inputPeriod.start(), history.start().nextValue(false));
			List<GeneralDate> beforeHistoryDates = beforeHistory.datesBetween();

			List<EmploymentInfo> beforeHistEmploymentInfo;
			if (employeeHist.hasPreviousHistory(inputPeriod.start())) {
				beforeHistEmploymentInfo = convertToEmpInfoList(beforeHistoryDates, EmploymentState.RETIREMENT,
						Optional.empty());
			} else {
				beforeHistEmploymentInfo = convertToEmpInfoList(beforeHistoryDates, EmploymentState.BEFORE_JOINING,
						Optional.empty());
			}
			return beforeHistEmploymentInfo;
		}
		return new ArrayList<>();
	}

	private List<EmploymentInfo> getAfterHistory(AffCompanyHistItem history, DatePeriod inputPeriod) {

		if (inputPeriod.end().after(history.end())) {
			DatePeriod afterHistory = new DatePeriod(history.end().nextValue(true), inputPeriod.end());
			List<GeneralDate> afterHistoryDates = afterHistory.datesBetween();

			return convertToEmpInfoList(afterHistoryDates, EmploymentState.RETIREMENT, Optional.empty());
		}
		return new ArrayList<>();
	}

	private List<EmploymentInfo> getBetweenTwoHistories(AffCompanyHistItem history, AffCompanyHistItem afterHistory) {
		DatePeriod betweenPeriod = new DatePeriod(history.end().nextValue(true), afterHistory.start().nextValue(false));
		List<GeneralDate> betweenPeriodDates = betweenPeriod.datesBetween();
		return convertToEmpInfoList(betweenPeriodDates, EmploymentState.BEFORE_JOINING, Optional.empty());
	}

	private List<EmploymentInfo> convertToEmpInfoList(List<GeneralDate> datesBetween, EmploymentState empState,
			Optional<Integer> tempAbsNo) {
		return datesBetween.stream()
				.map(date -> new EmploymentInfo(date, empState,
						tempAbsNo.isPresent() ? Optional.of(tempAbsNo.get()) : Optional.empty()))
				.collect(Collectors.toList());
	}

	private EmploymentInfo convertToEmpInfo(GeneralDate date, EmploymentState empState, Optional<Integer> tempAbsNo) {
		return new EmploymentInfo(date, empState,
				tempAbsNo.isPresent() ? Optional.of(tempAbsNo.get()) : Optional.empty());
	}

	private List<EmploymentInfo> checkWithTempAbsence(AffCompanyHistItem responseHistory, DatePeriod inputPeriod,
			TempAbsenceHistory tempAbsence, Map<String, TempAbsenceHisItem> mapTempAbsItemMap) {

		DatePeriod intersectPeriod = getIntersectPeriod(responseHistory.getDatePeriod(), inputPeriod);
		List<GeneralDate> datesBetween = intersectPeriod.datesBetween();

		if (tempAbsence == null) {
			return checkWithoutTempAbsence(datesBetween);
		}

		return datesBetween.stream().map(date -> {
			Optional<String> tempAbsHistId = tempAbsence.getHistoryId(date);
			if (!tempAbsHistId.isPresent()) {
				return convertToEmpInfo(date, EmploymentState.INCUMBENT, Optional.empty());
			} else {
				int tempAbsNo = getTempAbsNo(mapTempAbsItemMap, tempAbsHistId.get());
				if (tempAbsNo == 1) {
					return convertToEmpInfo(date, EmploymentState.LEAVE_OF_ABSENCE, Optional.of(tempAbsNo));
				} else {
					return convertToEmpInfo(date, EmploymentState.CLOSURE, Optional.of(tempAbsNo));
				}
			}
		}).collect(Collectors.toList());

	}

	private List<EmploymentInfo> checkWithoutTempAbsence(List<GeneralDate> datesBetween) {
		return datesBetween.stream().map(date -> convertToEmpInfo(date, EmploymentState.INCUMBENT, Optional.empty()))
				.collect(Collectors.toList());
	}

	private int getTempAbsNo(Map<String, TempAbsenceHisItem> mapTempAbsItemMap, String historyId) {
		TempAbsenceHisItem temAbsItem = mapTempAbsItemMap.get(historyId);
		return temAbsItem.getTempAbsenceFrNo().v().intValue();
	}

	private DatePeriod getIntersectPeriod(DatePeriod period1, DatePeriod period2) {
		GeneralDate startDate = period1.start().before(period2.start()) ? period2.start() : period1.start();
		GeneralDate endDate = period1.end().before(period2.end()) ? period1.end() : period2.end();
		return new DatePeriod(startDate, endDate);
	}
}
