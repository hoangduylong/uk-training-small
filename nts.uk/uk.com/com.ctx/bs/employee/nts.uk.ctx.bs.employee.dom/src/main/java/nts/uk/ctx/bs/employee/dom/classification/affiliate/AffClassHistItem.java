/**
 * 
 */
package nts.uk.ctx.bs.employee.dom.classification.affiliate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.ctx.bs.employee.dom.classification.ClassificationCode;

/**
 * @author danpv
 *
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AffClassHistItem extends AggregateRoot {

	private String employeeId;

	private String historyId;

	private ClassificationCode classificationCode;

	public static AffClassHistItem createFromJavaType(String employeeId, String historyId,
			String classificationCode) {
		return new AffClassHistItem(employeeId, historyId, new ClassificationCode(classificationCode));
	}

}
