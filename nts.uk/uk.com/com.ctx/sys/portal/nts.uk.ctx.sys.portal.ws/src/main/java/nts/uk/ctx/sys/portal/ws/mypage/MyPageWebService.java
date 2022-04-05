package nts.uk.ctx.sys.portal.ws.mypage;

import javax.ejb.Stateless;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import nts.arc.layer.ws.WebService;

@Path("/myprofile")
@Stateless
public class MyPageWebService extends WebService {
	@POST
	@Path("birthday")
	public MyBirthdayDto findMyBirthday() {
		
		return new MyBirthdayDto("日通　太郎さん　お誕生日おめでとうございます。", true);
	}
}
