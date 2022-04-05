package nts.uk.shr.infra.file.report.masterlist.data;

import java.awt.Color;

import nts.gul.text.StringUtil;
import nts.uk.shr.infra.file.report.masterlist.generator.AsposeMasterListGenerator;

public class MasterCellStyle {

	private ColumnTextAlign horizontalAlign = ColumnTextAlign.CENTER;
	
	private ColumnTextAlign verticalAlign = ColumnTextAlign.CENTER;

	private boolean display = false;

	private int fontSize = AsposeMasterListGenerator.DEFAULT_FONT_SIZE;
	
	private String fontFamily = AsposeMasterListGenerator.DEFAULT_FONT_FAMILY;
	
	private String columnFormat = null;
	
	private Color backgroundColor = Color.WHITE;
	
	private Color textColor = Color.BLACK;
	
	public static MasterCellStyle build(){
		return new MasterCellStyle();
	}
	
	public MasterCellStyle horizontalAlign(ColumnTextAlign horizontalAlign) {
		if(horizontalAlign != null) {
			this.horizontalAlign = horizontalAlign;
		}
		return this;
	}
	
	public MasterCellStyle verticalAlign(ColumnTextAlign verticalAlign){
		if(verticalAlign != null) {
			this.verticalAlign = verticalAlign;
		}
		return this;
	}
	
	public MasterCellStyle display(boolean display){
		this.display = display;
		return this;
	}
	
	public MasterCellStyle fontSize(int fontSize){
		this.fontSize = fontSize;
		return this;
	}
	
	public MasterCellStyle fontFamily(String fontFamily){
		if(!StringUtil.isNullOrEmpty(fontFamily, true)) {
			this.fontFamily = fontFamily;
		}
		return this;
	}
	
	public MasterCellStyle columnFormat(String columnFormat){
		if(!StringUtil.isNullOrEmpty(columnFormat, true)) {
			this.columnFormat = columnFormat;
		}
		return this;
	}
	
	public MasterCellStyle backgroundColor(Color backgroundColor){
		if(backgroundColor != null) {
			this.backgroundColor = backgroundColor;
		}
		return this;
	}
	
	public MasterCellStyle textColor(Color textColor){
		if(textColor != null) {
			this.textColor = textColor;
		}
		return this;
	}
	
	public MasterCellStyle backgroundColor(String backgroundColor){
		if(!StringUtil.isNullOrEmpty(backgroundColor, true)) {
			this.backgroundColor = hexToColor(backgroundColor);
		}
		return this;
	}
	
	public MasterCellStyle textColor(String textColor){
		if(!StringUtil.isNullOrEmpty(textColor, true)) {
			this.textColor = hexToColor(textColor);
		}
		return this;
	}
	
	public ColumnTextAlign horizontalAlign(){
		return this.horizontalAlign;
	}
	
	public ColumnTextAlign verticalAlign(){
		return this.verticalAlign;
	}
	
	public boolean display(){
		return this.display;
	}
	
	public int fontSize(){
		return this.fontSize;
	}
	
	public String fontFamily(){
		return this.fontFamily;
	}
	
	public String columnFormat(){
		return this.columnFormat;
	}
	
	public Color backgroundColor(){
		return this.backgroundColor;
	}
	
	public Color textColor(){
		return this.textColor;
	}
	
	private  static Color hexToColor(String hex) {
	    switch (hex.length()) {
	        case 6:
	        	hex = "#" + hex;
	        case 7:
	            return Color.decode(hex);
	        case 9:
	    	    hex = hex.replace("#", "");
	        case 8:
	            return new Color(Integer.valueOf(hex.substring(0, 2), 16),
						            Integer.valueOf(hex.substring(2, 4), 16),
						            Integer.valueOf(hex.substring(4, 6), 16),
						            Integer.valueOf(hex.substring(6, 8), 16));
	    }
	    return null;
	}
}
