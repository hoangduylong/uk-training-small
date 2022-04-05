package nts.uk.ctx.bs.employee.app.command.employee.contact;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregItem;

@Getter
public class AddEmployeeInfoContactCommand {
	//社員ID
	@PeregEmployeeId
	private String sid;
	
	//メールアドレス
	@PeregItem("IS00272")
	private String mailAddress;
	
	//座席ダイヤルイン
	@PeregItem("IS00274")
	private String seatDialIn;
	
	//座席内線番号
	@PeregItem("IS00275")
	private String seatExtensionNo;
	
	//携帯メールアドレス
	@PeregItem("IS00273")
	private String phoneMailAddress;
	
	//携帯電話番号
	@PeregItem("IS00271")
	private String cellPhoneNo;
}
