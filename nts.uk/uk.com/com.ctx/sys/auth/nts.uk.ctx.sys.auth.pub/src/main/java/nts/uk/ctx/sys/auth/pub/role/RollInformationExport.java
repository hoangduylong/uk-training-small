/**
 * 
 */
package nts.uk.ctx.sys.auth.pub.role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author laitv
 * ロール情報
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RollInformationExport {
	Boolean roleCharge; // 担当ロールか
	String roleId;      // ロールID
}
