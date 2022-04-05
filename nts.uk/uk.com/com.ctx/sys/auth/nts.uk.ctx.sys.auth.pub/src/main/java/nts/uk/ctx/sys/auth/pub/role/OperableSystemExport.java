package nts.uk.ctx.sys.auth.pub.role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 
 * @author HungTT - 操作できるシステム種類
 */

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OperableSystemExport {

	// オフィスヘルパー
	private boolean officeHelper;
	// 人事システム
	private boolean humanResource;
	// 勤怠システム
	private boolean attendance;
	// 給与システム
	private boolean salary;

}
