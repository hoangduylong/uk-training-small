package nts.uk.ctx.sys.portal.app.command.titlemenu;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter	
@Setter
@NoArgsConstructor
@AllArgsConstructor	
/**
 * @author hieult
 */
public class CopyTitleMenuCommand {
	
	private String sourceTitleMenuCD;
	
	private String targetTitleMenuCD;
	
	private String targetTitleMenuName;
	
	private Boolean overwrite;
	
}