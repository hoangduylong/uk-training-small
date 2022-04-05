package command.person.currentaddress;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.person.dom.person.currentaddress.CurrentAddress;
import nts.uk.ctx.bs.person.dom.person.currentaddress.CurrentAddressRepository;
import nts.uk.shr.pereg.app.command.PeregUpdateCommandHandler;

@Stateless
public class UpdateCurrentAddressCommandHandler extends CommandHandler<UpdateCurrentAddressCommand>
implements PeregUpdateCommandHandler<UpdateCurrentAddressCommand>{
	
	@Inject
	private CurrentAddressRepository currentAddressRepository;
	
	@Override
	public String targetCategoryCd() {
		return "CS00003";
	}

	@Override
	public Class<?> commandClass() {
		return UpdateCurrentAddressCommand.class;
	}

	@Override
	protected void handle(CommandHandlerContext<UpdateCurrentAddressCommand> context) {
		
		val command = context.getCommand();
		
		CurrentAddress currentAddress = CurrentAddress.createFromJavaType(command.getCurrentAddressId(), command.getPid(), command.getCountryId(), command.getPostalCode(),
				command.getPhoneNumber(), command.getPrefectures(), command.getHouseRent(), command.getStartDate(), command.getEndDate(),
				command.getAddress1(), command.getAddressKana1(), command.getAddress2(), command.getAddressKana2(), command.getHomeSituationType(),
				command.getCurrentAddressId(), command.getHouseType(), command.getNearestStation());
		
		// Update current address
		currentAddressRepository.updateCurrentAddress(currentAddress);
	}

}
