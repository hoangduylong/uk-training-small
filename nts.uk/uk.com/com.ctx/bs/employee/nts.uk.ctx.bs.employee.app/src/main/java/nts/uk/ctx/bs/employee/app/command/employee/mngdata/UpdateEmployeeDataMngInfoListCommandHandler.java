package nts.uk.ctx.bs.employee.app.command.employee.mngdata;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfo;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfoRepository;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.pereg.app.command.MyCustomizeException;
import nts.uk.shr.pereg.app.command.PeregUpdateListCommandHandler;
@Stateless
public class UpdateEmployeeDataMngInfoListCommandHandler extends CommandHandlerWithResult<List<UpdateEmployeeDataMngInfoCommand>, List<MyCustomizeException>>
		implements PeregUpdateListCommandHandler<UpdateEmployeeDataMngInfoCommand> {
	@Inject
	private EmployeeDataMngInfoRepository employeeDataMngInfoRepository;

	@Override
	public String targetCategoryCd() {
		return "CS00001";
	}

	@Override
	public Class<?> commandClass() {
		return UpdateEmployeeDataMngInfoCommand.class;
	}

	@Override
	protected List<MyCustomizeException> handle(CommandHandlerContext<List<UpdateEmployeeDataMngInfoCommand>> context) {
		List<UpdateEmployeeDataMngInfoCommand> command = context.getCommand();
		List<String> sidErrorLst = new ArrayList<>();
		String cid = AppContexts.user().companyId();
		List<MyCustomizeException> errorExceptionLst = new ArrayList<>();
		// 同じ会社IDかつ、削除状況＝削除していないものは、社員コードは重複してはいけない （#Msg_345#）
		// Map<employeeCode, List<EmployeeDataMngInfo>>
		Map<String, List<EmployeeDataMngInfo>> employeeDataMap = employeeDataMngInfoRepository
				.findByListEmployeeCode(cid,
						command.stream().map(c -> c.getEmployeeCode()).collect(Collectors.toList()))
				.stream().collect(Collectors.groupingBy(c -> c.getEmployeeCode().v()));
		
		List<EmployeeDataMngInfo> domains = command.stream().map(c -> {
			return new EmployeeDataMngInfo(cid, c.getPersonId(), c.getEmployeeId(), c.getEmployeeCode(),
					c.getExternalCode() == null? null: c.getExternalCode().equals("") == true ? null: c.getExternalCode());
		}).collect(Collectors.toList());
		
		Iterator<EmployeeDataMngInfo> itr = domains.iterator();
        while (itr.hasNext()) {
        	EmployeeDataMngInfo emp = itr.next();
        	List<EmployeeDataMngInfo> empLst = employeeDataMap.get(emp.getEmployeeCode().v());
        	if (!CollectionUtil.isEmpty(empLst)) {
        		empLst.stream().forEach(c ->{
                    if (c.getEmployeeCode().equals(emp.getEmployeeCode()) && !emp.getEmployeeId().equals(c.getEmployeeId())) {
                    	sidErrorLst.add(emp.getEmployeeId());
                        itr.remove();
                    }
        		});
        	}
        }
		
		if(!domains.isEmpty()) {
			this.employeeDataMngInfoRepository.updateAll(domains);
		}
		
		if (sidErrorLst.size() > 0) {
			errorExceptionLst.add(new MyCustomizeException("Msg_345", sidErrorLst,"社員CD"));
		}
		return errorExceptionLst;
	}
}
