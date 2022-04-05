package nts.uk.ctx.bs.employee.dom.department.master;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;

/**
 * 部門多言語表示名
 * @author HungTT
 *
 */

@Getter
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class DepartmentMultilingualDisplayName extends AggregateRoot {

	private String departmentHistoryId;

	private String departmentId;

	private DepartmentName departmentName;

	private DepartmentGeneric departmentGeneric;

	private DepartmentDisplayName departmentDisplayName;

	private String languageId;

}
