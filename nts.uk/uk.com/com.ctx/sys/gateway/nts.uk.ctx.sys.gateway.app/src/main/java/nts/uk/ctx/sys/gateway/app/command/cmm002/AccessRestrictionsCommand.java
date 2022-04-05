package nts.uk.ctx.sys.gateway.app.command.cmm002;

import java.util.List;
import java.util.stream.Collectors;

import lombok.NoArgsConstructor;
import nts.uk.ctx.sys.gateway.dom.accessrestrictions.AccessRestrictions;
import nts.uk.shr.com.enumcommon.NotUseAtr;

/**
 * @author thanhpv
 * @name アクセス制限
 */
@NoArgsConstructor
public class AccessRestrictionsCommand {

	/** アクセス制限機能管理区分  */
	public Integer accessLimitUseAtr;
	
	/** 契約コード  */
	public String contractCode;
	
	/** 許可IPアドレス  */
	public List<AllowedIPAddressCommand> allowedIPaddress;

	public AccessRestrictions toDomain() {
		return new AccessRestrictions(
				this.contractCode, 
				NotUseAtr.valueOf(this.accessLimitUseAtr), 
				this.allowedIPaddress.stream().map(c->c.toDomain()).collect(Collectors.toList()));
	}
	
}
