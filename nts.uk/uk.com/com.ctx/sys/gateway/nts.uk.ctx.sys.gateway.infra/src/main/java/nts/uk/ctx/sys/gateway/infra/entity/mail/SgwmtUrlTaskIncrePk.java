package nts.uk.ctx.sys.gateway.infra.entity.mail;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
* : 主キー情報
*/
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class SgwmtUrlTaskIncrePk implements Serializable
{
    private static final long serialVersionUID = 1L;
    
    /**
    * 埋込URLID
    */
    @Basic(optional = false)
    @Column(name = "EMBEDDED_ID")
    public String embeddedId;
    
    /**
    * 会社ID
    */
    @Basic(optional = false)
    @Column(name = "CID")
    public String cid;
    
    /**
    * 
    */
    @Basic(optional = false)
    @Column(name = "TASK_INCRE_ID")
    public String taskIncreId;
    
}
