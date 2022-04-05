package nts.uk.shr.pereg.app;

import lombok.Value;

@Value
public class ComboBoxObject {
	
	private String optionValue;
	
	private String optionText;
		
	public static ComboBoxObject toComboBoxObject(String value, String leftSymbolText, String rightSymbolText){
		String optionText = leftSymbolText + " ~ " + rightSymbolText;
		return new ComboBoxObject(value, optionText);
	};
}
