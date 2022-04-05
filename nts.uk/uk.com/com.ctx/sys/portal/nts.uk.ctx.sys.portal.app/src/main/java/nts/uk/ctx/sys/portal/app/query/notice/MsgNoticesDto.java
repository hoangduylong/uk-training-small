package nts.uk.ctx.sys.portal.app.query.notice;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MsgNoticesDto {
	
	// お知らせメッセージ
	MessageNoticeDto message;
	
	// 作成者
	String creator;
	
	// Is new message
	Boolean flag;
}
