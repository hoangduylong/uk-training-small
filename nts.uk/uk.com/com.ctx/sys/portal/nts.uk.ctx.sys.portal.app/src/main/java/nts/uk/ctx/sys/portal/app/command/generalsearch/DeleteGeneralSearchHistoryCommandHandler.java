package nts.uk.ctx.sys.portal.app.command.generalsearch;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.generalsearch.GeneralSearchHistory;
import nts.uk.ctx.sys.portal.dom.generalsearch.GeneralSearchRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class DeleteGeneralSearchHistoryCommandHandler.
 * UKDesign.UniversalK.共通.CCG_メニュートップページ.CCG002_汎用検索バー.A：汎用検索.メニュー別OCD.検索の履歴を削除する
 */
@Stateless
@Transactional
public class DeleteGeneralSearchHistoryCommandHandler extends CommandHandler<GeneralSearchHistoryCommand> {

	/** The repo. */
	@Inject
	private GeneralSearchRepository repo;

	/**
	 * Handle.
	 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.汎用検索.App.削除する
	 * @param context the context
	 */
	@Override
	protected void handle(CommandHandlerContext<GeneralSearchHistoryCommand> context) {
		GeneralSearchHistoryCommand command = context.getCommand();
		this.repo.delete(GeneralSearchHistory.createFromMemento(command), AppContexts.user().companyId(), AppContexts.user().userId());
	}
	

}
