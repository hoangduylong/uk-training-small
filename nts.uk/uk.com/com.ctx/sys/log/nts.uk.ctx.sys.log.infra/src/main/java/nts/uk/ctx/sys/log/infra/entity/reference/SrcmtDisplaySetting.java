package nts.uk.ctx.sys.log.infra.entity.reference;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.uk.ctx.sys.log.dom.reference.DataTypeEnum;
import nts.uk.ctx.sys.log.dom.reference.LogDisplaySetting;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/*
 * author: hiep.th
 */
@Entity
@Table(name = "SRCMT_DISPLAY_SETTING")
@NoArgsConstructor
@AllArgsConstructor
public class SrcmtDisplaySetting extends ContractUkJpaEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	public SrcdtLogDisplaySettingPK srcdtLogDisplaySettingPK;

	/** 会社ID */
	@Basic(optional = false)
	@Column(name = "CID")
	public String cid;

	/** コード */
	@Basic(optional = false)
	@Column(name = "CODE")
	public String code;

	/** 名称 */
	@Basic(optional = false)
	@Column(name = "NAME")
	private String name;

	/** データ種類 */
	@Basic(optional = true)
	@Column(name = "DATA_TYPE")
	private Integer dataType;

	/** 記録種類 */
	@Basic(optional = false)
	@Column(name = "RECORD_TYPE")
	private int recordType;

	/**
	 * システム種類
	 */
	@Basic(optional = false)
	@Column(name = "SYSTEM_TYPE")
	private int systemType;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "logDisplaySetCond", orphanRemoval = true, fetch = FetchType.LAZY)
	private List<SrcmtDisplayOutputItem> listLogSetOutputItems;

	@Override
	protected Object getKey() {
		return srcdtLogDisplaySettingPK;
	}

	public LogDisplaySetting toDomain() {
		return LogDisplaySetting.createFromJavatype(this.srcdtLogDisplaySettingPK.logSetId, this.cid, this.code,
				this.name, this.dataType, this.recordType,
				this.listLogSetOutputItems.stream().map(item -> item.toDomain()).collect(Collectors.toList()),
				this.systemType);
	}

	public static SrcmtDisplaySetting toEntity(LogDisplaySetting domain) {
		Optional<DataTypeEnum> optionalDataType = Optional.ofNullable(domain.getDataType());
		return new SrcmtDisplaySetting(
				new SrcdtLogDisplaySettingPK(domain.getLogSetId()), 
				domain.getCid(),
				domain.getCode().v(), 
				domain.getName().v(),
				optionalDataType.isPresent() ? domain.getDataType().code : null, 
				domain.getRecordType().code,
				domain.getSystemType().code, 
				domain.getLogSetOutputItems()
					.stream()
					.map(item -> SrcmtDisplayOutputItem.toEntity(item))
					.collect(Collectors.toList()));
	}

}
