package nts.uk.shr.com.net;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;

import lombok.val;

public class Ipv4AddressRangeTest {

	@Test
	public void testContains_OK() {
		Ipv4Address targetAddress 	= Ipv4Address.parse("192.192.192.192");
		Ipv4Address okStartAddress	= Ipv4Address.parse("192.192.192.191");
		Ipv4Address okEndAddress 	= Ipv4Address.parse("192.192.192.193");
		Ipv4AddressRange addressRange = new Ipv4AddressRange(okStartAddress, okEndAddress);
		val result = addressRange.contains(targetAddress);
		assertThat(result).isEqualTo(true);
	}
	
	@Test
	public void testContains_NG() {
		Ipv4Address targetAddress 	= Ipv4Address.parse("192.192.192.192");
		Ipv4Address ngStartAddress 	= Ipv4Address.parse("192.192.192.100");
		Ipv4Address ngEndAddress 	= Ipv4Address.parse("192.192.192.150");
		Ipv4AddressRange addressRange = new Ipv4AddressRange(ngStartAddress, ngEndAddress);
		val result = addressRange.contains(targetAddress);
		assertThat(result).isEqualTo(false);
	}
}
