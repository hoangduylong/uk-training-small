package nts.uk.ctx.sys.log.infra.entity.reference;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/*
 * author: hiep.th
 */

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class SrcmtLogOutputItemPK implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Basic(optional=false)
	@Column(name = "ITEM_NO")
    public int itemNo;
	
	@Basic(optional=false)
	@Column(name = "RECORD_TYPE")
    public int recordType;
	
}
