package nts.uk.ctx.bs.employee.app.query.hospitalofficeinfo;

import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.HospitalBusinessOfficeInfoHistory;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.HospitalBusinessOfficeInfoHistoryRepository;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Query: 夜勤時間帯履歴一覧を取得する
 */

@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class GetAListOfNightShiftHistoryQuery {
    @Inject
    private HospitalBusinessOfficeInfoHistoryRepository officeInfoHistoryRepository;

    public List<HospitalBusinessOfficeInfoHistoryDto> getHospitalBusinessHistory(String workplaceGroupId) {
        Optional<HospitalBusinessOfficeInfoHistory> officeInfoHistory = officeInfoHistoryRepository
                .getHospitalBusinessOfficeInfoHistory(workplaceGroupId);
        if (officeInfoHistory.isPresent()) {
            HospitalBusinessOfficeInfoHistory history = officeInfoHistory.get();
            String wplgId = history.getWorkplaceGroupId();

            return history.getHistoryItems().stream().map(e -> new HospitalBusinessOfficeInfoHistoryDto(
                    wplgId,
                    e.identifier(),
                    e.start(),
                    e.end()
            )).collect(Collectors.toList());

        }

        return Collections.emptyList();
    }
}
