package nts.uk.ctx.bs.person.infra.entity.person.anniversary;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Setter;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.person.dom.person.personal.anniversary.AnniversaryNotice;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.time.MonthDay;


/**
 * Entity 個人の記念日情報
 */
@Data
@Entity
@Table(name = "BPSMT_ANNIVERSARY")
@EqualsAndHashCode(callSuper = true)
public class BpsdtPsAnniversaryInfo extends UkJpaEntity implements AnniversaryNotice.MementoGetter, AnniversaryNotice.MementoSetter, Serializable {

    private static final long serialVersionUID = 1L;

    // column 排他バージョン
    @Column(name = "EXCLUS_VER")
    private long version;

    // column 契約コード
    @Setter
    @Basic(optional = false)
    @Column(name = "CONTRACT_CD")
    private String contractCd;

    // Embedded primary key 個人ID + 記念日
    @EmbeddedId
    private BpsdtPsAnniversaryInfoPK bpsdtPsAnniversaryInfoPK;

    // column 日数前の通知
    @Basic(optional = false)
    @Column(name = "NOTIFICATION_DAYS")
    private Integer noticeDay;

    // column 最後見た記念日
    @Basic(optional = false)
    @Column(name = "READ_DATE")
    private GeneralDate seenDate;

    // column 記念日のタイトル
    @Basic(optional = false)
    @Column(name = "ANNIVERSARY_TITLE")
    private String anniversaryTitle;

    // column 記念日の内容
    @Basic(optional = false)
    @Column(name = "ANNIVERSARY_CONTENT")
    private String notificationMessage;

    @Override
    protected Object getKey() {
        return this.bpsdtPsAnniversaryInfoPK;
    }

    @Override
    public String getPersonalId() {
        if (this.bpsdtPsAnniversaryInfoPK != null) {
            return this.bpsdtPsAnniversaryInfoPK.getPersonalId();
        }
        return null;
    }

    @Override
    public void setPersonalId(String personalId) {
        if (this.bpsdtPsAnniversaryInfoPK == null) {
            this.bpsdtPsAnniversaryInfoPK = new BpsdtPsAnniversaryInfoPK();
        }
        this.bpsdtPsAnniversaryInfoPK.setPersonalId(personalId);
    }

    @Override
    public MonthDay getAnniversary() {
        if (this.bpsdtPsAnniversaryInfoPK != null) {
            return MonthDay.parse(this.bpsdtPsAnniversaryInfoPK.getAnniversary(), AnniversaryNotice.FORMAT_MONTH_DAY);
        }
        return null;
    }

    @Override
    public void setAnniversary(MonthDay anniversary) {
        if (this.bpsdtPsAnniversaryInfoPK == null) {
            this.bpsdtPsAnniversaryInfoPK = new BpsdtPsAnniversaryInfoPK();
        }
        this.bpsdtPsAnniversaryInfoPK.setAnniversary(anniversary.format(AnniversaryNotice.FORMAT_MONTH_DAY));
    }
}
