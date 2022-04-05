package nts.uk.ctx.sys.gateway.app.command.cmm002;

import lombok.Setter;

@Setter
public class AllowedIPAddressUpdateCommand {
	
	/**
	 * ・IPアドレスの制限：するしない区分
	 */
	public Integer accessLimitUseAtr;

	/**
	 * ・ドメイン：許可IPアドレス_NEW
	 */
	public AllowedIPAddressCommand allowedIPAddressNew;
	
	/**
	 * ・ドメイン：許可IPアドレス_OLD
	 */
	public AllowedIPAddressCommand allowedIPAddressOld;
	
	/**
	 * 検査対象のIPアドレス						
	 */
	public AllowedIPAddressCommand ipAddressToCheck;
}
