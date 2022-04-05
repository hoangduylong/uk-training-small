package nts.uk.ctx.sys.log.app.find.reference.record;

import lombok.Builder;
import lombok.Data;
import nts.gul.text.IdentifierUtil;
import nts.uk.shr.com.security.audittrail.basic.LogBasicInformation;

import java.util.List;

/**
 * All log dto
 */
@Data
@Builder
public class LogBasicInfoAllDto {
	/**
	 * Help us generate table in screen F
	 */
	private String parentKey;

	/**
	 * ログインユーザID / 操作者ユーザID / 修正者 ユーザID / 修正者 ユーザID
	 */
	private String userId;

	/**
	 * ログインユーザ名 / 操作者ユーザ名 / 修正者 ユーザ名 / 修正者 ユーザ名
	 */
	private String userName;

	/**
	 * ログイン社員コード / 操作者社員コード / 修正者 社員コード / 修正者 社員コード
	 */
	private String employeeCode;

	/**
	 * Use to get employee code
	 */
	private String employeeId;

	/**
	 * IPアドレス
	 */
	private String ipAddress;

	/**
	 * PC名
	 */
	private String pcName;

	/**
	 * アカウント
	 */
	private String account;

	/**
	 * ログイン日時 / 起動日時 / 修正日時 / 修正日時
	 */
	private String modifyDateTime;

	/**
	 * 就業権限名称
	 */
	private String employmentAuthorityName;

	/**
	 * 給与権限名称
	 */
	private String salarytAuthorityName;

	/**
	 * 人事権限名称
	 */
	private String personalAuthorityName;

	/**
	 * オフィスヘルパー権限名称
	 */
	private String officeHelperAuthorityName;

	/**
	 * 会計権限名称
	 */
	private String accountAuthorityName;

	/**
	 * マイナンバー権限名称
	 */
	private String myNumberAuthorityName;

	/**
	 * グループ会社管理権限名称
	 */
	private String groupCompanyAdminAuthorityName;

	/**
	 * 会社管理者権限名称
	 */
	private String companyAdminAuthorityName;

	/**
	 * システム管理者権限名称
	 */
	private String systemAdminAuthorityName;

	/**
	 * 個人情報権限名称
	 */
	private String personalInfoAuthorityName;

	/**
	 * メニュー名称
	 */
	private String menuName;

	/**
	 * 備考
	 */
	private String note;

	/**
	 * ログイン状態 
	 * LOGIN
	 */
	private String loginStatus;

	/**
	 * ログイン方法
	 *  LOGIN
	 */
	private String loginMethod;

	/**
	 * アクセス元URL 
	 * LOGIN
	 */
	private String accessResourceUrl;

	/**
	 * 起動元メニュー名称 
	 * START
	 */
	private String startUpMenuName;

	/** List data correct log */
	private List<LogDataCorrectChildrenDto> logDataCorrectChildrenDtos;

	/** List person update log */
	private List<LogPersonalUpdateChildrenDto> logPersonalUpdateChildrenDtos;

	public static LogBasicInfoAllDto fromDomain(LogBasicInformation domain) {
		return LogBasicInfoAllDto.builder()
				.parentKey(IdentifierUtil.randomUniqueId())
				.userId(domain.getUserInfo().getUserId())
				.userName(domain.getUserInfo().getUserName())
				.employeeId(domain.getUserInfo().getEmployeeId())
				.ipAddress(domain.getLoginInformation().getIpAddress().orElse(null))
				.pcName(domain.getLoginInformation().getPcName().orElse(null))
				.account(domain.getLoginInformation().getAccount().orElse(null))
				.modifyDateTime(domain.getModifiedDateTime().toString("yyyy/MM/dd HH:mm:ss"))
				.note(domain.getNote().orElse(null))
				.build();
	}
}
