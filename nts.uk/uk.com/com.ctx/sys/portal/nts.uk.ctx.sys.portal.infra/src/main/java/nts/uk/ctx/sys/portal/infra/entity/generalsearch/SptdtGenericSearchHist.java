package nts.uk.ctx.sys.portal.infra.entity.generalsearch;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Version;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.portal.dom.generalsearch.GeneralSearchHistory;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

/**
 * Instantiates a new sptdt generic search hist.
 * Entity 汎用検索の履歴
 */

@Data
@NoArgsConstructor
@Entity
@Table(name = "SPTDT_GENERIC_SEARCH_HIST")
@EqualsAndHashCode(callSuper = true)
public class SptdtGenericSearchHist extends UkJpaEntity implements GeneralSearchHistory.MementoGetter, GeneralSearchHistory.MementoSetter {

	/** The pk. */
	@EmbeddedId
	private SptdtGenericSearchHistPK pk;

    /** The version. */
    @Version
    @Column(name = "EXCLUS_VER")
    private long version;

    /** The contract cd. */
    @Basic(optional = false)
    @Column(name = "CONTRACT_CD")
    private String contractCd;
    
	/** The search date. */
	@Column(name = "SEARCH_DATE")
	public GeneralDateTime searchDate;

	/**
	 * Gets the key.
	 *
	 * @return the key
	 */
	@Override
	protected Object getKey() {
		return pk;
	}

	/**
	 * Sets the company ID.
	 *
	 * @param companyID the new company ID
	 */
	@Override
	public void setCompanyID(String companyID) {
		if (this.pk == null) {
			this.pk = new SptdtGenericSearchHistPK();
		}
		this.pk.setCompanyID(companyID);
	}

	/**
	 * Sets the user ID.
	 *
	 * @param userID the new user ID
	 */
	@Override
	public void setUserID(String userID) {
		if (this.pk == null) {
			this.pk = new SptdtGenericSearchHistPK();
		}
		this.pk.setUserID(userID);
	}

	/**
	 * Sets the search category.
	 *
	 * @param value the new search category
	 */
	@Override
	public void setSearchCategory(int value) {
		if (this.pk == null) {
			this.pk = new SptdtGenericSearchHistPK();
		}
		this.pk.setSearchCategory(value);
	}

	/**
	 * Sets the contents.
	 *
	 * @param contents the new contents
	 */
	@Override
	public void setContents(String contents) {
		if (this.pk == null) {
			this.pk = new SptdtGenericSearchHistPK();
		}
		this.pk.setContents(contents);
	}

	/**
	 * Gets the company ID.
	 *
	 * @return the company ID
	 */
	@Override
	public String getCompanyID() {
		if (this.pk != null) {
			return this.pk.companyID;
		}
		return null;
	}

	/**
	 * Gets the user ID.
	 *
	 * @return the user ID
	 */
	@Override
	public String getUserID() {
		if (this.pk != null) {
			return this.pk.userID;
		}
		return null;
	}

	/**
	 * Gets the search category.
	 *
	 * @return the search category
	 */
	@Override
	public int getSearchCategory() {
		if (this.pk != null) {
			return this.pk.searchCategory;
		}
		return 0;
	}

	/**
	 * Gets the contents.
	 *
	 * @return the contents
	 */
	@Override
	public String getContents() {
		if (this.pk != null) {
			return this.pk.contents;
		}
		return null;
	}
	
	public SptdtGenericSearchHist(SptdtGenericSearchHistPK pk, GeneralDateTime searchDate) {
		this.pk = pk;
		this.searchDate = searchDate;
	}

}
