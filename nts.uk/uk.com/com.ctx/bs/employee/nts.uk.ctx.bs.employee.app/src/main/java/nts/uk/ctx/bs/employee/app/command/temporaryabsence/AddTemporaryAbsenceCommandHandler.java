package nts.uk.ctx.bs.employee.app.command.temporaryabsence;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.gul.text.IdentifierUtil;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsenceHisItem;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsenceHistory;
import nts.uk.ctx.bs.person.dom.person.common.ConstantUtils;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsHistRepository;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsHistoryService;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsItemRepository;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.shr.pereg.app.command.PeregAddCommandHandler;
import nts.uk.shr.pereg.app.command.PeregAddCommandResult;

@Stateless
public class AddTemporaryAbsenceCommandHandler
		extends CommandHandlerWithResult<AddTemporaryAbsenceCommand, PeregAddCommandResult>
		implements PeregAddCommandHandler<AddTemporaryAbsenceCommand> {

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
	protected PeregAddCommandResult handle(CommandHandlerContext<AddTemporaryAbsenceCommand> context) {
		val command = context.getCommand();
		String companyId = AppContexts.user().companyId();

		String newHistID = IdentifierUtil.randomUniqueId();
		DateHistoryItem dateItem = new DateHistoryItem(newHistID,
				new DatePeriod(command.getStartDate() != null ? command.getStartDate() : ConstantUtils.minDate(),
						command.getEndDate() != null ? command.getEndDate() : ConstantUtils.maxDate()));

		Optional<TempAbsenceHistory> existHist = temporaryAbsenceHistRepository.getByEmployeeId(companyId,
				command.getEmployeeId());

		TempAbsenceHistory itemtoBeAdded = new TempAbsenceHistory(companyId, command.getEmployeeId(),
				new ArrayList<>());
		// In case of exist history of this employee
		if (existHist.isPresent()) {
			itemtoBeAdded = existHist.get();
		}
		itemtoBeAdded.add(dateItem);

		tempAbsHistoryService.add(itemtoBeAdded);

		BigDecimal falseValue = new BigDecimal(0);
		Boolean multiple = null;
		if (command.getMultiple() != null) {
			multiple = falseValue.compareTo(command.getMultiple()) == 0 ? false : true;
		}
		Boolean sameFamily = null;
		if (command.getSameFamily() != null) {
			sameFamily = falseValue.compareTo(command.getSameFamily()) == 0 ? false : true;
		}
		Boolean spouseIsLeave = null;
		if (command.getSpouseIsLeave() != null) {
			spouseIsLeave = falseValue.compareTo(command.getSpouseIsLeave()) == 0 ? false : true;
		}
		// TODO SoInsPayCategory set to null
		TempAbsenceHisItem temporaryAbsence = TempAbsenceHisItem.createTempAbsenceHisItem(
				command.getTempAbsenceFrNo() != null ? command.getTempAbsenceFrNo().intValue() : 0, newHistID,
				command.getEmployeeId(), command.getRemarks(),
				command.getSoInsPayCategory() != null ? command.getSoInsPayCategory().intValue() : null, multiple,
				command.getFamilyMemberId(), sameFamily,
				command.getChildType() != null ? command.getChildType().intValue() : null, command.getCreateDate(),
				spouseIsLeave, command.getSameFamilyDays() != null ? command.getSameFamilyDays().intValue() : null);
		temporaryAbsenceRepository.add(temporaryAbsence);

		return new PeregAddCommandResult(newHistID);
	}

}
