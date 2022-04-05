package nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.ctx.sys.portal.dom.enums.TopPagePartType;
import nts.uk.ctx.sys.portal.dom.toppagepart.TopPagePartCode;
import nts.uk.ctx.sys.portal.dom.toppagepart.TopPagePartName;
import nts.uk.ctx.sys.portal.dom.toppagepart.size.Size;
import nts.uk.shr.com.enumcommon.NotUseAtr;
/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページの部品.標準ウィジェット.標準ウィジェット
 *
 */
@Getter
@Setter
public class StandardWidget extends AggregateRoot {
	
	private String companyID;
	
	private TopPagePartName name;
	
	// 勤務状況の詳細設定
	private List<DetailedWorkStatusSetting> detailedWorkStatusSettingList;

	// 承認すべき申請状況の詳細設定
	private List<ApprovedAppStatusDetailedSetting> approvedAppStatusDetailedSettingList;

	// 標準ウィジェット種別の詳細設定（List）
	private List<DetailStandardWidgetTypeSetting> detailSettingStandardWidgetTypes;
	
	// 申請状況の詳細設定
	private List<ApplicationStatusDetailedSetting> appStatusDetailedSettingList;
	
	public StandardWidget(String companyID) {
		this.companyID = companyID;
	}
	
	public static StandardWidget createFromJavaType(String companyID, String toppagePartID, String code, String name, int type, int width, int height) {
       return new StandardWidget(companyID);
	}

	public StandardWidget(String companyID, String toppagePartID, TopPagePartCode code, TopPagePartName name,
			TopPagePartType type, Size size, List<DetailedWorkStatusSetting> detailedWorkStatusSettingList,
			List<ApprovedAppStatusDetailedSetting> approvedAppStatusDetailedSettingList,
			StandardWidgetType standardWidgetType,
			List<ApplicationStatusDetailedSetting> appStatusDetailedSettingList) {
		this.companyID = companyID;
		this.detailedWorkStatusSettingList = new ArrayList<>();
		this.approvedAppStatusDetailedSettingList = new ArrayList<>();
		this.appStatusDetailedSettingList = new ArrayList<>();
		this.name = name;
		this.detailSettingStandardWidgetTypes = Arrays.asList(new DetailStandardWidgetTypeSetting(NotUseAtr.NOT_USE, standardWidgetType));
		if(standardWidgetType == StandardWidgetType.WORK_STATUS) {
			this.detailedWorkStatusSettingList = detailedWorkStatusSettingList;
		}else if(standardWidgetType == StandardWidgetType.APPROVE_STATUS) {
			this.approvedAppStatusDetailedSettingList = approvedAppStatusDetailedSettingList;
		}else if(standardWidgetType == StandardWidgetType.APPLICATION_STATUS) {
			this.appStatusDetailedSettingList = appStatusDetailedSettingList;
		}
		
	}

}
