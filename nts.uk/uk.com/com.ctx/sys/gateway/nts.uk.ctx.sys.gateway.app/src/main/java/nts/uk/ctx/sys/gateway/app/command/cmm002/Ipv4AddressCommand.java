package nts.uk.ctx.sys.gateway.app.command.cmm002;

import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.ctx.sys.gateway.dom.accessrestrictions.IPAddressSetting;

/**
 * @author thanhpv
 * @name IPアドレス設定
 */
@NoArgsConstructor
@Setter
public class Ipv4AddressCommand {

	/** ネットワーク部1 */
	private short net1;

	/** ネットワーク部2 */
	private short net2;

	/** ホスト部1 */
	private short host1;

	/** ホスト部2 */
	private short host2;

	public IPAddressSetting toDomain() {
		return new IPAddressSetting(this.net1, this.net2, this.host1, this.host2);
	}
	
}
