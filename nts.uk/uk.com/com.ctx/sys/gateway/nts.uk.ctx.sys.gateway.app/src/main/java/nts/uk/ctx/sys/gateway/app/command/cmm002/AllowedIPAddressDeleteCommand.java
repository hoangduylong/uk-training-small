package nts.uk.ctx.sys.gateway.app.command.cmm002;

import lombok.Value;

@Value
public class AllowedIPAddressDeleteCommand {
	/**
	 * ・IPアドレスの制限：するしない区分
	 */
	private Integer accessLimitUseAtr;

	/**
	 * 許可IPアドレス
	 */
	private AllowedIPAddressCommand ipAddress;
	
	/**
	 * 検査対象のIPアドレス						
	 */
	private AllowedIPAddressCommand ipAddressToCheck;
}
