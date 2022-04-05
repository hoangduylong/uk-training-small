package entity.workplacegroup;


import lombok.*;
import nts.arc.enums.EnumAdaptor;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.arc.time.clock.ClockHourMinute;
import nts.arc.time.clock.ClockHourMinuteSpan;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.HospitalBusinessOfficeInfo;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.HospitalBusinessOfficeInfoHistory;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.NightShiftOperationRule;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.NursingCareEstablishmentInfo;
import nts.uk.shr.com.enumcommon.NotUseAtr;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Entity
@Table(name = "BSYMT_MEDCARE_NIGHTSHIFT_RULE_HIST")
@NoArgsConstructor
@AllArgsConstructor
public class BsymtMedcareNightShiftRuleHist extends UkJpaEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @EmbeddedId
    public BsymtMedcareNightShiftRuleHistPk pK;

    //	契約コード
    @Column(name = "CONTRACT_CD")
    public String contractCode;

    /**
     * 開始日	: 病棟・事業所情報履歴.履歴.期間.開始日
     */
    @Column(name = "START_DATE")
    public GeneralDate STARTDATE;
    /**
     * 終了日	: 病棟・事業所情報履歴.履歴.期間.終了日
     */
    @Column(name = "END_DATE")
    public GeneralDate ENDDATE;
    /**
     * 夜勤運用区分 : 病棟・事業所情報.夜勤運用ルール.夜勤運用区分
     * 0：しない
     * 1：する
     */
    @Column(name = "NIGHTSHIFT_USE_ATR")
    public int NIGHTSHIFTUSEATR;
    /**
     * 夜勤時間帯開始時刻: 病棟・事業所情報.夜勤運用ルール.時間帯.開始時刻
     */
    @Column(name = "START_CLOCK")
    public Integer STARTCLOCK;
    /**
     * 夜勤時間帯終了時刻: 病棟・事業所情報.夜勤運用ルール.時間帯.終了時刻
     */
    @Column(name = "END_CLOCK")
    public Integer ENDCLOCK;

    @Override
    protected Object getKey() {
        return pK;
    }

    public static HospitalBusinessOfficeInfo toDomainInFo(BsymtMedcareNightShiftRuleHist entity) {
        NotUseAtr nightShiftOperationAtr = EnumAdaptor.valueOf(entity.NIGHTSHIFTUSEATR, NotUseAtr.class);
        Optional<ClockHourMinuteSpan> shiftTime = Optional.empty();
        Optional<NursingCareEstablishmentInfo> nursingCareEstInfo = Optional.empty();

        if (entity.ENDCLOCK != null && entity.STARTCLOCK != null) {

            ClockHourMinute clockHourMinuteStart = new ClockHourMinute(entity.STARTCLOCK);
            ClockHourMinute clockHourMinuteEnd = new ClockHourMinute(entity.ENDCLOCK);
            ClockHourMinuteSpan clockHourMinuteSpan = ClockHourMinuteSpan.create(clockHourMinuteStart, clockHourMinuteEnd);
            shiftTime = Optional.of(clockHourMinuteSpan);
        }
        NightShiftOperationRule nightShiftOperationRule = new NightShiftOperationRule(
                nightShiftOperationAtr,
                shiftTime
        );
        return new HospitalBusinessOfficeInfo(
                entity.pK.WKPGRPID,
                entity.pK.HISTID,
                nightShiftOperationRule,
                nursingCareEstInfo
        );
    }

    public static List<HospitalBusinessOfficeInfoHistory> toListDomainHist(List<BsymtMedcareNightShiftRuleHist> listEntity) {
        List<HospitalBusinessOfficeInfoHistory> listRs = new ArrayList<>();
        List<String> listWp = listEntity.stream().map(e -> e.pK.WKPGRPID).distinct().collect(Collectors.toList());
        listWp.forEach(e -> {
            val items = listEntity.stream().filter(i -> i.pK.WKPGRPID.equals(e)).collect(Collectors.toList());
            listRs.add(new HospitalBusinessOfficeInfoHistory(
                    e,
                    items.stream().map(j -> new DateHistoryItem(
                            j.pK.HISTID,
                            new DatePeriod(j.STARTDATE, j.ENDDATE)
                    )).collect(Collectors.toList())
            ));
        });
       return listRs;
    }
}
