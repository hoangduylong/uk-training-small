package nts.uk.ctx.bs.person.infra.entity.person.perdeletionmanage;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import nts.arc.layer.infra.data.entity.JpaEntity;
/**
 * Table 個人情報削除管理
 * @author hop.nt
 *
 */
@Entity
@Table(name="BSYMT_PER_INF_DELELE_MNG")
public class Bsymtperinfdeletemng extends JpaEntity implements Serializable{

	/**
	 * Table BSYMT_PER_INF_DELELE_MNG 個人情報削除管理
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "RECORD_ID")
	@Basic(optional = false)
	public String recordId;
	
	@Basic(optional = false)
	@Column(name = "PER_INF_CTG_ID")
	public String perInfCtgId;
	
	public Bsymtperinfdeletemng(String recordId, String perInfCtgId){
		this.recordId = recordId;
		this.perInfCtgId = perInfCtgId;
	}
	
	public Bsymtperinfdeletemng() {
		super();
	}
	@Override
	protected Object getKey() {
		// TODO Auto-generated method stub
		return recordId;
	}

}
