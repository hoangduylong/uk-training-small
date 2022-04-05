package nts.uk.ctx.sys.portal.infra.entity.standardwidget;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import lombok.NoArgsConstructor;
import nts.uk.ctx.sys.portal.dom.toppagepart.TopPagePartName;
import nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget.DetailedWorkStatusSetting;
import nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget.StandardWidget;
import nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget.StandardWidgetType;
import nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget.WorkStatusItem;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.enumcommon.NotUseAtr;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

@NoArgsConstructor
@Entity
@Table(name = "SPTMT_WIDGET_WORK")
public class SptmtWidgetWork extends UkJpaEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "CID")
	public String companyId;

	@Column(name = "TOPPAGE_PART_NAME")
	public String topPagePartName;

	@Column(name = "DAY_ERR_DISPLAY_ATR")
	public Integer dayErrDisplayAtr;

	@Column(name = "OVERTIME_DISPLAY_ATR")
	public Integer overtimeDisplayAtr;

	@Column(name = "FLEX_DISPLAY_ATR")
	public Integer flexDisplayAtr;

	@Column(name = "NIGTH_DISPLAY_ATR")
	public Integer nigthDisplayAtr;

	@Column(name = "HDTIME_DISPLAY_ATR")
	public Integer hdtimeDisplayAtr;
	
	@Column(name = "LATECOUNT_DISPLAY_ATR")
	public Integer latecountDisplayAtr;
	
	@Column(name = "HDPAID_DISPLAY_ATR")
	public Integer hdpaidDisplayAtr;
	
	@Column(name = "HDSTK_DISPLAY_ATR")
	public Integer hdstkDisplayAtr;
	
	@Column(name = "HDCOM_DISPLAY_ATR")
	public Integer hdcomDisplayAtr;
	
	@Column(name = "HDSUB_DISPLAY_ATR")
	public Integer hdsubDisplayAtr;
	
	@Column(name = "CHILD_CARE_DISPLAY_ATR")
	public Integer childDisplayAtr;
	
	@Column(name = "CARE_DISPLAY_ATR")
	public Integer careDisplayAtr;
	
	@Column(name = "HDSP1_DISPLAY_ATR")
	public Integer hdsp1DisplayAtr;
	
	@Column(name = "HDSP2_DISPLAY_ATR")
	public Integer hdsp2DisplayAtr;
	
	@Column(name = "HDSP3_DISPLAY_ATR")
	public Integer hdsp3DisplayAtr;
	
	@Column(name = "HDSP4_DISPLAY_ATR")
	public Integer hdsp4DisplayAtr;
	
	@Column(name = "HDSP5_DISPLAY_ATR")
	public Integer hdsp5DisplayAtr;
	
	@Column(name = "HDSP6_DISPLAY_ATR")
	public Integer hdsp6DisplayAtr;
	
	@Column(name = "HDSP7_DISPLAY_ATR")
	public Integer hdsp7DisplayAtr;
	
	@Column(name = "HDSP8_DISPLAY_ATR")
	public Integer hdsp8DisplayAtr;
	
	@Column(name = "HDSP9_DISPLAY_ATR")
	public Integer hdsp9DisplayAtr;
	
	@Column(name = "HDSP10_DISPLAY_ATR")
	public Integer hdsp10DisplayAtr;
	
	@Column(name = "HDSP11_DISPLAY_ATR")
	public Integer hdsp11DisplayAtr;
	
	@Column(name = "HDSP12_DISPLAY_ATR")
	public Integer hdsp12DisplayAtr;
	
	@Column(name = "HDSP13_DISPLAY_ATR")
	public Integer hdsp13DisplayAtr;
	
	@Column(name = "HDSP14_DISPLAY_ATR")
	public Integer hdsp14DisplayAtr;
	
	@Column(name = "HDSP15_DISPLAY_ATR")
	public Integer hdsp15DisplayAtr;
	
	@Column(name = "HDSP16_DISPLAY_ATR")
	public Integer hdsp16DisplayAtr;
	
	@Column(name = "HDSP17_DISPLAY_ATR")
	public Integer hdsp17DisplayAtr;
	
	@Column(name = "HDSP18_DISPLAY_ATR")
	public Integer hdsp18DisplayAtr;
	
	@Column(name = "HDSP19_DISPLAY_ATR")
	public Integer hdsp19DisplayAtr;
	
	@Column(name = "HDSP20_DISPLAY_ATR")
	public Integer hdsp20DisplayAtr;
	
	@Column(name = "CONTRACT_CD")
	public String contractCd;
	
	@PrePersist
    private void setInsertingContractInfo() {
		this.contractCd = AppContexts.user().contractCode();
	}
	
	@PreUpdate
    private void setUpdateContractInfo() {
		this.contractCd = AppContexts.user().contractCode();
	}

	@Override
	protected Object getKey() {
		return this.companyId;
	}

	public SptmtWidgetWork(StandardWidget domain) {

		this.topPagePartName = domain.getName().v();
		this.companyId = domain.getCompanyID();
		this.hdsp1DisplayAtr = 0;
		this.hdsp2DisplayAtr = 0;
		this.hdsp3DisplayAtr = 0;
		this.hdsp4DisplayAtr = 0;
		this.hdsp5DisplayAtr = 0;
		this.hdsp6DisplayAtr = 0;
		this.hdsp7DisplayAtr = 0;
		this.hdsp8DisplayAtr = 0;
		this.hdsp9DisplayAtr = 0;
		this.hdsp10DisplayAtr = 0;
		this.hdsp11DisplayAtr = 0;
		this.hdsp12DisplayAtr = 0;
		this.hdsp13DisplayAtr = 0;
		this.hdsp14DisplayAtr = 0;
		this.hdsp15DisplayAtr = 0;
		this.hdsp16DisplayAtr = 0;
		this.hdsp17DisplayAtr = 0;
		this.hdsp18DisplayAtr = 0;
		this.hdsp19DisplayAtr = 0;
		this.hdsp20DisplayAtr = 0;
		
		domain.getDetailedWorkStatusSettingList().forEach(workStatus -> {
			switch (workStatus.getItem()) {
			case DAY_ERR_DISPLAY_ATR:
				this.dayErrDisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case OVERTIME_DISPLAY_ATR:	
				this.overtimeDisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case FLEX_DISPLAY_ATR:
				this.flexDisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case NIGTH_DISPLAY_ATR:
				this.nigthDisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDTIME_DISPLAY_ATR:
				this.hdtimeDisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case LATECOUNT_DISPLAY_ATR:
				this.latecountDisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDPAID_DISPLAY_ATR:
				this.hdpaidDisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSTK_DISPLAY_ATR:
				this.hdstkDisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDCOM_DISPLAY_ATR:
				this.hdcomDisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSUB_DISPLAY_ATR:
				this.hdsubDisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case CHILD_CARE_DISPLAY_ATR:
				this.childDisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case CARE_DISPLAY_ATR:
				this.careDisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSP1_DISPLAY_ATR:
				this.hdsp1DisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSP2_DISPLAY_ATR:
				this.hdsp2DisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSP3_DISPLAY_ATR:
				this.hdsp3DisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSP4_DISPLAY_ATR:
				this.hdsp4DisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSP5_DISPLAY_ATR:
				this.hdsp5DisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSP6_DISPLAY_ATR:
				this.hdsp6DisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSP7_DISPLAY_ATR:
				this.hdsp7DisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSP8_DISPLAY_ATR:
				this.hdsp8DisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSP9_DISPLAY_ATR:
				this.hdsp9DisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSP10_DISPLAY_ATR:
				this.hdsp10DisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSP11_DISPLAY_ATR:
				this.hdsp11DisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSP12_DISPLAY_ATR:
				this.hdsp12DisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSP13_DISPLAY_ATR:
				this.hdsp13DisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSP14_DISPLAY_ATR:
				this.hdsp14DisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSP15_DISPLAY_ATR:
				this.hdsp15DisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSP16_DISPLAY_ATR:
				this.hdsp16DisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSP17_DISPLAY_ATR:
				this.hdsp17DisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSP18_DISPLAY_ATR:
				this.hdsp18DisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSP19_DISPLAY_ATR:
				this.hdsp19DisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			case HDSP20_DISPLAY_ATR:
				this.hdsp20DisplayAtr = workStatus.getDisplayType() == NotUseAtr.USE ? 1 : 0;
				break;
				
			default:
				break;
			}

		});
	}

	public StandardWidget toDomain() {
		List<DetailedWorkStatusSetting> detailedWorkStatusSettingList = new ArrayList<DetailedWorkStatusSetting>();
		
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.dayErrDisplayAtr), WorkStatusItem.DAY_ERR_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.overtimeDisplayAtr), WorkStatusItem.OVERTIME_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.flexDisplayAtr), WorkStatusItem.FLEX_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.nigthDisplayAtr), WorkStatusItem.NIGTH_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdtimeDisplayAtr), WorkStatusItem.HDTIME_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.latecountDisplayAtr), WorkStatusItem.LATECOUNT_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdpaidDisplayAtr), WorkStatusItem.HDPAID_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdstkDisplayAtr), WorkStatusItem.HDSTK_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdcomDisplayAtr), WorkStatusItem.HDCOM_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsubDisplayAtr), WorkStatusItem.HDSUB_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.childDisplayAtr), WorkStatusItem.CHILD_CARE_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.careDisplayAtr), WorkStatusItem.CARE_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsp1DisplayAtr), WorkStatusItem.HDSP1_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsp2DisplayAtr), WorkStatusItem.HDSP2_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsp3DisplayAtr), WorkStatusItem.HDSP3_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsp4DisplayAtr), WorkStatusItem.HDSP4_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsp5DisplayAtr), WorkStatusItem.HDSP5_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsp6DisplayAtr), WorkStatusItem.HDSP6_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsp7DisplayAtr), WorkStatusItem.HDSP7_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsp8DisplayAtr), WorkStatusItem.HDSP8_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsp9DisplayAtr), WorkStatusItem.HDSP9_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsp10DisplayAtr), WorkStatusItem.HDSP10_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsp11DisplayAtr), WorkStatusItem.HDSP11_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsp12DisplayAtr), WorkStatusItem.HDSP12_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsp13DisplayAtr), WorkStatusItem.HDSP13_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsp14DisplayAtr), WorkStatusItem.HDSP14_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsp15DisplayAtr), WorkStatusItem.HDSP15_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsp16DisplayAtr), WorkStatusItem.HDSP16_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsp17DisplayAtr), WorkStatusItem.HDSP17_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsp18DisplayAtr), WorkStatusItem.HDSP18_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsp19DisplayAtr), WorkStatusItem.HDSP19_DISPLAY_ATR));
		detailedWorkStatusSettingList.add(new DetailedWorkStatusSetting(NotUseAtr.valueOf(this.hdsp20DisplayAtr), WorkStatusItem.HDSP20_DISPLAY_ATR));
		
		return new StandardWidget(
								this.companyId, 
								null, 
								null, 
								new TopPagePartName(this.topPagePartName), 
								null, 
								null, 
								detailedWorkStatusSettingList,
								new ArrayList<>(), 
								StandardWidgetType.WORK_STATUS, 
								new ArrayList<>()
								);
	}

}
