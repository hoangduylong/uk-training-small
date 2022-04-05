package nts.uk.ctx.bs.employee.app.command.hospitalofficeinfo;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.HospitalBusinessOfficeInfo;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.HospitalBusinessOfficeInfoHistory;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.HospitalBusinessOfficeInfoHistoryRepository;
import nts.uk.shr.com.history.DateHistoryItem;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;
import java.util.Optional;



@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class DeleteHospitalBusinessOfficeHistCommandHandler extends CommandHandler<DeleteHospitalBusinessOfficeHistCommand> {
    @Inject
    HospitalBusinessOfficeInfoHistoryRepository infoHistoryRepository;

    @Override
    protected void handle(CommandHandlerContext<DeleteHospitalBusinessOfficeHistCommand> commandHandlerContext) {
        val command = commandHandlerContext.getCommand();
        String workplaceGroupId = command.getWorkplaceGroupId();
        String historyId = command.getHistoryId();
        //Get list old  by companyId
        Optional<HospitalBusinessOfficeInfoHistory> optionalOfficeInfoHistory = infoHistoryRepository
                .getHospitalBusinessOfficeInfoHistory(workplaceGroupId);
        Optional<HospitalBusinessOfficeInfo> optionalOfficeInfo = infoHistoryRepository.get(historyId);

        if (!optionalOfficeInfoHistory.isPresent() || !optionalOfficeInfo.isPresent()) {
            throw new RuntimeException(" CAN NOT FIND DATA " +
                    " WITH HIST_ID = " + historyId +
                    "WORK_PLACE_GROUP_ID = " + workplaceGroupId);
        }
        // Get item delete
        Optional<DateHistoryItem> optionalHisItem = optionalOfficeInfoHistory.get().getHistoryItems().stream()
                .filter(x -> x.identifier().equals(historyId)).findFirst();
        if (!optionalHisItem.isPresent()) {
            throw new RuntimeException(" CAN NOT FIND DATA " +
                    " WITH HIST_ID = " + historyId);
        }
        // Remove history in list
        optionalOfficeInfoHistory.get().remove(optionalHisItem.get());

        // Delete history
        this.infoHistoryRepository.delete(workplaceGroupId, historyId);

        // Update before history
        this.infoHistoryRepository.updateHospitalInfoHistory(optionalOfficeInfoHistory.get());

    }
}
