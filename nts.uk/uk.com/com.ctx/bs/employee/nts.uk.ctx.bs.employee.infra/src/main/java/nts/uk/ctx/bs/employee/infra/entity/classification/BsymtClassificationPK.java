/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package nts.uk.ctx.bs.employee.infra.entity.classification;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author NWS_THANHNC_PC
 */
@Embeddable
public class BsymtClassificationPK implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 17)
    @Column(name = "CID")
    private String cid;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 10)
    @Column(name = "CLSCD")
    private String clscd;

    public BsymtClassificationPK() {
    	super();
    }

    public BsymtClassificationPK(String cid, String clscd) {
        this.cid = cid;
        this.clscd = clscd;
    }

    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    public String getClscd() {
        return clscd;
    }

    public void setClscd(String clscd) {
        this.clscd = clscd;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (cid != null ? cid.hashCode() : 0);
        hash += (clscd != null ? clscd.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof BsymtClassificationPK)) {
            return false;
        }
        BsymtClassificationPK other = (BsymtClassificationPK) object;
        if ((this.cid == null && other.cid != null) || (this.cid != null && !this.cid.equals(other.cid))) {
            return false;
        }
        if ((this.clscd == null && other.clscd != null) || (this.clscd != null && !this.clscd.equals(other.clscd))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.BsymtClassificationPK[ cid=" + cid + ", clscd=" + clscd + " ]";
    }
    
}
