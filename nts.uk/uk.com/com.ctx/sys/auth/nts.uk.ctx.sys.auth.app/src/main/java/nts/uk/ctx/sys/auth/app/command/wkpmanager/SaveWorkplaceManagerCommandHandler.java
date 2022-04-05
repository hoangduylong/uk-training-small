package nts.uk.ctx.sys.auth.app.command.wkpmanager;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.gul.collection.CollectionUtil;
import nts.gul.text.IdentifierUtil;
import nts.uk.ctx.sys.auth.app.find.wkpmanager.dto.WorkplaceAuthorityDto;
import nts.uk.ctx.sys.auth.dom.wkpmanager.WorkplaceManager;
import nts.uk.ctx.sys.auth.dom.wkpmanager.WorkplaceManagerRepository;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.DailyPerformanceFunctionNo;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceAuthority;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceAuthorityRepository;
import nts.uk.shr.com.context.AppContexts;
import nts.arc.time.calendar.period.DatePeriod;

@Stateless
public class SaveWorkplaceManagerCommandHandler extends CommandHandlerWithResult<SaveWorkplaceManagerCommand, String> {

	// Inject repository
	@Inject
	private WorkplaceManagerRepository wkpManagerRepo;

	@Inject
	private WorkPlaceAuthorityRepository wkpAuthorityRepo;
	
	@Override
	protected String handle(CommandHandlerContext<SaveWorkplaceManagerCommand> context) {
		SaveWorkplaceManagerCommand command = context.getCommand();
		command.setWkpManagerId(command.isNewMode() ? IdentifierUtil.randomUniqueId() : command.getWkpManagerId());
		/*
		 * ダイアログ「新規用更新前チェック」を実行する
		 */
		WorkplaceManager wkpManager = new WorkplaceManager(
				command.getWkpManagerId(),
				command.getEmployeeId(),
				command.getWkpId(),
				new DatePeriod(command.getStartDate(), command.getEndDate())
				);
		
		wkpManager.validate();
		
		/*
		 * 日でも重ならないようにチェックする
		 */
		List<WorkplaceManager> wkpManagerList = this.wkpManagerRepo
				.getWkpManagerBySIdWkpId(command.getEmployeeId(), command.getWkpId());
		if (!CollectionUtil.isEmpty(wkpManagerList)) {
			for (WorkplaceManager manager : wkpManagerList) {
				if (!command.isNewMode() && command.getWkpManagerId().equals(manager.getWorkplaceManagerId())) {
					continue;
				}
				if (!(wkpManager.getHistoryPeriod().end().before(manager.getHistoryPeriod().start())
						|| manager.getHistoryPeriod().end().before(wkpManager.getHistoryPeriod().start()))) {
					throw new BusinessException("Msg_619");
				}
			}
		}
		if (command.isNewMode()) {
			/*
			 * ドメインモデル「職場管理者」を新規追加する
			 */
			this.wkpManagerRepo.add(wkpManager);
			/*
			 * ドメインモデル「所属職場権限」を登録する
			 */
			if (!CollectionUtil.isEmpty(command.getRoleList())) {
				for (WorkplaceAuthorityDto dto : command.getRoleList()) {
					WorkPlaceAuthority wkpAuthority = new WorkPlaceAuthority(
														command.getWkpManagerId(),
														AppContexts.user().companyId(),
														new DailyPerformanceFunctionNo(dto.getFunctionNo()),
														dto.isAvailability()
													);
					this.wkpAuthorityRepo.addWorkPlaceAuthority(wkpAuthority);
				}
			}
		} else {
			this.wkpManagerRepo.update(wkpManager);
			
			if (!CollectionUtil.isEmpty(command.getRoleList())) {
				for (WorkplaceAuthorityDto dto : command.getRoleList()) {
					WorkPlaceAuthority wkpAuthority = new WorkPlaceAuthority(
														command.getWkpManagerId(),
														AppContexts.user().companyId(),
														new DailyPerformanceFunctionNo(dto.getFunctionNo()),
														dto.isAvailability()
													);
					this.wkpAuthorityRepo.updateWorkPlaceAuthority(wkpAuthority);
				}
			}
		}
		return wkpManager.getWorkplaceManagerId();
	}
}
