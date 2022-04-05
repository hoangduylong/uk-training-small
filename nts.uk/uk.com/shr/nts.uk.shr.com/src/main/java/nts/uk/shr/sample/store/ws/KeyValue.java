package nts.uk.shr.sample.store.ws;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter
public class KeyValue {

	private String key;
	private Columns columns;
	
	@Setter @Getter
	@NoArgsConstructor
	@AllArgsConstructor
	public class Columns {
		private double id;
		private double picture;
		private double flag;
		private double ruleCode;
		private double time;
		private double addressCode1;
		private double address1;
		private double comboCode1;
		private double combo;
		private double header0;
		private double comboCode2;
		private double header01;
		private double header02;
		private double addressCode2; 
		private double address2;
		private double header1;
		private double header2;
		private double header3;
		private double header4;
		private double header5;
		private double header6;
		private double alert;
	}
}
