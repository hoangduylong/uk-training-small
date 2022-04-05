package nts.uk.ctx.bs.employee.app.query.hospitalofficeinfo;

import lombok.val;
import nts.arc.time.clock.ClockHourMinuteSpan;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.HospitalBusinessOfficeInfo;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.HospitalBusinessOfficeInfoHistoryRepository;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.Optional;

/**
 * Query: 夜勤時間帯情報を取得する
 */
@Stateless
public class GetNightShiftInformationQuery {
    @Inject
    HospitalBusinessOfficeInfoHistoryRepository infoHistoryRepository;

    public HospitalBusinessOfficeInfoDto getHospitalBusinessOfficeInfo(String historyId) {

        Optional<HospitalBusinessOfficeInfo> optionalOfficeInfo = infoHistoryRepository.get(historyId);
        if (optionalOfficeInfo.isPresent()) {
            HospitalBusinessOfficeInfo domain = optionalOfficeInfo.get();
            Optional<ClockHourMinuteSpan> optionalSpan = domain.getNightShiftOpeRule().getShiftTime();
            StringBuilder clockHourMinuteStart = new StringBuilder(); // HH:mm
            StringBuilder clockHourMinuteEnd = new StringBuilder(); // HH:mm
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
        return null;
    }


}
