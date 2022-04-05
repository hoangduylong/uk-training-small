package nts.uk.shr.pereg.app.command;

public interface PeregCommandHandler<C> {

	/**
	 * Returns Code of category that this handler can handle
	 * @return category Code
	 */
	String targetCategoryCd();
	
	/**
	 * Returns class of command that is handled by this handler
	 * @return class of command
	 */
	Class<?> commandClass();
}
