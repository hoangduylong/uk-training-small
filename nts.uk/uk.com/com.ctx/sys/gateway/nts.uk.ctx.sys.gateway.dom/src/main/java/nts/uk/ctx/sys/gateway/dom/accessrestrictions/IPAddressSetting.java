package nts.uk.ctx.sys.gateway.dom.accessrestrictions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.layer.dom.DomainObject;
import nts.uk.shr.com.net.Ipv4Address;
import nts.uk.shr.com.security.audittrail.basic.IPAddress;

/**
 * @author thanhpv
 * @name IPアドレス設定
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.就業.contexts.勤務実績.Event.打刻管理.勤務場所.IPアドレス設定
 */
@Getter
@AllArgsConstructor
public class IPAddressSetting extends DomainObject {

	/** IPアドレス1 */
	private IPAddress ip1;

	/** IPアドレス2 */
	private IPAddress ip2;

	/** IPアドレス3 */
	private IPAddress ip3;

	/** IPアドレス4 */
	private IPAddress ip4;

	public IPAddressSetting(int ip1, int ip2, int ip3, int ip4) {
		super();
		this.ip1 = new IPAddress(ip1);
		this.ip2 = new IPAddress(ip2);
		this.ip3 = new IPAddress(ip3);
		this.ip4 = new IPAddress(ip4);
	}
	
	public String toString() {
		return this.ip1.toString() + this.ip2.toString() + this.ip3.toString() + this.ip4.toString(); 
	}
	
	public boolean compareObject(IPAddressSetting ipAddressSetting) {
		if (this.ip1.equals(ipAddressSetting.ip1)
				&& this.ip2.equals(ipAddressSetting.ip2)
				&& this.ip3.equals(ipAddressSetting.ip3)
				&& this.ip4.equals(ipAddressSetting.ip4)) {
			return true;
		} else {
			return false;
		}
	}
	
	public Ipv4Address toIpv4Address() {
		return new Ipv4Address(
				ip1.v().shortValue(), 
				ip2.v().shortValue(), 
				ip3.v().shortValue(), 
				ip4.v().shortValue());
	}
}
