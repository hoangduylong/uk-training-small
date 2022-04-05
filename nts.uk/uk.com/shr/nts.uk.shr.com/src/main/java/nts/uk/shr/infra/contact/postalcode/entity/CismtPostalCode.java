package nts.uk.shr.infra.contact.postalcode.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

/**
 * 
 * @author yennth
 *
 */
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "CISMT_POSTAL_CODE")
public class CismtPostalCode extends UkJpaEntity implements Serializable{
	private static final long serialVersionUID = 1L;
	@EmbeddedId
	public CismtPostalCodePK cismtPostalCodePK;
	
	/**
	 * 
	 */
	@Column(name = "POSTAL_CODE")
	public String postCode;
	
	@Column(name = "CITY")
	public String city;
	
	@Column(name = "CITY_KNNAME")
	public String cityKanaName;
	
	@Column(name = "TOWN_AREA")
	public String townArea;
	 
	@Column(name = "TOWN_AREA_KNNAME")
	public String townAreaKana;
	
	@Column(name = "STATE_PROVINCE")
	public String stateProvince;
	
	@Column(name = "STATE_PROVINCE_KNNAME")
	public String stateProvinceKana;
	
	@Override
	protected Object getKey() {
		return cismtPostalCodePK;
	}
	
}
