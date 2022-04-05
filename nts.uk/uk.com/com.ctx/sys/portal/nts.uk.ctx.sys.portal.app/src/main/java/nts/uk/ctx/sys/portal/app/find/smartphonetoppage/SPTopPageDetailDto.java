package nts.uk.ctx.sys.portal.app.find.smartphonetoppage;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 
 * @author sonnh1
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SPTopPageDetailDto {
	private String companyId;
	private int type;
	private int displayAtr;
	private int detailType;
}
