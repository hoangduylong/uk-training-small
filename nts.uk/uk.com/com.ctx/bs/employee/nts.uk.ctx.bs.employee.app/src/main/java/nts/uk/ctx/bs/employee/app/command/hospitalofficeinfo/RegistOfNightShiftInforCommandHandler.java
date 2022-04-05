package nts.uk.ctx.bs.employee.app.command.hospitalofficeinfo;


import lombok.val;
import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.time.clock.ClockHourMinute;
import nts.arc.time.clock.ClockHourMinuteSpan;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.*;
import nts.uk.shr.com.enumcommon.NotUseAtr;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;
import java.time.LocalTime;
import java.util.Optional;


@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class RegistOfNightShiftInforCommandHandler extends CommandHandler<RegistOfNightShiftInforCommand> {
    @Inject
    HospitalBusinessOfficeInfoHistoryRepository historyRepository;

    @Override
    protected void handle(CommandHandlerContext<RegistOfNightShiftInforCommand> commandHandlerContext) {
        val command = commandHandlerContext.getCommand();
        NotUseAtr nightShiftOperationAtr = EnumAdaptor.valueOf(command.getNightShiftOperationAtr(), NotUseAtr.class);
        Optional<NursingCareEstablishmentInfo> nursingCareEstInfo = Optional.empty();

        NightShiftOperationRule nightShiftOperationRule;
        if (nightShiftOperationAtr == NotUseAtr.USE) {
            ClockHourMinute clockHourMinuteStart = new ClockHourMinute(command.getClockHourMinuteStart());
            ClockHourMinute clockHourMinuteEnd = new ClockHourMinute(command.getClockHourMinuteEnd());
            ClockHourMinuteSpan clockHourMinuteSpan = ClockHourMinuteSpan.create(clockHourMinuteStart, clockHourMinuteEnd);
            nightShiftOperationRule = NightShiftOperationRule.createByNightShiftUse(clockHourMinuteSpan);
        } else {
            nightShiftOperationRule = NightShiftOperationRule.createByNightShiftNotUse();
        }
        HospitalBusinessOfficeInfo hospitalBusinessOfficeInfo = new HospitalBusinessOfficeInfo(
                command.getWorkplaceGroupId(),
                command.getHistoryId(),
                nightShiftOperationRule,
                nursingCareEstInfo
        );
        // Get old domain HospitalBusinessOfficeInfo.
        Optional<HospitalBusinessOfficeInfo> officeInfo = historyRepository.get(command.getHistoryId());
        // Get oll domain HospitalBusinessOfficeInfoHistory.
        Optional<HospitalBusinessOfficeInfoHistory> officeInfoHistory = historyRepository
                .getHospitalBusinessOfficeInfoHistory(command.getWorkplaceGroupId());
        if (officeInfoHistory.isPresent()) {
            officeInfo.ifPresent(hospitalBusinessOfficeInfo1 ->
                    historyRepository.updateHospitalBusinessOfficeInfo(hospitalBusinessOfficeInfo));
        }

    }
}
