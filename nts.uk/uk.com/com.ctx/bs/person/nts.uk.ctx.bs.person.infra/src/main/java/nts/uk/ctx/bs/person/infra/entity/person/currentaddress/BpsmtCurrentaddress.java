package nts.uk.ctx.bs.person.infra.entity.person.currentaddress;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "BPSMT_CURRENT_ADDRESS")
public class BpsmtCurrentaddress extends ContractUkJpaEntity implements Serializable {
	/**
	* 
	*/
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	public BpsmtCurrentaddressPK bpsmtCurrentaddressPK;

	@Basic(optional = false)
	@Column(name = "PID")
	public String pid;

	@Basic(optional = false)
	@Column(name = "START_DATE")
	public GeneralDate startDate;

	@Basic(optional = false)
	@Column(name = "END_DATE")
	public GeneralDate endDate;

	@Basic(optional = false)
	@Column(name = "ADDRESS1")
	public String address1;

	@Basic(optional = false)
	@Column(name = "ADDRESS2")
	public String address2;

	@Basic(optional = false)
	@Column(name = "ADDRESS_KANA1")
	public String addressKana1;

	@Basic(optional = false)
	@Column(name = "ADDRESS_KANA2")
	public String addressKana2;

	@Basic(optional = false)
	@Column(name = "COUNTRY_ID")
	public String countryId;

	@Basic(optional = false)
	@Column(name = "HOME_SITUATION_TYPE")
	public String homeSituationType;

	@Basic(optional = false)
	@Column(name = "HOUSE_RENT")
	public String houseRent;

	@Basic(optional = false)
	@Column(name = "PHONE_NUMBER")
	public String phoneNumber;

	@Basic(optional = false)
	@Column(name = "POSTAL_CODE")
	public String postalCode;

	@Basic(optional = false)
	@Column(name = "PREFECTURES")
	public String prefectures;

	@Basic(optional = false)
	@Column(name = "EMAIL_ADDRESS")
	public String emailAddress;

	@Basic(optional = false)
	@Column(name = "HOUSE_TYPE")
	public String houseType;

	@Basic(optional = false)
	@Column(name = "NEAREST_STATION")
	public String nearestStation;

	@Override
	protected Object getKey() {
		// TODO Auto-generated method stub
		return bpsmtCurrentaddressPK.currentAddId;
	}

}
