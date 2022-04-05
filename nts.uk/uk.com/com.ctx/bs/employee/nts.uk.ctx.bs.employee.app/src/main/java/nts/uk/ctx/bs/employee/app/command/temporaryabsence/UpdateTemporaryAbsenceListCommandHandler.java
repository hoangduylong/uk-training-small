package nts.uk.ctx.bs.employee.app.command.temporaryabsence;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsHistRepository;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsHistoryService;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsItemRepository;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsenceHisItem;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsenceHistory;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.shr.pereg.app.command.MyCustomizeException;
import nts.uk.shr.pereg.app.command.PeregUpdateListCommandHandler;
@Stateless
public class UpdateTemporaryAbsenceListCommandHandler extends CommandHandlerWithResult<List<UpdateTemporaryAbsenceCommand>, List<MyCustomizeException>>
implements PeregUpdateListCommandHandler<UpdateTemporaryAbsenceCommand>{
	@Inject
	private TempAbsItemRepository temporaryAbsenceRepository;

	@Inject
	private TempAbsHistRepository temporaryAbsenceHistRepository;

	@Inject
	private TempAbsHistoryService tempAbsHistoryService;
	@Override
	public String targetCategoryCd() {
		return "CS00018";
	}

	@Override
	public Class<?> commandClass() {
		return UpdateTemporaryAbsenceCommand.class;
	}

	@Override
	protected List<MyCustomizeException> handle(CommandHandlerContext<List<UpdateTemporaryAbsenceCommand>> context) {
		List<UpdateTemporaryAbsenceCommand> cmd = context.getCommand();
		String cid = AppContexts.user().companyId();
		List<String> sidErrorLst = new ArrayList<>();
		List<MyCustomizeException> errorExceptionLst = new ArrayList<>();
		// Update history table
		// In case of date period are exist in the screen
		UpdateTemporaryAbsenceCommand updateFirst = cmd.get(0);
		List<TempAbsenceHistory> existHistLst = new ArrayList<>();
		List<DateHistoryItem> dateHistItems = new ArrayList<>();
		List<TempAbsenceHisItem> histItems = new ArrayList<>();
		List<String> errorLst = new ArrayList<>();
		// sidsPidsMap
		List<String> sids = cmd.stream().map(c -> c.getEmployeeId()).collect(Collectors.toList());
		if (updateFirst.getStartDate() != null){
			List<TempAbsenceHistory> existHist = temporaryAbsenceHistRepository.getBySidsAndCid(cid, sids);
			existHistLst.addAll(existHist);
		}
		cmd.stream().forEach(c ->{
			try {
				if (c.getStartDate() != null) {
					Optional<TempAbsenceHistory> existHistOpt = existHistLst.stream()
							.filter(item -> item.getEmployeeId().equals(c.getEmployeeId())).findFirst();
					if (!existHistOpt.isPresent()) {
						errorLst.add(c.getEmployeeId());
						return;
					}
					Optional<DateHistoryItem> itemToBeUpdate = existHistOpt.get().getDateHistoryItems().stream()
							.filter(h -> h.identifier().equals(c.getHistoyId())).findFirst();
					if (!itemToBeUpdate.isPresent()) {
						errorLst.add(c.getEmployeeId());
						return;
					}
					existHistOpt.get().changeSpan(itemToBeUpdate.get(), new DatePeriod(c.getStartDate(),
							c.getEndDate() != null ? c.getEndDate() : GeneralDate.max()));
					dateHistItems.add(itemToBeUpdate.get());
				}

				BigDecimal falseValue = new BigDecimal(0);
				Boolean multiple = null;
				if (c.getMultiple() != null) {
					multiple = falseValue.compareTo(c.getMultiple()) == 0 ? false : true;
				}
				Boolean sameFamily = null;
				if (c.getSameFamily() != null) {
					sameFamily = falseValue.compareTo(c.getSameFamily()) == 0 ? false : true;
				}
				Boolean spouseIsLeave = null;
				if (c.getSpouseIsLeave() != null) {
					spouseIsLeave = falseValue.compareTo(c.getSpouseIsLeave()) == 0 ? false : true;
				}

				// Update detail table
				int tempAbsenceFrNo = c.getTempAbsenceFrNo() != null ? c.getTempAbsenceFrNo().intValue() : 1;
				Integer soInsPayCategory = c.getSoInsPayCategory() != null ? c.getSoInsPayCategory().intValue() : null;
				Integer childType = c.getChildType() != null ? c.getChildType().intValue() : null;
				Integer sameFamilyDays = c.getSameFamilyDays() != null ? c.getSameFamilyDays().intValue() : null;

				TempAbsenceHisItem temporaryAbsence = TempAbsenceHisItem.createTempAbsenceHisItem(tempAbsenceFrNo,
						c.getHistoyId(), c.getEmployeeId(), c.getRemarks(), soInsPayCategory, multiple,
						c.getFamilyMemberId(), sameFamily, childType, c.getCreateDate(), spouseIsLeave, sameFamilyDays);
				histItems.add(temporaryAbsence);
			} catch (BusinessException e) {
				MyCustomizeException ex = new MyCustomizeException(e.getMessageId(), Arrays.asList(c.getEmployeeId()), "休職休業期間");
				errorExceptionLst.add(ex);
			}

		});
		
		if(!dateHistItems.isEmpty()) {
			tempAbsHistoryService.updateAll(dateHistItems);
		}
		
		if(!histItems.isEmpty()) {
			temporaryAbsenceRepository.updateAll(histItems);
		}
		
		if(!sidErrorLst.isEmpty()) {
			errorExceptionLst.add(new MyCustomizeException("invalid TempAbsenceHistory", sidErrorLst));
		}
		
		return errorExceptionLst;
	}

}
