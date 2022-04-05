package nts.uk.ctx.sys.portal.app.command.toppagesetting;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPagePersonSetting;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPagePersonSettingRepository;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class CopyTopPagePersonSettingCommandHandler extends CommandHandler<TopPagePersonSettingCommand> {
	/** The repo. */
	@Inject
	private TopPagePersonSettingRepository repo;

	@Override
	protected void handle(CommandHandlerContext<TopPagePersonSettingCommand> context) {
		String companyId = AppContexts.user().companyId();
		String contractCd = AppContexts.user().contractCode();
		List<TopPagePersonSettingCommandBase> listCommand = context.getCommand().getListTopPagePersonSetting();
		if (listCommand.isEmpty()) {
			return;
		}
		List<String> listSIds = listCommand.stream()
				.map(TopPagePersonSettingCommandBase::getEmployeeId)
				.collect(Collectors.toList());
		Map<String, TopPagePersonSettingCommandBase> mapBySids = this.repo.getByCompanyIdAndEmployeeIds(
				companyId, 
				listSIds).stream()
					.map(TopPagePersonSettingCommandBase::fromDomain)
					.collect(Collectors.toMap(TopPagePersonSettingCommandBase::getEmployeeId, Function.identity()));
		List<TopPagePersonSettingCommandBase> listUpdate = listCommand.stream()
				.filter(item -> mapBySids.get(item.getEmployeeId()) != null)
				.collect(Collectors.toList());
		List<TopPagePersonSettingCommandBase> listNew = listCommand.stream()
				.filter(item -> mapBySids.get(item.getEmployeeId()) == null)
				.collect(Collectors.toList());
		if (listUpdate.size() > 0) {
			this.repo.updateAll(contractCd, companyId, listUpdate.stream()
					.map(TopPagePersonSetting::createFromMemento)
					.collect(Collectors.toList()));
		}
		if (listNew.size() > 0) {
			this.repo.insertAll(contractCd, companyId, listNew.stream()
					.map(TopPagePersonSetting::createFromMemento)
					.collect(Collectors.toList()));
		}
	}
}
