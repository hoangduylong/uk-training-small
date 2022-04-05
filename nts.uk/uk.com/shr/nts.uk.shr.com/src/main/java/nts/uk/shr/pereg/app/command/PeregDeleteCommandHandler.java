package nts.uk.shr.pereg.app.command;

import lombok.val;
import nts.gul.reflection.AnnotationUtil;
import nts.gul.reflection.ReflectionUtil;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregPersonId;
import nts.uk.shr.pereg.app.PeregRecordId;

public interface PeregDeleteCommandHandler<C> extends PeregCommandHandler<C>{
	
	void handle(C command);
	
	@SuppressWarnings("unchecked")
	default void handlePeregCommand(Object peregCommand) {
		this.handle((C)peregCommand);
	}

	default void handlePeregCommand(PeregDeleteCommand command) {
		val commandForSystemDomain = ReflectionUtil.newInstance(this.commandClass());
		
		// set person ID
		AnnotationUtil.getFieldAnnotated(this.commandClass(), PeregPersonId.class).ifPresent(field -> {
			ReflectionUtil.setFieldValue(field, commandForSystemDomain, command.getPersonId());
		});
		
		// set employee ID
		AnnotationUtil.getFieldAnnotated(this.commandClass(), PeregEmployeeId.class).ifPresent(field -> {
			ReflectionUtil.setFieldValue(field, commandForSystemDomain, command.getEmployeeId());
		});
		
		// set record ID
		AnnotationUtil.getFieldAnnotated(this.commandClass(), PeregRecordId.class).ifPresent(field -> {
			ReflectionUtil.setFieldValue(field, commandForSystemDomain, command.getRecordId());
		});
		
		this.handlePeregCommand(commandForSystemDomain);
	}
}
