package nts.uk.ctx.sys.log.infra.repository.pereg;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.sys.log.infra.entity.pereg.SrcdtPerCtgCorrection;
import nts.uk.ctx.sys.log.infra.entity.pereg.SrcdtPerHistoryData;
import nts.uk.ctx.sys.log.infra.entity.pereg.SrcdtPerItemInfo;
import nts.uk.ctx.sys.log.infra.entity.pereg.SrcdtPerCorrection;

@Getter
@Setter
@AllArgsConstructor
public class PersonalInfoCorrectionLogQuery {
	private String perCorrectionLogID;

	private SrcdtPerCorrection srcdtPerCorrectionLog;

	private SrcdtPerCtgCorrection srcdtCtgCorrectionLog;

	private SrcdtPerHistoryData srcdtDataHistoryLog;

	private SrcdtPerItemInfo srcdtItemInfoLog;
}
