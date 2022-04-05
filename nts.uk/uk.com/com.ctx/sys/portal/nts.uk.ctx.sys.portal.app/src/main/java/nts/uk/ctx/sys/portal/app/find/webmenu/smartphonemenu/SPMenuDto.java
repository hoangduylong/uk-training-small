package nts.uk.ctx.sys.portal.app.find.webmenu.smartphonemenu;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 
 * @author sonnh1
 *
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SPMenuDto {
	private String menuCd;
	private String displayName;
	private String targetItems;
	private int displayOrder;
	private boolean child;
	private List<SPMenuDto> lstChild;
}
