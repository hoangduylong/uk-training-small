package nts.uk.ctx.bs.employee.app.command.hospitalofficeinfo;

import lombok.AllArgsConstructor;
import lombok.val;
import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.task.tran.AtomTask;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.arc.time.clock.ClockHourMinute;
import nts.arc.time.clock.ClockHourMinuteSpan;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.*;
import nts.uk.shr.com.enumcommon.NotUseAtr;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;
import java.util.Optional;

/**
 * 夜勤時間帯履歴情報追加
 */

@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class AddHospitalBusinessOfficeHistCommandHandler extends CommandHandler<AddHospitalBusinessOfficeHistCommand> {

    @Inject
    HospitalBusinessOfficeInfoHistoryRepository infoHistoryRepository;

    @Override
    protected void handle(CommandHandlerContext<AddHospitalBusinessOfficeHistCommand> commandHandlerContext) {

        val command = commandHandlerContext.getCommand();
        NotUseAtr nightShiftOperationAtr = EnumAdaptor.valueOf(command.getNightShiftOperationAtr(), NotUseAtr.class);
        Optional<ClockHourMinuteSpan> shiftTime = Optional.empty();
        Optional<NursingCareEstablishmentInfo> nursingCareEstInfo = Optional.empty();

        if (command.getClockHourMinuteStart() != null && command.getClockHourMinuteEnd() != null) {
            ClockHourMinute clockHourMinuteEnd = new ClockHourMinute(command.getClockHourMinuteEnd());
            ClockHourMinute clockHourMinuteStart = new ClockHourMinute(command.getClockHourMinuteStart());
            ClockHourMinuteSpan clockHourMinuteSpan = ClockHourMinuteSpan.create(clockHourMinuteStart, clockHourMinuteEnd);
            shiftTime = Optional.of(clockHourMinuteSpan);
        }
        NightShiftOperationRule nightShiftOperationRule = new NightShiftOperationRule(
                nightShiftOperationAtr,
                shiftTime
        );
        DatePeriod datePeriod = new DatePeriod(command.toDate(), GeneralDate.max());

        RequireImpl require = new RequireImpl(infoHistoryRepository);
        AtomTask persist = AddHospitalBusinessOfficeHistory
                .addHospitalBusinessOfficeHistory(require, command.getWorkplaceGroupId(), datePeriod,
                        nightShiftOperationRule, nursingCareEstInfo);
        transaction.execute(persist::run);

    }

    @AllArgsConstructor
    public class RequireImpl implements AddHospitalBusinessOfficeHistory.Require {
        private HospitalBusinessOfficeInfoHistoryRepository infoHistoryRepository;

        @Override
        public void insertHospitalBusinessOfficeHistory(HospitalBusinessOfficeInfo hospitalInfo,
                                                        HospitalBusinessOfficeInfoHistory hospitalHist) {
            infoHistoryRepository.insert(hospitalInfo, hospitalHist);
        }

        @Override
        public Optional<HospitalBusinessOfficeInfoHistory> getHospitalBusinessOfficeInfoHistory(String workplaceGroupId) {
            return infoHistoryRepository.getHospitalBusinessOfficeInfoHistory(workplaceGroupId);
        }
    }
}
