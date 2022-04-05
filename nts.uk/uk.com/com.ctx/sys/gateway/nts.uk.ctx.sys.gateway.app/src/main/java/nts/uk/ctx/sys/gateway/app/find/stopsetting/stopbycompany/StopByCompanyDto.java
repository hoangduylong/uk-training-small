package nts.uk.ctx.sys.gateway.app.find.stopsetting.stopbycompany;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.ctx.sys.gateway.dom.stopbycompany.StopByCompany;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StopByCompanyDto {

	/** 契約コード */
	private String contractCd;

	/** 会社コード */
	private String companyCd;

	/** システム利用状態 */
	private Integer systemStatus;

	/** 利用停止のメッセージ */
	private String stopMessage;

	/** 利用停止モード */
	private Integer stopMode;

	/** 停止予告のメッセージ */
	private String usageStopMessage;

	public static StopByCompanyDto fromDomain(StopByCompany domain) {
		return new StopByCompanyDto(domain.getContractCd(), domain.getCompanyCd(), domain.getSystemStatus().value,
				domain.getStopMessage().v(), domain.getStopMode().value, domain.getUsageStopMessage().v());

	}
}
