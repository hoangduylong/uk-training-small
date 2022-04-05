package nts.uk.shr.sample.aspose;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SampleDepartment {
	
	private String name;
	private List<SampleEmployee> employees;
}
