package nts.uk.shr.infra.contact.postalcode.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class CismtPostalCodePK implements Serializable{
	private static final long serialVersionUID = 1L;
	/** 郵便番号ID **/
	@Column(name = "POSTAL_ID")
	public String postalId;
	
	/** 契約コード **/
	@Column(name = "CONTRACT_CD")
	public String contractCd;
}
