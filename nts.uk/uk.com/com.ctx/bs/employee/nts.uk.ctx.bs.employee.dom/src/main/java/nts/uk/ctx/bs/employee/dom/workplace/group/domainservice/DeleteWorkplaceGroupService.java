package nts.uk.ctx.bs.employee.dom.workplace.group.domainservice;

import nts.arc.task.tran.AtomTask;
/**
 * 職場グループを削除する
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.職場グループを削除する
 * @author phongtq
 *
 */
public class DeleteWorkplaceGroupService {
	/**
	 * 	[1] 削除する	
	 * @param require
	 * @param WKPGRPID
	 * @return
	 */
	public static AtomTask delete(Require require, String WKPGRPID){
		return AtomTask.of(() -> {
			// require.職場グループを削除する( 職場グループID )
			require.delete(WKPGRPID);
			// require.職場グループ所属情報を削除する( 職場グループID )
			require.deleteByWKPGRPID(WKPGRPID);
		});
	}
	
	public static interface Require {
		// [R-1] 職場グループを削除する
		// 職場グループRepository.delete( 会社ID, 職場グループID )
		void delete(String WKPGRPID);
		
		// [R-2] 職場グループ所属情報を削除する
		// 職場グループ所属情報Repository.delete( 会社ID, 職場グループID )	
		void deleteByWKPGRPID(String WKPGRPID);
	}
}
