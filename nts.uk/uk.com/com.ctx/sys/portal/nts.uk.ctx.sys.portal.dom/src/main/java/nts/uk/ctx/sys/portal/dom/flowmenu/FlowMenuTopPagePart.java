package nts.uk.ctx.sys.portal.dom.flowmenu;

import lombok.Getter;
import lombok.Setter;
import nts.arc.enums.EnumAdaptor;
import nts.uk.ctx.sys.portal.dom.enums.TopPagePartType;
import nts.uk.ctx.sys.portal.dom.toppagepart.TopPagePartCode;
import nts.uk.ctx.sys.portal.dom.toppagepart.TopPagePartName;
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.FileName;
import nts.uk.ctx.sys.portal.dom.toppagepart.size.Size;
@Getter
@Setter
public class FlowMenuTopPagePart {
	/** Toppage Part GUID */
	private String toppagePartID;
	/** FileName */
	private FileName fileName;

	/** DefaultClassificationAtribute */
	private DefClassAtr defClassAtr;
	/** ToppagePart Code */
	private TopPagePartCode code;

	/** ToppagePart Name */
	private TopPagePartName name;

	/** Enum ToppagePart Type */
	private TopPagePartType type;
	/** Size */
	private Size size;

	
	public static FlowMenuTopPagePart createFromJavaType(String toppagePartID,
			String fileName,
			int	 defClassAtr,
			String code,
			String name,
			int type,
			int widthSize,
			int heightSize){
				return new FlowMenuTopPagePart(toppagePartID,
						new FileName(fileName),
						EnumAdaptor.valueOf(defClassAtr, DefClassAtr.class),
						new TopPagePartCode(code),
						new TopPagePartName(name),
						EnumAdaptor.valueOf(type, TopPagePartType.class),
						Size.createFromJavaType(widthSize, heightSize));		
	}

	public FlowMenuTopPagePart(String toppagePartID,
			FileName fileName,
			DefClassAtr defClassAtr, 
			TopPagePartCode code, 
			TopPagePartName name, 
			TopPagePartType type, 
			Size size) {
		super();
		this.toppagePartID = toppagePartID;
		this.fileName = fileName;
		this.defClassAtr = defClassAtr;
		this.code = code;
		this.name = name;
		this.type = type;
		this.size = size;
	}
}
