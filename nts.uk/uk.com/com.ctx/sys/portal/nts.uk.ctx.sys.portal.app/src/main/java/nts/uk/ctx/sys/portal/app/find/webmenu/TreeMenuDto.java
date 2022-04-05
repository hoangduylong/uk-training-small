package nts.uk.ctx.sys.portal.app.find.webmenu;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TreeMenuDto {

	private String code;

	private int displayOrder;

	private int classification;

	private int system;

}
