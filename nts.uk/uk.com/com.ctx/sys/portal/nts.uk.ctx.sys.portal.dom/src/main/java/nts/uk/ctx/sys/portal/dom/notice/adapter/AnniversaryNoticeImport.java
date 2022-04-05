package nts.uk.ctx.sys.portal.dom.notice.adapter;

import lombok.Builder;
import lombok.Data;
import nts.arc.time.GeneralDate;

@Data
@Builder
public class AnniversaryNoticeImport {
	
	/**
     * 個人ID
     */
	 private String personalId;

    /**
     * 日数前の通知
     */
    private Integer noticeDay;

    /**
     * 最後見た記念日
     */
    private GeneralDate seenDate;

    /**
     * 記念日
     */
    private String anniversary;

    /**
     * 記念日のタイトル
     */
    private String anniversaryTitle;

    /**
     * 記念日の内容
     */
    private String notificationMessage;
    
    private String displayDate;
}
