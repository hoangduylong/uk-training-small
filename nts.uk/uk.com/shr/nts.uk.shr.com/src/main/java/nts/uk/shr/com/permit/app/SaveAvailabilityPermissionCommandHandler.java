package nts.uk.shr.com.permit.app;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.shr.com.permit.AvailabilityPermissionBase;
import nts.uk.shr.com.permit.AvailabilityPermissionRepositoryBase;
import nts.uk.shr.com.permit.RestoreAvailabilityPermission;

public abstract class SaveAvailabilityPermissionCommandHandler
		<D extends AvailabilityPermissionBase, R extends AvailabilityPermissionRepositoryBase<D>>
		extends CommandHandler<SaveAvailabilityPermissionCommand> {
	
	@Override
	protected void handle(CommandHandlerContext<SaveAvailabilityPermissionCommand> context) {
		
		SaveAvailabilityPermissionService.save(
				context.getCommand(),
				restore -> this.createDomain(restore),
				this.getInjectedRepository());
	}

	protected abstract R getInjectedRepository();
	
	protected abstract D createDomain(RestoreAvailabilityPermission restore);
}
