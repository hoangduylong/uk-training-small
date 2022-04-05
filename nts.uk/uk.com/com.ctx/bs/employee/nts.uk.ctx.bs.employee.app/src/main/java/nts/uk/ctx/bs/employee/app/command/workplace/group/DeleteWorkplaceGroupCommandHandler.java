package nts.uk.ctx.bs.employee.app.command.workplace.group;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.AllArgsConstructor;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.task.tran.AtomTask;
import nts.uk.ctx.bs.employee.dom.workplace.group.AffWorkplaceGroupRespository;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroupRespository;
import nts.uk.ctx.bs.employee.dom.workplace.group.domainservice.DeleteWorkplaceGroupService;
import nts.uk.shr.com.context.AppContexts;
/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.就業.contexts.勤務予定.社員情報.ランク.App
 * <<Command>> 職場グループを削除する
 * @author phongtq
 *
 */
@Stateless
public class DeleteWorkplaceGroupCommandHandler extends CommandHandler<DeleteWorkplaceGroupCommand> {

	@Inject
	private AffWorkplaceGroupRespository affRepo;
	
	@Inject
	private WorkplaceGroupRespository repo;
	
	@Override
	protected void handle(CommandHandlerContext<DeleteWorkplaceGroupCommand> context) {
		
		DeleteWorkplaceGroupService.Require delRequire = new DeleteWplOfWorkGrpRequireImpl(affRepo, repo);
		
		// 1: 削除する(Require, 職場グループID): AtomTask
		// 職場グループを削除する
		AtomTask atomTask = DeleteWorkplaceGroupService.delete(delRequire, context.getCommand().getWkpGrID());
		
		// 職場グループの削除処理
		transaction.execute(() -> {
			atomTask.run();
		});
	}
		
		@AllArgsConstructor
		private static class DeleteWplOfWorkGrpRequireImpl implements DeleteWorkplaceGroupService.Require {

			@Inject
			private AffWorkplaceGroupRespository affRepo;
			
			@Inject
			private WorkplaceGroupRespository repo;

			@Override
			public void delete(String WKPGRPID) {
				String CID = AppContexts.user().companyId();
				repo.delete(CID, WKPGRPID);
				
			}

			@Override
			public void deleteByWKPGRPID(String WKPGRPID) {
				String CID = AppContexts.user().companyId();
				affRepo.deleteByWKPGRPID(CID, WKPGRPID);
			}
	}
}
