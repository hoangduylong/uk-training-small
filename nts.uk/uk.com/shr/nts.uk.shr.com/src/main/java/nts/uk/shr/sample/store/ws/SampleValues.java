package nts.uk.shr.sample.store.ws;

import java.io.Serializable;

import javax.enterprise.context.SessionScoped;

import lombok.Getter;
import lombok.Setter;
import nts.uk.shr.sample.store.ws.KeyValue.Columns;

@SessionScoped
@Getter @Setter
public class SampleValues implements Serializable {

	private static final long serialVersionUID = 1L;
	private double id = 1;
	private double picture = 60;
	private double flag = 60;
	private double ruleCode = 100;
	private double time = 140;
	private double addressCode1 = 150;
	private double address1 = 150;
	private double comboCode1 = 60;
	private double combo = 230;
	private double header0 = 150;
	private double comboCode2 = 52.5;
	private double header01 = 262.5;
	private double header02 = 270.5;
	private double addressCode2 = 150; 
	private double address2 = 150;
	private double header1 = 150;
	private double header2 = 150;
	private double header3 = 150;
	private double header4 = 150;
	private double header5 = 150;
	private double header6 = 150;
	private double alert = 90;
	public void setValue(Columns columns) {
		if (columns.getId() > 0.0) this.id = columns.getId();
		if (columns.getPicture() > 0.0) this.picture = columns.getPicture();
		if (columns.getFlag() > 0.0) this.flag = columns.getFlag();
		if (columns.getRuleCode() > 0.0) this.ruleCode = columns.getRuleCode();
		if (columns.getTime() > 0.0) this.time = columns.getTime();
		if (columns.getAddressCode1() > 0.0) this.addressCode1 = columns.getAddressCode1();
		if (columns.getAddress1() > 0.0) this.address1 = columns.getAddress1();
		if (columns.getComboCode1() > 0.0) this.comboCode1 = columns.getComboCode1();
		if (columns.getCombo() > 0.0) this.combo = columns.getCombo();
		if (columns.getHeader0() > 0.0) this.header0 = columns.getHeader0();
		if (columns.getComboCode2() > 0.0) this.comboCode2 = columns.getComboCode2();
		if (columns.getHeader01() > 0.0) this.header01 = columns.getHeader01();
		if (columns.getHeader02() > 0.0) this.header02 = columns.getHeader02();
		if (columns.getAddressCode2() > 0.0) this.addressCode2 = columns.getAddressCode2();
		if (columns.getAddress2() > 0.0) this.address2 = columns.getAddress2();
		if (columns.getHeader1() > 0.0) this.header1 = columns.getHeader1();
		if (columns.getHeader2() > 0.0) this.header2 = columns.getHeader2();
		if (columns.getHeader3() > 0.0) this.header3 = columns.getHeader3();
		if (columns.getHeader4() > 0.0) this.header4 = columns.getHeader4();
		if (columns.getHeader5() > 0.0) this.header5 = columns.getHeader5();
		if (columns.getHeader6() > 0.0) this.header6 = columns.getHeader6();
		if (columns.getAlert() > 0.0) this.alert = columns.getAlert();
	}
	
	public Columns toColumns() {
		return new KeyValue().new Columns(this.id, this.picture, this.flag, this.ruleCode, this.time, this.addressCode1, this.address1,
				this.comboCode1, this.combo, this.header0, this.comboCode2, this.header01, this.header02, this.addressCode2, 
				this.address2, this.header1, this.header2, this.header3, this.header4, this.header5, this.header6, this.alert);
	}
}
