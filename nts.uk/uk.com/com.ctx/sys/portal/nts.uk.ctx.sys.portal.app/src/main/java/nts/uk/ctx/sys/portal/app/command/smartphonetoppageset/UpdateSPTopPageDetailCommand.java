package nts.uk.ctx.sys.portal.app.command.smartphonetoppageset;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nts.uk.ctx.sys.portal.app.find.smartphonetoppage.SPTopPageDetailDto;

/**
 * 
 * @author sonnh1
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateSPTopPageDetailCommand {
	private List<SPTopPageDetailDto> listSPTopPageDetailDto;
}
