package nts.uk.ctx.bs.employee.app.command.jobtitle.affiliate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistory;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistoryImmediately;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistoryItem;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistoryItemRepository;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistoryRepository;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistoryService;
import nts.uk.ctx.bs.person.dom.person.common.ConstantUtils;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.shr.pereg.app.command.MyCustomizeException;
import nts.uk.shr.pereg.app.command.PeregUpdateListCommandHandler;
@Stateless
public class UpdateAffJobTitleMainListCommandHandler extends CommandHandlerWithResult<List<UpdateAffJobTitleMainCommand>, List<MyCustomizeException>>
implements PeregUpdateListCommandHandler<UpdateAffJobTitleMainCommand>{
	@Inject
	private AffJobTitleHistoryRepository affJobTitleHistoryRepository;
	
	@Inject
	private AffJobTitleHistoryItemRepository affJobTitleHistoryItemRepository;
	
	@Inject 
	private AffJobTitleHistoryService affJobTitleHistoryService;
	@Override
	public String targetCategoryCd() {
		return "CS00016";
	}

	@Override
	public Class<?> commandClass() {
		return UpdateAffJobTitleMainCommand.class;
	}

	@Override
	protected List<MyCustomizeException> handle(CommandHandlerContext<List<UpdateAffJobTitleMainCommand>> context) {
		List<UpdateAffJobTitleMainCommand> command = context.getCommand();
		String cid = AppContexts.user().companyId();
		List<String> sidErrorLst = new ArrayList<>();
		List<MyCustomizeException> errorExceptionLst = new ArrayList<>();
		List<AffJobTitleHistoryImmediately> immedidately = new ArrayList<>();
		List<AffJobTitleHistoryItem> histItems = new ArrayList<>();
		List<String> sids = command.stream().map(c -> c.getSid()).collect(Collectors.toList());

		Map<String, List<AffJobTitleHistory>> existHistMap = affJobTitleHistoryRepository.getListBySids(cid, sids)
				.stream().collect(Collectors.groupingBy(c -> c.getEmployeeId()));
		command.stream().forEach(c ->{
			try {
				if (c.getStartDate() != null) {
					List<AffJobTitleHistory> affJobTitleHistoryLst = existHistMap.get(c.getSid());
					if (affJobTitleHistoryLst != null) {
						AffJobTitleHistory affJobTitleHistory = affJobTitleHistoryLst.get(0);
						Optional<DateHistoryItem> itemToBeUpdate = affJobTitleHistory.getHistoryItems().stream()
								.filter(h -> h.identifier().equals(c.getHistoryId())).findFirst();
						if (itemToBeUpdate.isPresent()) {
							affJobTitleHistory.changeSpan(itemToBeUpdate.get(), new DatePeriod(c.getStartDate(),
									c.getEndDate() != null ? c.getEndDate() : ConstantUtils.maxDate()));
							immedidately
									.add(new AffJobTitleHistoryImmediately(affJobTitleHistory, itemToBeUpdate.get()));
						} else {
							sidErrorLst.add(c.getSid());
							return;
						}
					} else {
						sidErrorLst.add(c.getSid());
						return;
					}
				}

				AffJobTitleHistoryItem histItem = AffJobTitleHistoryItem.createFromJavaType(c.getHistoryId(),
						c.getSid(), c.getJobTitleId(), c.getNote());
				histItems.add(histItem);
			} catch (BusinessException e) {
				MyCustomizeException ex = new MyCustomizeException(e.getMessageId(), Arrays.asList(c.getSid()), "期間");
				errorExceptionLst.add(ex);
			}
		});
		
		if(!immedidately.isEmpty()) {
			affJobTitleHistoryService.updateAll(immedidately);
		}
		
		if(!histItems.isEmpty()) {
			affJobTitleHistoryItemRepository.updateAll(histItems);
		}
		
		if(!sidErrorLst.isEmpty()){
			errorExceptionLst.add(new MyCustomizeException("invalid AffJobHistory", sidErrorLst));
		}

		return errorExceptionLst;
	}

}
