package nts.uk.shr.infra.logcollector.dom;

import java.util.Optional;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class LogAccessInfo {

	private final String domain;
	
	private final String host;
	
	private final Optional<String> userName;
	
	private final Optional<String> password;
	
	private final Optional<String> location;
}
