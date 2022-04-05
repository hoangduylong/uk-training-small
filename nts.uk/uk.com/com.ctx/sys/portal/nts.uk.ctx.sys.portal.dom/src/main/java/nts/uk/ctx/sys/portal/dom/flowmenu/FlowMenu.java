/**
 * author hieult
 */
package nts.uk.ctx.sys.portal.dom.flowmenu;

import lombok.Getter;
import lombok.Setter;
import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.ctx.sys.portal.dom.enums.TopPagePartType;
import nts.uk.ctx.sys.portal.dom.toppagepart.TopPagePartCode;
import nts.uk.ctx.sys.portal.dom.toppagepart.TopPagePartName;
import nts.uk.ctx.sys.portal.dom.toppagepart.size.Size;

@Getter
public class FlowMenu extends AggregateRoot {
	
	/** 会社ID */
	private String companyID;
	
	/** コード  */
	private TopPagePartCode code;
	
	/** 名称  */
	@Setter
	private TopPagePartName name;

	/** FileID */
	@Setter
	private String fileID;

	/** DefaultClassificationAtribute */
	private DefClassAtr defClassAtr;
	
	/** All Agrs constructor */
	public FlowMenu(String companyID, String toppagePartID,
			TopPagePartCode code, TopPagePartName name,
			TopPagePartType type, Size size,
			String fileID, DefClassAtr defClassAtr) {
		this.companyID = companyID;
		this.code = code;
		this.name = name;
		this.fileID = fileID;
		this.defClassAtr = defClassAtr;
		
	}
	
	/** Create from Java type */
	public static FlowMenu createFromJavaType(String companyID, String toppagePartID,
			String code, String name,
			int type, int width, int height,
			String fileID,  int defClassAtr ) {
		return new FlowMenu(companyID, toppagePartID, 
			new TopPagePartCode(code), new TopPagePartName(name),
			EnumAdaptor.valueOf(type, TopPagePartType.class), Size.createFromJavaType(width, height),
			fileID,
			EnumAdaptor.valueOf(defClassAtr, DefClassAtr.class
			)
		);
	}

	/** Set FlowMenu DefClassAtr */
	public void setDefClassAtr(int defClassAtr) {
		this.defClassAtr = EnumAdaptor.valueOf(defClassAtr, DefClassAtr.class);
	}

}