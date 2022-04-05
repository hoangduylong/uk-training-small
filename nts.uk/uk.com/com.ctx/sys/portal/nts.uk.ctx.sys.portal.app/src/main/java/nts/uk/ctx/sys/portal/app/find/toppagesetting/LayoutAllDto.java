package nts.uk.ctx.sys.portal.app.find.toppagesetting;

import lombok.Value;

@Value
public class LayoutAllDto {

	/**my page*/
	private LayoutForMyPageDto myPage;
	/**top page*/
	private LayoutForTopPageDto topPage;
	/**check xem hien thi toppage hay mypage truoc*/
	private boolean check;
	/**check my page co duoc hien khong*/
	private boolean checkMyPage;
	/**check top page co duoc setting khong*/
	private boolean checkTopPage;
	
	/**
	 * ビルトインユーザ用
	 * @return
	 */
	public static LayoutAllDto forBuiltInUser() {
		return new LayoutAllDto(null, null, false, false, false);
	}
}
