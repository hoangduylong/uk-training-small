package nts.uk.ctx.bs.employee.app.command.temporaryabsence;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.gul.text.IdentifierUtil;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsHistRepository;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsHistoryService;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsItemRepository;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsenceHisItem;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsenceHistory;
import nts.uk.ctx.bs.person.dom.person.common.ConstantUtils;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.shr.pereg.app.command.MyCustomizeException;
import nts.uk.shr.pereg.app.command.PeregAddListCommandHandler;
@Stateless
public class AddTemporaryAbsenceListCommandHandler extends CommandHandlerWithResult<List<AddTemporaryAbsenceCommand>, List<MyCustomizeException>>
implements PeregAddListCommandHandler<AddTemporaryAbsenceCommand>{
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
		return AddTemporaryAbsenceCommand.class;
	}

	@Override
	protected List<MyCustomizeException> handle(CommandHandlerContext<List<AddTemporaryAbsenceCommand>> context) {
		List<AddTemporaryAbsenceCommand> command  = context.getCommand();
		String cid = AppContexts.user().companyId();
		Map<String, String> recordIds = new HashMap<>();
		List<MyCustomizeException> result =  new ArrayList<>();
		List<TempAbsenceHisItem> temporaryAbsenceLst = new ArrayList<>();
		List<TempAbsenceHistory> tempAbsenceHistoryLst = new ArrayList<>();
		// sidsPidsMap
		List<String> sids = command.stream().map(c -> c.getEmployeeId()).collect(Collectors.toList());
		Map<String, List<TempAbsenceHistory>> existHistMap = temporaryAbsenceHistRepository.getBySidsAndCid(cid, sids).stream().collect(Collectors.groupingBy(c -> c.getEmployeeId()));
		command.stream().forEach(c ->{
			try {
				String newHistID = IdentifierUtil.randomUniqueId();
				DateHistoryItem dateItem = new DateHistoryItem(newHistID,
						new DatePeriod(c.getStartDate() != null ? c.getStartDate() : ConstantUtils.minDate(),
								c.getEndDate() != null ? c.getEndDate() : ConstantUtils.maxDate()));
				List<TempAbsenceHistory> existHistLst = existHistMap.get(c.getEmployeeId());
				TempAbsenceHistory itemtoBeAdded = new TempAbsenceHistory(cid, c.getEmployeeId(),
						new ArrayList<>());
				// In case of exist history of this employee
				if(existHistLst != null) {
					itemtoBeAdded =  existHistLst.get(0);;
				}
				itemtoBeAdded.add(dateItem);
				tempAbsenceHistoryLst.add(itemtoBeAdded);
				
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
				// TODO SoInsPayCategory set to null
				TempAbsenceHisItem temporaryAbsence = TempAbsenceHisItem.createTempAbsenceHisItem(
						c.getTempAbsenceFrNo() != null ? c.getTempAbsenceFrNo().intValue() : 1, newHistID,
						c.getEmployeeId(), c.getRemarks(),
						c.getSoInsPayCategory() != null ? c.getSoInsPayCategory().intValue() : null, multiple,
						c.getFamilyMemberId(), sameFamily,
						c.getChildType() != null ? c.getChildType().intValue() : null, c.getCreateDate(),
						spouseIsLeave, c.getSameFamilyDays() != null ? c.getSameFamilyDays().intValue() : null);
				temporaryAbsenceLst.add(temporaryAbsence);	
				recordIds.put(c.getEmployeeId(), newHistID);
				
			}catch(BusinessException e) {
				MyCustomizeException ex = new MyCustomizeException(e.getMessageId(), Arrays.asList(c.getEmployeeId()), "休職休業期間");
				result.add(ex);
			}

		});
		
		if(!tempAbsenceHistoryLst.isEmpty()) {
			tempAbsHistoryService.addAll(tempAbsenceHistoryLst);
		}
		
		if(!temporaryAbsenceLst.isEmpty()) {
			temporaryAbsenceRepository.addAll(temporaryAbsenceLst);
		}
		
		if(!recordIds.isEmpty()) {
			result.add(new MyCustomizeException("NOERROR", recordIds));
		}
		
		return result;
	}

}
