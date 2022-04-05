package nts.uk.ctx.bs.employee.pub.employee;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.time.GeneralDate;

@Getter
@AllArgsConstructor
public class EmpInfo614Param {
	
	public String baseDate; // 基準日
	
	public String cId; //ログイン会社ID
	
	public String keyword; //キーワード

	public Boolean includePreEmployee; //入社前社員を含める
	
	public Boolean includeRetirement; //退職者を含める
	
	public Boolean includeAbsence; //休職者を含める 
	
	public Boolean includeClosed; //休業者を含める
	
	public Boolean includeTransferEmployee; //出向社員を含める
	
	public Boolean includeAcceptanceTransferEmployee; //受入出向社員を含める
	
	public GeneralDate getBaseDate() {
		return GeneralDate.fromString(this.baseDate, "yyyy/MM/dd");
	}
}
