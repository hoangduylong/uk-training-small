package nts.uk.ctx.bs.employee.dom.workplace.group;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;
/**
 * 職場グループ名称 
 * @author phongtq
 *
 */
@StringMaxLength(20)
public class WorkplaceGroupName extends StringPrimitiveValue<WorkplaceGroupName> {

	private static final long serialVersionUID = 1L;

	public WorkplaceGroupName(String rawValue) {
		super(rawValue);
	}
}
