package nts.uk.ctx.bs.employee.app.command.hospitalofficeinfo;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.HospitalBusinessOfficeInfo;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.HospitalBusinessOfficeInfoHistory;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.HospitalBusinessOfficeInfoHistoryRepository;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Optional;



@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class UpdateHospitalBusinessOfficeHistCommandHandler extends CommandHandler<UpdateHospitalBusinessOfficeHistCommand> {


    @Inject
    HospitalBusinessOfficeInfoHistoryRepository infoHistoryRepository;

    @Override
    protected void handle(CommandHandlerContext<UpdateHospitalBusinessOfficeHistCommand> commandHandlerContext) {
        val command = commandHandlerContext.getCommand();
        GeneralDate generalDate = command.toDate();
        String historyId = command.getHistoryId();
        String workplaceGroupId = command.getWorkplaceGroupId();
        // List all Hist
        Optional<HospitalBusinessOfficeInfoHistory> optionalOfficeInfo = this.infoHistoryRepository.getHospitalBusinessOfficeInfoHistory(workplaceGroupId);
        // Create list empty.
        HospitalBusinessOfficeInfoHistory listHist = new HospitalBusinessOfficeInfoHistory(workplaceGroupId, new ArrayList<>());
        if (optionalOfficeInfo.isPresent()) {
            listHist = optionalOfficeInfo.get();
        }
        // Get item update
        Optional<DateHistoryItem> optionalHisItem = listHist.items().stream()
                .filter(x -> x.identifier().equals(historyId)).findFirst();
        if (!optionalHisItem.isPresent()) {
            throw new RuntimeException(" CAN NOT FIND DATA " +
                    " WITH HIST_ID = " + historyId);
        }
        val listUpdate = new ArrayList<DateHistoryItem>();
        DateHistoryItem itemOld = optionalHisItem.get();
        if (optionalHisItem.get().end().equals(GeneralDate.max())) {

            DatePeriod period = new DatePeriod(generalDate, GeneralDate.max());
            //Update item
            listHist.changeSpan(optionalHisItem.get(), period);
            // get item before
            val itemBefore = listHist.immediatelyBefore(optionalHisItem.get());

            listUpdate.add(optionalHisItem.get());
            itemBefore.ifPresent(listUpdate::add);
        } else {
            listUpdate.add(itemOld);
        }

        infoHistoryRepository.updateHospitalInfoHistory(new HospitalBusinessOfficeInfoHistory(workplaceGroupId, listUpdate));
    }
}
