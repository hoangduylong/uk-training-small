package nts.uk.ctx.bs.employee.app.command.employee.mngdata;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfo;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfoRepository;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.pereg.app.command.PeregAddCommandHandler;
import nts.uk.shr.pereg.app.command.PeregAddCommandResult;

@Stateless
public class AddEmployeeDataMngInfoCommandHandler extends CommandHandlerWithResult<AddEmployeeDataMngInfoCommand, PeregAddCommandResult>
	implements PeregAddCommandHandler<AddEmployeeDataMngInfoCommand>{
	
	@Inject
	private EmployeeDataMngInfoRepository employeeDataMngInfoRepository;
	
	@Override
	public String targetCategoryCd() {
		return "CS00001";
	}

	@Override
	public Class<?> commandClass() {
		return AddEmployeeDataMngInfoCommand.class;
	}

	@Override
	protected PeregAddCommandResult handle(CommandHandlerContext<AddEmployeeDataMngInfoCommand> context) {
		
		val command = context.getCommand();
		String companyId = AppContexts.user().companyId();
	
		Optional<EmployeeDataMngInfo> employeeData = employeeDataMngInfoRepository.findByEmployeCD(command.getEmployeeCode(), companyId);
		
		if (employeeData.isPresent()){
			throw new BusinessException("Msg_345");
		}
		/** Default:
		 deletedStatus = false
		 deleteDateTemporary = null
		 removeReason = null
		 */
		EmployeeDataMngInfo domain = EmployeeDataMngInfo.createFromJavaType(companyId,command.getPersonId(),command.getEmployeeId(),command.getEmployeeCode(),0,null,null,command.getExternalCode());
		
		employeeDataMngInfoRepository.add(domain);
		
		return new PeregAddCommandResult(command.getEmployeeId());
	}

}
