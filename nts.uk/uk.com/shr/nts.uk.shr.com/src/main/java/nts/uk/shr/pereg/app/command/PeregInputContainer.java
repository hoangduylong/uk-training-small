package nts.uk.shr.pereg.app.command;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PeregInputContainer {
	
	private String personId;
	
	private String employeeId;

	private List<ItemsByCategory> inputs;
}
