package nts.uk.shr.com.security.ipaddress;

import nts.uk.shr.com.net.Ipv4Address;

public interface ValidateIpAddressService {
	boolean validate(Ipv4Address targetIpAddress);
}
