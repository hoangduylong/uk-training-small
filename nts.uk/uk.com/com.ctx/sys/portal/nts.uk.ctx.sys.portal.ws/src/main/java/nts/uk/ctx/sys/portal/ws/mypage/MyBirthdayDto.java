package nts.uk.ctx.sys.portal.ws.mypage;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MyBirthdayDto {
	private String message;
	private boolean checkBirthday;
}
