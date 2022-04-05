package nts.uk.ctx.sys.gateway.app.command.cmm002;

import java.util.Optional;

import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.ctx.sys.gateway.dom.accessrestrictions.AllowedIPAddress;
import nts.uk.ctx.sys.gateway.dom.accessrestrictions.IPAddressRegistrationFormat;

/**
 * @author thanhpv 
 * @name: 許可IPアドレス
 */
@NoArgsConstructor
@Setter
public class AllowedIPAddressCommand{
	
	/** IPアドレスの登録形式 */
	public Integer ipInputType;

	/** 開始アドレス */
	public Ipv4AddressCommand startAddress;

	/** 終了アドレス */
	public Ipv4AddressCommand endAddress; 
	
	/** 備考 */
	public String comment;

	public AllowedIPAddress toDomain() {
		return new AllowedIPAddress(
				IPAddressRegistrationFormat.valueOf(this.ipInputType),
				this.startAddress.toDomain(),
				this.ipInputType == 0 ? Optional.empty()
						: Optional.of(this.endAddress.toDomain()),
				this.comment);
	}

} 