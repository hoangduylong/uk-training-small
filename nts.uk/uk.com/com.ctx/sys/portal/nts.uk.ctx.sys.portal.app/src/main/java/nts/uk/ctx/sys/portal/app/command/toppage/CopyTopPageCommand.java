/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.app.command.toppage;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * The Class CopyTopPageCommand.
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper=false)
public class CopyTopPageCommand extends TopPageBaseCommand {
	
	/** The is check overwrite. */
	public boolean isCheckOverwrite;
	
	/** The copy code. */
	public String copyCode;
}
