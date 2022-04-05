package nts.uk.ctx.sys.portal.infra.entity.generalsearch;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Embeddable
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class SptdtGenericSearchHistPK implements Serializable {

	/**  serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/**  Company ID. */
	@Column(name = "CID")
	public String companyID;

	/** The user ID. */
	@Column(name = "USER_ID")
	public String userID;
	
	/** The search atr. */
	@Column(name = "SEARCH_ATR")
	public int searchCategory;
	
	/** The search content. */
	@Column(name = "SEARCH_CONTENT")
	public String contents;
}
