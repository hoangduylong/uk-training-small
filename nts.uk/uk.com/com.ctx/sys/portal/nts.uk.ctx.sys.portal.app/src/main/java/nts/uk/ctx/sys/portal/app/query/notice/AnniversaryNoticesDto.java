package nts.uk.ctx.sys.portal.app.query.notice;

import lombok.Builder;
import lombok.Data;
import nts.uk.ctx.sys.portal.dom.notice.adapter.AnniversaryNoticeImport;

@Data
@Builder
public class AnniversaryNoticesDto {
	
	// 個人の記念日情報、
	AnniversaryNoticeImport anniversaryNotice;
	
	// 新記念日Flag
	Boolean flag;
}
