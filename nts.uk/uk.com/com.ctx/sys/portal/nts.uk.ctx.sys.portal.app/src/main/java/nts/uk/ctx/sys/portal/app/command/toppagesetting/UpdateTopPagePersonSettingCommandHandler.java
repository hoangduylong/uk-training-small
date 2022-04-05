package nts.uk.ctx.sys.portal.app.command.toppagesetting;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPagePersonSetting;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPagePersonSettingRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class UpdateTopPagePersonSettingCommandHandler.
 * UKDesign.UniversalK.共通.CCG_メニュートップページ.CCG018_トップページの設定.Ｂ：トップページの割付（個人）.ユースケース.社員を選択する.システム.更新モード
 */
@Stateless
public class UpdateTopPagePersonSettingCommandHandler extends CommandHandler<TopPagePersonSettingCommandBase> {

	/** The repo. */
	@Inject
	private TopPagePersonSettingRepository repo;
	
	/**
	 * Handle.
	 *
	 * @param context the context
	 */
	@Override
	protected void handle(CommandHandlerContext<TopPagePersonSettingCommandBase> context) {
		TopPagePersonSettingCommandBase command = context.getCommand();
		this.repo.update(AppContexts.user().contractCode(), AppContexts.user().companyId(), TopPagePersonSetting.createFromMemento(command));
	}

}
