package nts.uk.ctx.bs.employee.app.command.employee.mngdata;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfo;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfoRepository;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.pereg.app.command.PeregUpdateCommandHandler;

@Stateless
public class UpdateEmployeeDataMngInfoCommandHandler extends CommandHandler<UpdateEmployeeDataMngInfoCommand>
	implements PeregUpdateCommandHandler<UpdateEmployeeDataMngInfoCommand>{
	
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
	protected void handle(CommandHandlerContext<UpdateEmployeeDataMngInfoCommand> context) {
		
		val command = context.getCommand();
		String companyId = AppContexts.user().companyId();
		
		// 同じ会社IDかつ、削除状況＝削除していないものは、社員コードは重複してはいけない （#Msg_345#）
		Optional<EmployeeDataMngInfo> employeeData = employeeDataMngInfoRepository.findByEmployeCD(command.getEmployeeCode(), companyId);
		
		if (employeeData.isPresent() && !employeeData.get().getEmployeeId().equals(command.getEmployeeId())){
			throw  new BusinessException("Msg_345");
		}
		
		String externalCode = null;
		
		if (command.getExternalCode() != null) {
			externalCode = command.getExternalCode().equals("") == true? null: command.getExternalCode();
		}
		
		EmployeeDataMngInfo domain = new EmployeeDataMngInfo(companyId,
				command.getPersonId(), 
				command.getEmployeeId(),
				command.getEmployeeCode() == null ? AppContexts.user().employeeCode() : command.getEmployeeCode(), 
				externalCode);
		
		employeeDataMngInfoRepository.update(domain);
	}
}
