package nts.uk.ctx.bs.employee.app.find.employeeinfo.workplacegroup;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import nts.uk.ctx.bs.employee.dom.workplace.group.WorkplaceGroup;

/**
 * @author anhdt
 *
 */
@Data
public class WorkplaceGroupDto {

	private List<IWorkplace> workplaces = new ArrayList<>();

	public WorkplaceGroupDto(List<WorkplaceGroup> wkpGroups) {
		for (WorkplaceGroup dom: wkpGroups) {
			this.workplaces.add(new IWorkplace(dom));
		}
	}

	public WorkplaceGroupDto(WorkplaceGroup dom) {
			this.workplaces.add(new IWorkplace(dom));
	}

	@Data
	class IWorkplace {
		private String id;
		private String code;
		private String name;
		private Integer type;

		public IWorkplace(WorkplaceGroup dom) {
			this.id = dom.getId();
			this.code = dom.getCode().v();
			this.name = dom.getName().v();
			this.type = dom.getType().value;
		}
	}

}
