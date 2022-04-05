package nts.uk.ctx.bs.person.pub.anniversary;

import java.time.MonthDay;

import lombok.Builder;
import lombok.Data;
import nts.arc.time.GeneralDate;

@Data
@Builder
public class AnniversaryNoticeExport {
	
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
    private MonthDay anniversary;

    /**
     * 記念日のタイトル
     */
    private String anniversaryTitle;

    /**
     * 記念日の内容
     */
    private String notificationMessage;
}
