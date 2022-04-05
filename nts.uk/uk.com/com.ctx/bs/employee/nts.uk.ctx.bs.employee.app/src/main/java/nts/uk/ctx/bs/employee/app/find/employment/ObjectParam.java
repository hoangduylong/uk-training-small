package nts.uk.ctx.bs.employee.app.find.employment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.time.calendar.period.DatePeriod;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class ObjectParam {
	String employmentCode; // 雇用コード
	DatePeriod birthdayPeriod; // 誕生日期間
}
