package nts.uk.shr.sample.batchserver;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class BatchResult {
	
	private boolean success;
	
	private String message;

}
