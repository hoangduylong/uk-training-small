package nts.uk.shr.sample.aspose;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SampleEmployee {

	private String empCode;
	private String empName;
	private int man1; 
	private int sen5;
	private int sen2;
	private int sen1;
	private int hyaku5;
	
	public long toMoney() {
		return man1 * 10000L + sen5 * 5000L + sen2 * 2000L + sen1 * 1000L + hyaku5 * 500L; 
	}
}
