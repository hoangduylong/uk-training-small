package nts.uk.ctx.sys.gateway.dom.accessrestrictions;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

import org.junit.Test;

import lombok.val;
import nts.uk.shr.com.net.Ipv4Address;

public class AllowedIPAddressTest {
	
	static class Dummy{
		private static Optional<IPAddressSetting> optIpAddress = Optional.empty();
		private static String comment = "";
	}


	@Test
	public void testIsAccessable_SPECIFIC_OK() {
		Ipv4Address targetIpAddress = Ipv4Address.parse("192.192.192.192");
		AllowedIPAddress allowedIPAddress = new AllowedIPAddress(
				IPAddressRegistrationFormat.SPECIFIC_IP_ADDRESS, 
				new IPAddressSetting(192, 192, 192, 192), 
				Dummy.optIpAddress, 
				Dummy.comment);
		
		val result = allowedIPAddress.isAccessable(targetIpAddress);
		assertThat(result).isEqualTo(true);
	}
	
	@Test
	public void testIsAccessable_SPECIFIC_NG() {
		Ipv4Address targetIpAddress = Ipv4Address.parse("255.255.255.255");
		AllowedIPAddress allowedIPAddress = new AllowedIPAddress(
				IPAddressRegistrationFormat.SPECIFIC_IP_ADDRESS, 
				new IPAddressSetting(192, 192, 192, 192), 
				Dummy.optIpAddress, 
				Dummy.comment);
		
		val result = allowedIPAddress.isAccessable(targetIpAddress);
		assertThat(result).isEqualTo(false);
	}
	
	@Test
	public void testIsAccessable_RANGE_OK() {
		Ipv4Address targetIpAddress = Ipv4Address.parse("192.192.192.192");
		AllowedIPAddress allowedIPAddress = new AllowedIPAddress(
				IPAddressRegistrationFormat.IP_ADDRESS_RANGE, 
				new IPAddressSetting(192, 192, 192, 100), 
				Optional.of(new IPAddressSetting(192, 192, 192, 200)), 
				Dummy.comment);
		
		val result = allowedIPAddress.isAccessable(targetIpAddress);
		assertThat(result).isEqualTo(true);
	}
	
	@Test
	public void testIsAccessable_RANGE_NG() {
		Ipv4Address targetIpAddress = Ipv4Address.parse("192.192.192.92");
		AllowedIPAddress allowedIPAddress = new AllowedIPAddress(
				IPAddressRegistrationFormat.IP_ADDRESS_RANGE, 
				new IPAddressSetting(192, 192, 192, 100), 
				Optional.of(new IPAddressSetting(192, 192, 192, 200)), 
				Dummy.comment);
		
		val result = allowedIPAddress.isAccessable(targetIpAddress);
		assertThat(result).isEqualTo(false);
	}
}
