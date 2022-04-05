package nts.uk.ctx.sys.gateway.dom.accessrestrictions;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;

import lombok.val;
import nts.uk.shr.com.net.Ipv4Address;

public class IPAddressSettingTest {

	@Test
	public void testToIpv4Address() {
		IPAddressSetting addressSetting = new IPAddressSetting(192, 192, 192, 192);
		Ipv4Address addressRange = Ipv4Address.parse("192.192.192.192");
		val result = addressSetting.toIpv4Address();
		assertThat(result).isEqualTo(addressRange);
	}
}
