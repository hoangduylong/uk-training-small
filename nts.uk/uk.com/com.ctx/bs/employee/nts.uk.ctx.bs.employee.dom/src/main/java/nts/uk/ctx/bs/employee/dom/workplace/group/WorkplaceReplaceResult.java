package nts.uk.ctx.bs.employee.dom.workplace.group;

import java.util.Optional;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import nts.arc.enums.EnumAdaptor;
import nts.arc.task.tran.AtomTask;

/**
 * @author phongtq
 * 職場グループの職場入替処理結果
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.職場グループの職場入替処理結果
 *
 */
@Getter
@RequiredArgsConstructor
public class WorkplaceReplaceResult {

	/** 処理結果 */
	private final WorkplaceReplacement workplaceReplacement;

	/** 所属済み職場グループID */
	private final Optional<String> workplaceGroupId;

	/** 永続化処理 */
	private final Optional<AtomTask> persistenceProcess;

	// [C-1] 追加する
	public static WorkplaceReplaceResult add(AtomTask persistenceProcess) {
		return new WorkplaceReplaceResult(
				EnumAdaptor.valueOf(WorkplaceReplacement.ADD.value, WorkplaceReplacement.class), Optional.empty(), Optional.ofNullable(persistenceProcess));
	}

	// [C-2] 削除する
	public static WorkplaceReplaceResult delete(AtomTask persistenceProcess) {
		return new WorkplaceReplaceResult(
				EnumAdaptor.valueOf(WorkplaceReplacement.DELETE.value, WorkplaceReplacement.class), Optional.empty(), Optional.ofNullable(persistenceProcess));
	}

	// [C-3] 所属済み
	public static WorkplaceReplaceResult alreadyBelong(String wKPGRPID) {
		return new WorkplaceReplaceResult(
				EnumAdaptor.valueOf(WorkplaceReplacement.ALREADY_BELONGED.value, WorkplaceReplacement.class), Optional.ofNullable(wKPGRPID) ,
				Optional.empty());
	}

	// [C-4] 別職場グループに所属
	public static WorkplaceReplaceResult belongAnother(String wKPGRPID) {
		return new WorkplaceReplaceResult(
				EnumAdaptor.valueOf(WorkplaceReplacement.BELONGED_ANOTHER.value, WorkplaceReplacement.class), Optional.ofNullable(wKPGRPID) ,
				Optional.empty());
	}
}
