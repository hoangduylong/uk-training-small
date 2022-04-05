package nts.uk.ctx.sys.gateway.infra.entity.stopbycompany;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.infra.data.jdbc.map.JpaEntityMapper;
import nts.uk.ctx.sys.gateway.dom.outage.OutageMode;
import nts.uk.ctx.sys.gateway.dom.outage.PlannedOutageState;
import nts.uk.ctx.sys.gateway.dom.outage.SystemAvailability;
import nts.uk.ctx.sys.gateway.dom.outage.company.PlannedOutageByCompany;
import nts.uk.ctx.sys.gateway.dom.stopbycompany.StopMessage;
import nts.uk.shr.com.company.CompanyId;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

/**
 * 会社単位の利用停止の設定.
 * 
 * @author sonnlb
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "SGWMT_STOP_BY_COMPANY")

public class SgwdtStopByCompany extends UkJpaEntity implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	public SgwdtStopByCompanyPK pk;

	/** システム利用状態 */
	@Column(name = "SYSTEM_STATUS_TYPE")
	public int systemStatus;

	/** 停止予告のメッセージ */
	@Column(name = "STOP_MESSAGE")
	public String stopMessage;

	/** 利用停止モード */
	@Column(name = "STOP_MODE_TYPE")
	public Integer stopMode;

	/** 利用停止のメッセージ */
	@Column(name = "USAGE_STOP_MESSAGE")
	public String usageStopMessage;
	
	public static final JpaEntityMapper<SgwdtStopByCompany> MAPPER = new JpaEntityMapper<>(SgwdtStopByCompany.class);

	@Override
	protected Object getKey() {
		return this.pk;
	}
	
	public PlannedOutageByCompany toDomain() {
		return new PlannedOutageByCompany(
				CompanyId.create(pk.contractCd, pk.companyCd), 
				new PlannedOutageState(
						EnumAdaptor.valueOf(systemStatus, SystemAvailability.class), 
						EnumAdaptor.valueOf(stopMode, OutageMode.class), 
						new StopMessage(stopMessage), 
						new StopMessage(usageStopMessage)));
	}
}
