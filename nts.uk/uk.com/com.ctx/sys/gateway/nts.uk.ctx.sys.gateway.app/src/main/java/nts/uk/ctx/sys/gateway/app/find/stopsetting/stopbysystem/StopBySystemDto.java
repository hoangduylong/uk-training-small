package nts.uk.ctx.sys.gateway.app.find.stopsetting.stopbysystem;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.ctx.sys.gateway.dom.stopbysystem.StopBySystem;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StopBySystemDto {
	/** 契約コード */
	private String contractCd;

	/** システム利用状態 */
	private Integer systemStatus;

	/** 停止予告のメッセージ */
	private String stopMessage;

	/** 利用停止モード */
	private Integer stopMode;

	/** 利用停止のメッセージ */
	private String usageStopMessage;

	public static StopBySystemDto fromDomain(StopBySystem domain) {
		return new StopBySystemDto(domain.getContractCd(), domain.getSystemStatus().value, domain.getStopMessage().v(),
				domain.getStopMode().value, domain.getUsageStopMessage().v());

	}
}
