package nts.uk.ctx.sys.portal.app.command.smartphonetoppageset;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nts.uk.ctx.sys.portal.app.find.smartphonetoppage.SPTopPageSetDto;

/**
 * 
 * @author sonnh1
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateSPTopPageSetCommand {
	private List<SPTopPageSetDto> listSPTopPageSetDto;
}
