package nts.uk.ctx.sys.gateway.infra.entity.accessrestrictions;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * @author thanhpv
 */
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class SgwmtAccessIpPK implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Column(name = "CONTRACT_CD")
	public String contractCd;

	@Column(name = "START_IP1")
	public Integer startIP1;
	
	@Column(name = "START_IP2")
	public Integer startIP2;
	
	@Column(name = "START_IP3")
	public Integer startIP3;
	
	@Column(name = "START_IP4")
	public Integer startIP4;
	
}
