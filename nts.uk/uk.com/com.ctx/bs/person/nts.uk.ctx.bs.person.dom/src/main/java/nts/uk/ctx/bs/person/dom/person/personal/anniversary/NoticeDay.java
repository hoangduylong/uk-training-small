package nts.uk.ctx.bs.person.dom.person.personal.anniversary;

/**
 * 通知の日数
 */
public enum NoticeDay {

    //０：当日
    BEFORE_ZERO_DAY(0),
    //１：1日前
    BEFORE_ONE_DAY(1),
    //２：2日前
    BEFORE_TWO_DAY(2),
    //３：3日前
    BEFORE_THREE_DAY(3),
    //４：4日前
    BEFORE_FOUR_DAY(4),
    //５：5日前
    BEFORE_FIVE_DAY(5),
    //６：6日前
    BEFORE_SIX_DAY(6),
    //７：7日前
    BEFORE_SEVEN_DAY(7);

    public int value;

    NoticeDay(int day) {
        this.value = day;
    }
}
