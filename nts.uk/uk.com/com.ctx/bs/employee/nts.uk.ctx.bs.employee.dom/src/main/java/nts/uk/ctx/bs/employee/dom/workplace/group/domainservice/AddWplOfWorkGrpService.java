package nts.uk.ctx.bs.employee.dom.workplace.group.domainservice;

import java.util.Optional;

import nts.arc.task.tran.AtomTask;
import nts.uk.ctx.bs.employee.dom.workplace.group.AffWorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroup;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceReplaceResult;
/**
 * 職場グループに所属する職場を追加する
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.職場グループに所属する職場を追加する
 *
 * @author phongtq
 *
 */
public class AddWplOfWorkGrpService {
	/**
	 * 	[1] 追加する
	 * @param require
	 * @param group
	 * @param workplaceId
	 * @return
	 */
	public static WorkplaceReplaceResult addWorkplace(Require require, WorkplaceGroup group, String workplaceId) {
		// require.職場グループ所属情報を取得する( 職場ID )
		Optional<AffWorkplaceGroup> formerAffInfo = require.getByWKPID(workplaceId);
		// if $旧所属情報.isPresent()
		if (formerAffInfo.isPresent()) {
			// if $旧所属情報.職場グループID == 職場グループ.職場グループID
			if (formerAffInfo.get().getWorkplaceGroupId().equals(group.getId())) {
				// return 職場グループの職場入替処理結果#所属済み()
				return WorkplaceReplaceResult.alreadyBelong(formerAffInfo.get().getWorkplaceGroupId());
			} else {
				// return 職場グループの職場入替処理結果#別職場に所属()
				return WorkplaceReplaceResult.belongAnother(formerAffInfo.get().getWorkplaceGroupId());
			}
		}
		AtomTask atomTaks = AtomTask.of(() -> {
			// $職場グループ所属情報 = 職場グループ.所属する職場を追加する( 職場ID )
			AffWorkplaceGroup affWorkplaceGroup = group.addAffWorkplaceGroup(workplaceId);

			// require.職場グループに職場を追加する( $職場グループ所属情報 )
			require.insert(affWorkplaceGroup);
		});
		// 	return 職場グループの職場入替処理結果#追加する( $AtomTask )
		return WorkplaceReplaceResult.add(atomTaks);
	}

	public static interface Require {
		// [R-1] 職場グループ所属情報を取得する
		// 職場グループ所属情報Repository.get( 会社ID, 職場ID )
		Optional<AffWorkplaceGroup> getByWKPID(String WKPID);

		// [R-2] 職場グループに職場を追加する
		// 	職場グループ所属情報Repository.insert( 職場グループ所属情報 )
		public void insert(AffWorkplaceGroup affWorkplaceGroup);
	}
}
