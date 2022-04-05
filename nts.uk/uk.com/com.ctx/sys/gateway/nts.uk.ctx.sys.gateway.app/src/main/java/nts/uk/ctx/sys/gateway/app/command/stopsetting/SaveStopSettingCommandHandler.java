package nts.uk.ctx.sys.gateway.app.command.stopsetting;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.gateway.dom.stopbycompany.StopByCompany;
import nts.uk.ctx.sys.gateway.dom.stopbycompany.StopByCompanyRepository;
import nts.uk.ctx.sys.gateway.dom.stopbysystem.StopBySystem;
import nts.uk.ctx.sys.gateway.dom.stopbysystem.StopBySystemRepository;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class SaveStopSettingCommandHandler extends CommandHandler<SaveStopSettingCommand> {

	@Inject
	private StopBySystemRepository systemRepo;
	@Inject
	private StopByCompanyRepository companyRepo;

	@Override
	protected void handle(CommandHandlerContext<SaveStopSettingCommand> context) {
		SaveStopSettingCommand cmd = context.getCommand();
		String contractCd = AppContexts.user().contractCode();

		StopCommand stopCmd = cmd.getStopCommand();
		if (cmd.getIsSystem() == 1) {

			// 「システム全体」の場合
			Optional<StopBySystem> systemOpt = this.systemRepo.findByKey(contractCd);
			StopBySystem systemDomain = StopBySystem.createFromJavaType(contractCd, stopCmd.getSystemStatus(),
					stopCmd.getStopMessage(), stopCmd.getStopMode(), stopCmd.getUsageStopMessage());
			// 対象レコードの存在を判別
			if (systemOpt.isPresent()) {
				// ドメインモデル「システム全体の利用停止の設定」にデータを更新する
				this.systemRepo.update(systemDomain);

			} else {
				/// ドメインモデル「システム全体の利用停止の設定」にデータを新規追加する
				this.systemRepo.insert(systemDomain);
			}
		} else {
			String companyCd = AppContexts.user().companyCode();
			// 「システム全体」の場合
			Optional<StopByCompany> companyOpt = this.companyRepo.findByKey(contractCd, companyCd);
			StopByCompany companyDomain = StopByCompany.createFromJavaType(contractCd, companyCd,
					stopCmd.getSystemStatus(), stopCmd.getStopMessage(), stopCmd.getStopMode(),
					stopCmd.getUsageStopMessage());
			// 対象レコードの存在を判別
			if (companyOpt.isPresent()) {
				// ドメインモデル「システム全体の利用停止の設定」にデータを更新する
				this.companyRepo.update(companyDomain);

			} else {
				/// ドメインモデル「システム全体の利用停止の設定」にデータを新規追加する
				this.companyRepo.insert(companyDomain);
			}
		}
	}

}
