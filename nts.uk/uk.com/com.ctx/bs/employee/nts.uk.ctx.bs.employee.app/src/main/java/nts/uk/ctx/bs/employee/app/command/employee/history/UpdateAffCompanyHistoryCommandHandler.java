package nts.uk.ctx.bs.employee.app.command.employee.history;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHist;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistByEmployee;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistItem;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistRepository;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistService;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyInfo;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyInfoRepository;
import nts.uk.ctx.bs.person.dom.person.common.ConstantUtils;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.shr.pereg.app.command.PeregUpdateCommandHandler;

@Stateless
public class UpdateAffCompanyHistoryCommandHandler extends CommandHandler<UpdateAffCompanyHistoryCommand>
	implements PeregUpdateCommandHandler<UpdateAffCompanyHistoryCommand>{
	@Inject
	private AffCompanyHistRepository affCompanyHistRepository;
	
	@Inject
	private AffCompanyInfoRepository affCompanyInfoRepository;
	
	@Inject
	private AffCompanyHistService affCompanyHistService;
	
	@Override
	public String targetCategoryCd() {
		return "CS00003";
	}

	@Override
	public Class<?> commandClass() {
		return UpdateAffCompanyHistoryCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<UpdateAffCompanyHistoryCommand> context) {
		val command = context.getCommand();
		// In case of date period are exist in the screen
		if (command.getStartDate() != null) {
			AffCompanyHist listHist = affCompanyHistRepository.getAffCompanyHistoryOfEmployee(command.getSId());
			if (listHist == null) {
				throw new RuntimeException("Invalid AffCompanyHist");
			}
			// Get history by employeeId
			AffCompanyHistByEmployee listHistBySID = listHist.getAffCompanyHistByEmployee(command.getSId());

			Optional<AffCompanyHistItem> itemToBeUpdated = listHistBySID.getLstAffCompanyHistoryItem().stream()
					.filter(h -> h.identifier().equals(command.getHistoryId())).findFirst();

			if (!itemToBeUpdated.isPresent()) {
				throw new RuntimeException("Invalid AffCompanyHist");
			}
			// 所属期間．終了日が指定されない場合（＝退職していない）、所属期間．終了日＝9999/12/31を自動的に設定する。
			listHistBySID.changeSpan(itemToBeUpdated.get(), new DatePeriod(command.getStartDate(),
					command.getEndDate() != null ? command.getEndDate() : ConstantUtils.maxDate()));
			affCompanyHistService.update(listHistBySID, itemToBeUpdated.get());
		}
		AffCompanyInfo histItem = AffCompanyInfo.createFromJavaType(command.getSId(), command.getHistoryId(),
				command.getRecruitmentClassification(), command.getAdoptionDate(),
				command.getRetirementAllowanceCalcStartDate());
		affCompanyInfoRepository.update(histItem);

	}

}
