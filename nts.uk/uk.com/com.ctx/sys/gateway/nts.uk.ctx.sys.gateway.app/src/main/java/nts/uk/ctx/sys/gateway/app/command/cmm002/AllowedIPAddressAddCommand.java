package nts.uk.ctx.sys.gateway.app.command.cmm002;

import lombok.Value;

@Value
public class AllowedIPAddressAddCommand {
	/**
	 * ・IPアドレスの制限：するしない区分
	 */
	public Integer accessLimitUseAtr;

	/**
	 * ・ドメイン：許可IPアドレス
	 */
	public AllowedIPAddressCommand allowedIPAddress;
	
	/**
	 * 検査対象のIPアドレス						
	 */
	public AllowedIPAddressCommand ipAddressToCheck;
}
