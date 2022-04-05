package nts.uk.shr.sample.lazyload.ws;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter @Getter
public class GridItem {
	private int id;
	private String flexImage;
	private boolean flag;
	private int ruleCode;
	private String time;
	private String addressCode1;
	private String addressCode2;
	private String address1;
	private String address2;
	private int comboCode1;
	private String combo;
	private String header0;
	private int comboCode2;
	private String header01;
	private String header02;
	private String header1;
	private String header2;
	private int header3;
	private String header4;
	private String header5;
	private String header6;
	private String alert;
	
	public GridItem(int index) {
		this.id = index;
		this.flexImage = index % 3 == 0 ? "1" : null;
        this.flag = index % 2 == 0;
        this.ruleCode = index;
        this.time = "13:36";
        this.addressCode1 = index % 3 == 0 ? null : "100";
        this.addressCode2 = "002";
        this.address1 = "HN";
        this.address2 = "愛知県日本";
        this.comboCode1 = index % 3 + 1;
        this.combo = String.valueOf(index % 3 + 1);
        this.header0 = "Out";
        this.comboCode2 = index % 3 + 4;
        this.header01 = String.valueOf(index % 3 + 4);
        this.header02 = String.valueOf(index % 3 + 1);
        this.header1 = "001";
        this.header2 = "内容１２";
        this.header3 = index % 9;
        this.header4 = "内容４";
        this.header5 = "002"; 
        this.header6 = "内容５６";
        this.alert = "Act";
	}
}
