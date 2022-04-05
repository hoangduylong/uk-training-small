package nts.uk.shr.com.net;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;

import lombok.val;

public class Ipv4AddressTest {
	
	static class Dummy{
		private static String address = "192.192.192.192";
		private static Ipv4Address ipv4Address 		= Ipv4Address.parse("192.192.192.192");
	}

	@Test
	public void testToString() {
		val result = Dummy.ipv4Address.toString();
		assertThat(result).isEqualTo(Dummy.address);
	}
	
	@Test
	public void testCompareTo_OK() {
		Ipv4Address ipv4Address 	= Ipv4Address.parse("192.192.192.192");
		Ipv4Address okAddress 		= Ipv4Address.parse("192.192.192.192");
		val result = ipv4Address.compareTo(okAddress);
		assertThat(result).isEqualTo(0);
	}

	@Test
	public void testCompareTo_Small() {
		Ipv4Address ipv4Address 	= Ipv4Address.parse("192.192.192.192");
		Ipv4Address smallAddress 	= Ipv4Address.parse("192.192.192.191");
		val result = ipv4Address.compareTo(smallAddress);
		assertThat(result).isGreaterThan(0);
	}

	@Test
	public void testCompareTo_Big() {
		Ipv4Address ipv4Address 	= Ipv4Address.parse("192.192.192.192");
		Ipv4Address bigAddress 		= Ipv4Address.parse("192.192.192.193");
		val result = ipv4Address.compareTo(bigAddress);
		assertThat(result).isLessThan(0);
	}
}
