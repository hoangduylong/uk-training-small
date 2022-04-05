package nts.uk.shr.pereg.app.find;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class PeregEmpInfoQuery {
	private final String personId;
	
	private final String employeeId;
	
	private String infoId;
}
