package nts.uk.ctx.sys.gateway.dom.accessrestrictions;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.Test;

import lombok.val;
import mockit.Mocked;
import nts.arc.testing.assertion.NtsAssert;
import nts.uk.shr.com.enumcommon.NotUseAtr;
import nts.uk.shr.com.net.Ipv4Address;

public class AccessRestrictionsTest {
	@Mocked AllowedIPAddress allowedIPAddress;
	
	static class Dummy{
		private static String tenantCode = "000000000000";
		private static IPAddressRegistrationFormat ipInputType = IPAddressRegistrationFormat.valueOf(0);
		private static AllowedIPAddress ip1 = new AllowedIPAddress(ipInputType, new IPAddressSetting(1, 0, 0, 0), Optional.empty(), null);
		private static AllowedIPAddress ip2 = new AllowedIPAddress(ipInputType, new IPAddressSetting(0, 1, 0, 0), Optional.empty(), null);
		private static AllowedIPAddress ip3 = new AllowedIPAddress(ipInputType, new IPAddressSetting(0, 0, 1, 0), Optional.empty(), null);
		private static AllowedIPAddress ip4 = new AllowedIPAddress(ipInputType, new IPAddressSetting(0, 0, 0, 1), Optional.empty(), null);
		private static AllowedIPAddress ip5 = new AllowedIPAddress(ipInputType, new IPAddressSetting(0, 0, 0, 0), Optional.empty(), null);
		private static AllowedIPAddress ip6 = new AllowedIPAddress(IPAddressRegistrationFormat.IP_ADDRESS_RANGE, new IPAddressSetting(0, 0, 0, 1), Optional.of(new IPAddressSetting(0, 0, 1, 0)), null);
		private static AllowedIPAddress ip7 = new AllowedIPAddress(IPAddressRegistrationFormat.IP_ADDRESS_RANGE, new IPAddressSetting(1, 1, 1, 0), Optional.of(new IPAddressSetting(1, 1, 1, 9)), null);
		private static AllowedIPAddress ipToCheck = new AllowedIPAddress(ipInputType, new IPAddressSetting(1, 1, 1, 1), Optional.empty(), "local IP");
		
		private static Ipv4Address address = Ipv4Address.parse("255.255.255.255");
		private static AllowedIPAddress allowedAddress = new AllowedIPAddress(ipInputType, new IPAddressSetting(255, 255, 255, 255), Optional.empty(), null);
		private static List<AllowedIPAddress> whiteList = new ArrayList<AllowedIPAddress>();
	}
	
	@Test
	public void getter() {
		AccessRestrictions e = new AccessRestrictions(Dummy.tenantCode, NotUseAtr.NOT_USE, new ArrayList<AllowedIPAddress>());
		NtsAssert.invokeGetters(e);
	}
	
	@Test
	public void addIPAddress() {
		AccessRestrictions e = new AccessRestrictions(Dummy.tenantCode, NotUseAtr.NOT_USE, new ArrayList<AllowedIPAddress>());
		e.addIPAddress(Dummy.ip1, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		e.addIPAddress(Dummy.ip2, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		e.addIPAddress(Dummy.ip3, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		e.addIPAddress(Dummy.ip4, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		e.addIPAddress(Dummy.ip5, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		e.addIPAddress(Dummy.ipToCheck, NotUseAtr.NOT_USE, Dummy.ipToCheck);
	}
	
	@Test
	public void addIPAddressEx1835() {
		AccessRestrictions e = new AccessRestrictions(Dummy.tenantCode, NotUseAtr.USE, new ArrayList<AllowedIPAddress>());
		e.addIPAddress(Dummy.ip1, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		e.addIPAddress(Dummy.ip5, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		NtsAssert.businessException("Msg_1835",
				() -> e.addIPAddress(Dummy.ip5, NotUseAtr.NOT_USE, Dummy.ipToCheck));
	}
	
	@Test
	public void addIPAddressEx2187() {
		AccessRestrictions e = new AccessRestrictions(Dummy.tenantCode, NotUseAtr.USE, new ArrayList<AllowedIPAddress>());
		NtsAssert.businessException("Msg_2187", () -> e.addIPAddress(Dummy.ip1, NotUseAtr.USE, Dummy.ipToCheck));
		e.addIPAddress(Dummy.ipToCheck, NotUseAtr.USE, Dummy.ipToCheck);
	}
	
	@Test
	public void addIPAddressEx2187WithRange() {
		AccessRestrictions e = new AccessRestrictions(Dummy.tenantCode, NotUseAtr.USE, new ArrayList<AllowedIPAddress>());
		NtsAssert.businessException("Msg_2187", () -> e.addIPAddress(Dummy.ip6, NotUseAtr.USE, Dummy.ipToCheck));
		e.addIPAddress(Dummy.ip7, NotUseAtr.USE, Dummy.ipToCheck);
	}
	
	@Test
	public void updateIPAddress() {
		AccessRestrictions e = new AccessRestrictions(Dummy.tenantCode, NotUseAtr.USE, new ArrayList<AllowedIPAddress>());
		e.addIPAddress(Dummy.ip1, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		e.addIPAddress(Dummy.ip2, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		e.updateIPAddress(Dummy.ip1,Dummy.ip3, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		assertThat(e.getWhiteList().get(0)).isEqualTo(Dummy.ip3);
	}
	
	@Test
	public void updateIPAddressEx1835() {
		AccessRestrictions e = new AccessRestrictions(Dummy.tenantCode, NotUseAtr.USE, new ArrayList<AllowedIPAddress>());
		e.addIPAddress(Dummy.ip1, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		e.addIPAddress(Dummy.ip2, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		NtsAssert.businessException("Msg_1835", 
				() -> e.updateIPAddress(Dummy.ip2,Dummy.ip1, NotUseAtr.NOT_USE, Dummy.ipToCheck));
	}
	
	@Test
	public void updateIPAddressEx2187() {
		AccessRestrictions e = new AccessRestrictions(Dummy.tenantCode, NotUseAtr.USE, new ArrayList<AllowedIPAddress>());
		e.addIPAddress(Dummy.ip1, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		e.addIPAddress(Dummy.ip2, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		NtsAssert.businessException("Msg_2187", () -> e.updateIPAddress(Dummy.ip1, Dummy.ip3, NotUseAtr.USE, Dummy.ipToCheck));
		e.updateIPAddress(Dummy.ip2, Dummy.ipToCheck, NotUseAtr.USE, Dummy.ipToCheck);
	}
	
	@Test
	public void updateIPAddressEx2187WithRange() {
		AccessRestrictions e = new AccessRestrictions(Dummy.tenantCode, NotUseAtr.USE, new ArrayList<AllowedIPAddress>());
		e.addIPAddress(Dummy.ip1, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		e.addIPAddress(Dummy.ip2, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		NtsAssert.businessException("Msg_2187", () -> e.updateIPAddress(Dummy.ip1, Dummy.ip6, NotUseAtr.USE, Dummy.ipToCheck));
		e.updateIPAddress(Dummy.ip2, Dummy.ip7, NotUseAtr.USE, Dummy.ipToCheck);
	}
	
	@Test
	public void delIPAddress() {
		AccessRestrictions e = new AccessRestrictions(Dummy.tenantCode, NotUseAtr.USE, new ArrayList<AllowedIPAddress>());
		e.addIPAddress(Dummy.ip1, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		e.addIPAddress(Dummy.ip2, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		e.deleteIPAddress(Dummy.ip1.getStartAddress(), NotUseAtr.NOT_USE, Dummy.ipToCheck);
	}
	
	@Test
	public void delIPAddressNotUseAtr() {
		AccessRestrictions e = new AccessRestrictions(Dummy.tenantCode, NotUseAtr.USE, new ArrayList<AllowedIPAddress>());
		e.addIPAddress(Dummy.ip1, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		e.deleteIPAddress(Dummy.ip1.getStartAddress(), NotUseAtr.NOT_USE, Dummy.ipToCheck);
	}
	
	@Test
	public void delIPAddressEx2187() {
		AccessRestrictions e = new AccessRestrictions(Dummy.tenantCode, NotUseAtr.USE, new ArrayList<AllowedIPAddress>());
		e.addIPAddress(Dummy.ip1, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		e.addIPAddress(Dummy.ipToCheck, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		NtsAssert.businessException("Msg_2187", 
				() -> e.deleteIPAddress(Dummy.ipToCheck.getStartAddress(), NotUseAtr.USE, Dummy.ipToCheck));
	}
	
	@Test
	public void delIPAddressEx2187WithRange() {
		AccessRestrictions e = new AccessRestrictions(Dummy.tenantCode, NotUseAtr.NOT_USE, new ArrayList<AllowedIPAddress>());
		e.addIPAddress(Dummy.ip6, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		e.addIPAddress(Dummy.ip7, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		NtsAssert.businessException("Msg_2187", 
				() -> e.deleteIPAddress(Dummy.ip7.getStartAddress(), NotUseAtr.USE, Dummy.ipToCheck));
	}
	
	@Test
	public void AccessRestrictions() {
		AccessRestrictions e = AccessRestrictions.createEmpty(Dummy.tenantCode);
		assertThat(e.getWhiteList()).isEmpty();
		assertThat(e.getAccessLimitUseAtr().equals(NotUseAtr.NOT_USE)).isTrue();
	}

	@Test
	public void testIsAccessable_NotUse() {
		AccessRestrictions restrictions = new AccessRestrictions(
				Dummy.tenantCode, 
				NotUseAtr.NOT_USE, 
				Dummy.whiteList);
		
		val result = restrictions.isAccessable(Dummy.address);
		assertThat(result).isEqualTo(true);
	}
	
	@Test
	public void testIsAccessable_USE() {
		AccessRestrictions restrictions_OK = new AccessRestrictions(
				Dummy.tenantCode, 
				NotUseAtr.USE, 
				Dummy.whiteList);

		boolean result = restrictions_OK.isAccessable(Dummy.address);
		assertThat(result).isEqualTo(false);
		
		restrictions_OK.addIPAddress(Dummy.allowedAddress, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		result = restrictions_OK.isAccessable(Dummy.address);
		assertThat(result).isEqualTo(true);
	}
	
	@Test
	public void testSortedList() {
		AccessRestrictions restrictions = AccessRestrictions.createEmpty(Dummy.tenantCode);
		restrictions.addIPAddress(Dummy.ip3, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		restrictions.addIPAddress(Dummy.ip1, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		restrictions.addIPAddress(Dummy.ip2, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		restrictions.addIPAddress(Dummy.ip6, NotUseAtr.NOT_USE, Dummy.ipToCheck);
		assertThat(restrictions.getWhiteList()).isEqualTo(Arrays.asList(Dummy.ip6, Dummy.ip3, Dummy.ip2, Dummy.ip1));
	}
}
