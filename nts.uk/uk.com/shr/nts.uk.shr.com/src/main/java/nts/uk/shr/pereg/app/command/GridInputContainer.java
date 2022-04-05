package nts.uk.shr.pereg.app.command;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GridInputContainer {
	
	private GeneralDate baseDate;
	
	private int editMode;
	
	private List<EmployeeInputContainer> employees;
}
