package nts.uk.shr.infra.file.report.masterlist.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MasterHeaderColumn {

	private String columnId;

	private String columnText;

	private MasterCellStyle style;

	public MasterHeaderColumn(String columnId, String columnText, ColumnTextAlign textAlign, String columnFormat,
			boolean display) {
		super();
		this.columnId = columnId;
		this.columnText = columnText;
		this.style = MasterCellStyle.build().horizontalAlign(textAlign).columnFormat(columnFormat).display(display);
	}

	public void setTextAlign(ColumnTextAlign textAlign) {
		this.style.horizontalAlign(textAlign);
	}
	
	public ColumnTextAlign getTextAlign(){
		return this.style.horizontalAlign();
	}

	public void setColumnFormat(String columnFormat) {
		this.style.columnFormat(columnFormat);
	}
	
	public String getColumnFormat(){
		return this.style.columnFormat();
	}

	public void setDisplay(boolean display) {
		this.style.display(display);
	}
	
	public boolean isDisplay(){
		return this.style.display();
	}
	
	public void setStyle(MasterCellStyle style) {
		if (style != null) {
			this.style = style;
		}
	}
}
