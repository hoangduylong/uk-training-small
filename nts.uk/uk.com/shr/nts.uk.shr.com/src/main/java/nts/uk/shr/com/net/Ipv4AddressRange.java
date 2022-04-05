package nts.uk.shr.com.net;

import lombok.Value;

@Value
public class Ipv4AddressRange {
	
	private final Ipv4Address start;
	
	private final Ipv4Address end;
		
	public boolean contains(Ipv4Address target) {
		return start.compareTo(target) <= 0 
			&& end.compareTo(target) >= 0;
	}
}
