package nts.uk.ctx.bs.employee.app.command.workplace.group;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * 
 * @author phongtq
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResWorkplaceGroupResult {

	/** 職場グループ登録処理結果 */
	private boolean resProcessResult;
	
	/** 職場ID, 職場コード, 職場名称 */
	private List<WorkplaceParam> listWorkplaceInfo;
	
	/** 職場グループの職場入替処理結果 */
	private List<WorkplaceReplaceResultDto> replaceResult;
	
	/** List Optional<職場グループコード, 職場グループ名称> */
	private List<WorkplaceGroupResult> workplaceGroupResult;

	private String wkpgrpid;
}
