package nts.uk.ctx.sys.portal.infra.entity.notice;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.PrimaryKeyJoinColumns;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

/**
 * Entity お知らせメッセージの既読情報
 * @author DungDV
 *
 */
@Data
@Entity
@Table(name = "SPTDT_INFO_MESSAGE_READ")
@EqualsAndHashCode(callSuper = true)
public class SptdtInfoMessageRead extends UkJpaEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;

	/** 作成者ID + 入力日 + 見た社員ID */
	@EmbeddedId
	private SptdtInfoMessageReadPK pk;

	/** 排他バージョン */
	@Column(name = "EXCLUS_VER")
	private long version;
	
	/** 契約コード */
	@Column(name = "CONTRACT_CD")
	private String contractCd;
	
	/** 会社ID */
	@Column(name = "CID")
	private String companyId;
	
	@ManyToOne
	@PrimaryKeyJoinColumns({
		@PrimaryKeyJoinColumn(name = "SID", referencedColumnName = "SID"),
		@PrimaryKeyJoinColumn(name = "INPUT_DATE", referencedColumnName = "INPUT_DATE")})
	private SptdtInfoMessage sptdtInfoMessage;
	
	@Override
	protected Object getKey() {
		return this.pk;
	}

}
