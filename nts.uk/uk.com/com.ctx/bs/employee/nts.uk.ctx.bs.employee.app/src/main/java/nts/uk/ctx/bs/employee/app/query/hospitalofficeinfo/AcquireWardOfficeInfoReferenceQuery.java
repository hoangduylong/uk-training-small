package nts.uk.ctx.bs.employee.app.query.hospitalofficeinfo;


import lombok.val;
import nts.arc.time.GeneralDate;
import nts.arc.time.clock.ClockHourMinuteSpan;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.HospitalBusinessOfficeInfo;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.HospitalBusinessOfficeInfoHistoryRepository;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;
import java.util.Optional;

/**
 * <<Query>> 基準日の病棟事業所情報取得する
 * UKDesign.UniversalK.就業.KSM_スケジュールマスタ.KSM007_職場グループの設定.A_職場グループの設定.メニュー別OCD.夜勤時間帯の取得
 */

@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class AcquireWardOfficeInfoReferenceQuery {
    @Inject
    HospitalBusinessOfficeInfoHistoryRepository infoHistoryRepository;

    public HospitalBusinessOfficeInfoDto getHospitalBusinessOfficeInfo(String workplaceGroupId) {

        Optional<HospitalBusinessOfficeInfo> optionalOfficeInfo = infoHistoryRepository.get(workplaceGroupId,GeneralDate.today());
        if (!optionalOfficeInfo.isPresent()) {
            return null;
        }else {
            HospitalBusinessOfficeInfo domain = optionalOfficeInfo.get();
            StringBuilder clockHourMinuteStart = new StringBuilder(); // HH:mm
            StringBuilder clockHourMinuteEnd = new StringBuilder(); // HH:mm
            Optional<ClockHourMinuteSpan> optionalSpan = domain.getNightShiftOpeRule().getShiftTime();
            if (optionalSpan.isPresent()) {
                val clockHourMinute = optionalSpan.get();
                clockHourMinuteStart
                        .append(String.valueOf(clockHourMinute.start().hour()))
                        .append(":")
                        .append(String.valueOf(clockHourMinute.start().minute()));

                clockHourMinuteEnd
                        .append(String.valueOf(clockHourMinute.end().hour()))
                        .append(":")
                        .append(String.valueOf(clockHourMinute.end().minute()));

            }
            return new HospitalBusinessOfficeInfoDto(
                    domain.getWorkplaceGroupId(),
                    domain.getHistoryId(),
                    domain.getNightShiftOpeRule().getNightShiftOperationAtr().value,
                    clockHourMinuteStart.toString(),
                    clockHourMinuteEnd.toString()
            );
        }
    }
}
