package nts.uk.ctx.bs.person.dom.person.personal.anniversary;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import nts.arc.time.GeneralDate;

import java.time.MonthDay;

/**
 * test dto 個人の記念日情報
 */
@Getter
@Setter
@Builder
public class AnniversaryNoticeDto implements AnniversaryNotice.MementoSetter, AnniversaryNotice.MementoGetter {
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

    @Override
    public String getPersonalId() {
        return this.personalId;
    }

    @Override
    public void setPersonalId(String personalId) {
        this.personalId = personalId;

    }

    @Override
    public Integer getNoticeDay() {
        return this.noticeDay;
    }

    @Override
    public void setNoticeDay(Integer noticeDay) {
        this.noticeDay = noticeDay;

    }

    @Override
    public GeneralDate getSeenDate() {
        return this.seenDate;
    }

    @Override
    public void setSeenDate(GeneralDate seenDate) {
        this.seenDate = seenDate;

    }

    @Override
    public MonthDay getAnniversary() {
        return MonthDay.parse(this.anniversary, AnniversaryNotice.FORMAT_MONTH_DAY);
    }

    @Override
    public void setAnniversary(MonthDay anniversary) {
        this.anniversary = anniversary.format(AnniversaryNotice.FORMAT_MONTH_DAY);
    }

    @Override
    public String getAnniversaryTitle() {
        return this.anniversaryTitle;
    }

    @Override
    public void setAnniversaryTitle(String anniversaryTitle) {
        this.anniversaryTitle = anniversaryTitle;

    }

    @Override
    public String getNotificationMessage() {
        return this.notificationMessage;
    }

    @Override
    public void setNotificationMessage(String notificationMessage) {
        this.notificationMessage = notificationMessage;

    }
}
