package nts.uk.ctx.sys.portal.infra.entity.standardwidget;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.ctx.sys.portal.dom.toppagepart.TopPagePartName;
import nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget.ApplicationStatusDetailedSetting;
import nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget.ApplicationStatusWidgetItem;
import nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget.DetailStandardWidgetTypeSetting;
import nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget.StandardWidget;
import nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget.StandardWidgetType;
import nts.uk.shr.com.enumcommon.NotUseAtr;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * 
 * @author sonnlb
 *
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "SPTMT_WIDGET_APP")
public class SptmtAppWidget extends ContractUkJpaEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	/**
	 * 会社ID
	 */
	@Id
	@Column(name = "CID")
	public String companyId;
	/**
	 * 名称
	 */
	@Column(name = "TOPPAGE_PART_NAME")
	public String topPagePartName;

	/**
	 * 承認された件数の表示区分
	 */
	@Column(name = "APPROVE_DISPLAY_ATR")
	public Integer approveDisplayAtr;

	/**
	 * 未承認件数の表示区分
	 */
	@Column(name = "UNAPPROVE_DISPLAY_ATR")
	public Integer unApproveDisplayAtr;

	/**
	 * 否認された件数の表示区分
	 */
	@Column(name = "DENIAL_DISPLAY_ATR")
	public Integer denialDisplayAtr;

	/**
	 * 差し戻し件数の表示区分
	 */
	@Column(name = "REMAND_DISPLAY_ATR")
	public Integer remandDisplayAtr;

	/**
	 * 今月の申請締め切り日の表示区分
	 */
	@Column(name = "APPLIMIT_DISPLAY_ATR")
	public Integer applimitDisplayAtr;

	@Override
	protected Object getKey() {
		return this.companyId;
	}

	public StandardWidget toDomain() {

		StandardWidget standardWidget = new StandardWidget(companyId);
		
		List<ApplicationStatusDetailedSetting> appStatusSettings = new ArrayList<>();

		ApplicationStatusDetailedSetting approveDisplay = new ApplicationStatusDetailedSetting(
				NotUseAtr.valueOf(this.approveDisplayAtr),
				ApplicationStatusWidgetItem.APPROVED_NUMBER);
		
		ApplicationStatusDetailedSetting UnApproveDisplay = new ApplicationStatusDetailedSetting(
				NotUseAtr.valueOf(this.unApproveDisplayAtr),
				ApplicationStatusWidgetItem.UNAPPROVED_NUMBER);
		
		ApplicationStatusDetailedSetting denialDisplay = new ApplicationStatusDetailedSetting(
				NotUseAtr.valueOf(this.denialDisplayAtr),
				ApplicationStatusWidgetItem.DENIED_NUMBER);
		
		ApplicationStatusDetailedSetting remandDisplay = new ApplicationStatusDetailedSetting(
				NotUseAtr.valueOf(this.remandDisplayAtr),
				ApplicationStatusWidgetItem.REMAND_NUMBER);
		
		ApplicationStatusDetailedSetting applimitDisplay = new ApplicationStatusDetailedSetting(
				NotUseAtr.valueOf(this.applimitDisplayAtr),
				ApplicationStatusWidgetItem.MONTH_APP_DEADLINE);

		appStatusSettings.add(approveDisplay);
		appStatusSettings.add(UnApproveDisplay);
		appStatusSettings.add(denialDisplay);
		appStatusSettings.add(remandDisplay);
		appStatusSettings.add(applimitDisplay);

		standardWidget.setName(new TopPagePartName(this.topPagePartName));
		standardWidget.setAppStatusDetailedSettingList(appStatusSettings);
		List<DetailStandardWidgetTypeSetting> detailSettingStandardWidgetTypes = new ArrayList<DetailStandardWidgetTypeSetting>();
		detailSettingStandardWidgetTypes.add(new DetailStandardWidgetTypeSetting(
				NotUseAtr.NOT_USE,
				StandardWidgetType.APPLICATION_STATUS
		));
		
		standardWidget.setDetailSettingStandardWidgetTypes(detailSettingStandardWidgetTypes);
		return standardWidget;
	}

	public static SptmtAppWidget toEntity(StandardWidget standardWidget) {
		SptmtAppWidget approveWidgeEntity = new SptmtAppWidget();
		List<ApplicationStatusDetailedSetting> appStatusSettings = standardWidget.getAppStatusDetailedSettingList();

		approveWidgeEntity.setCompanyId(standardWidget.getCompanyID());
		
		approveWidgeEntity.setTopPagePartName(standardWidget.getName().v());
		
		appStatusSettings.forEach(setting -> {

			if (setting.getItem().value == ApplicationStatusWidgetItem.APPROVED_NUMBER.value) {
				approveWidgeEntity.setApproveDisplayAtr(setting.getDisplayType().value);
			}

			if (setting.getItem().value == ApplicationStatusWidgetItem.UNAPPROVED_NUMBER.value) {
				approveWidgeEntity.setUnApproveDisplayAtr(setting.getDisplayType().value);
			}

			if (setting.getItem().value == ApplicationStatusWidgetItem.DENIED_NUMBER.value) {
				approveWidgeEntity.setDenialDisplayAtr(setting.getDisplayType().value);
			}

			if (setting.getItem().value == ApplicationStatusWidgetItem.REMAND_NUMBER.value) {
				approveWidgeEntity.setRemandDisplayAtr(setting.getDisplayType().value);
			}

			if (setting.getItem().value == ApplicationStatusWidgetItem.MONTH_APP_DEADLINE.value) {
				approveWidgeEntity.setApplimitDisplayAtr(setting.getDisplayType().value);
			}

		});
		return approveWidgeEntity;
	}

	public void update(StandardWidget standardWidget) {
		List<ApplicationStatusDetailedSetting> appStatusSettings = standardWidget.getAppStatusDetailedSettingList();

		this.setCompanyId(standardWidget.getCompanyID());

		this.setTopPagePartName(standardWidget.getName().v());

		appStatusSettings.forEach(setting -> {

			if (setting.getItem().value == ApplicationStatusWidgetItem.APPROVED_NUMBER.value) {
				this.setApproveDisplayAtr(setting.getDisplayType().value);
			}

			if (setting.getItem().value == ApplicationStatusWidgetItem.UNAPPROVED_NUMBER.value) {
				this.setUnApproveDisplayAtr(setting.getDisplayType().value);
			}

			if (setting.getItem().value == ApplicationStatusWidgetItem.DENIED_NUMBER.value) {
				this.setDenialDisplayAtr(setting.getDisplayType().value);
			}

			if (setting.getItem().value == ApplicationStatusWidgetItem.REMAND_NUMBER.value) {
				this.setRemandDisplayAtr(setting.getDisplayType().value);
			}

			if (setting.getItem().value == ApplicationStatusWidgetItem.MONTH_APP_DEADLINE.value) {
				this.setApplimitDisplayAtr(setting.getDisplayType().value);
			}

		});
	}
}
