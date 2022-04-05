package nts.uk.ctx.bs.employee.app.command.workplace;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SaveWorkplaceHierarchyCommand {
	
	/** The list workplace hierarchy dto. */
	private List<SaveWorkplaceHierarchyDto> listWorkplaceHierarchyDto;

}
