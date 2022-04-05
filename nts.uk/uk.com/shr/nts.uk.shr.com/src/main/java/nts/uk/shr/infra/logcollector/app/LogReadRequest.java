package nts.uk.shr.infra.logcollector.app;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogReadRequest {

	private GeneralDateTime start;
	
	private GeneralDateTime end;
	
	private List<String> domains; 
	
	private List<String> hosts;
}
