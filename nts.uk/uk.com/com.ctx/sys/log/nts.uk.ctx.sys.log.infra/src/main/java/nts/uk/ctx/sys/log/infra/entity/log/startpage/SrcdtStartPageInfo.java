package nts.uk.ctx.sys.log.infra.entity.log.startpage;

import java.util.Optional;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDateTime;
import nts.gul.text.StringUtil;
import nts.uk.shr.com.context.ScreenIdentifier;
import nts.uk.shr.com.context.loginuser.role.DefaultLoginUserRoles;
import nts.uk.shr.com.security.audittrail.basic.LogBasicInformation;
import nts.uk.shr.com.security.audittrail.basic.LoginInformation;
import nts.uk.shr.com.security.audittrail.correction.content.UserInfo;
import nts.uk.shr.com.security.audittrail.start.StartPageLog;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/** @author Tindh - 起動記録 */

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "SRCDT_START_PAGE_INFO")
public class SrcdtStartPageInfo extends ContractUkJpaEntity {

	@Id
	@Column(name = "OPERATION_ID")
	public String operationId;

	@Column(name = "START_BEFORE_PGID")
	public String startBeforePid;

	@Column(name = "START_BEFORE_SCREEN_ID")
	public String startBeforScId;

	@Column(name = "START_BEFORE_QUERY_STRING")
	public String startBeforeQuery;

	@Column(name = "CID")
	@Basic(optional = false)
	public String companyId;

	@Column(name = "USER_ID")
	@Basic(optional = false)
	public String userId;

	@Column(name = "USER_NAME")
	@Basic(optional = false)
	public String userName;

	@Column(name = "SID")
	@Basic(optional = false)
	public String employeeId;

	@Column(name = "IP_ADDRESS")
	public String ipAddress;

	@Column(name = "PC_NAME")
	public String pcName;

	@Column(name = "ACCOUNT")
	public String account;

	@Column(name = "START_DT")
	@Basic(optional = false)
	public GeneralDateTime startDateTime;

	@Column(name = "PGID")
	@Basic(optional = false)
	public String programId;

	@Column(name = "SCREEN_ID")
	@Basic(optional = false)
	public String screenId;

	@Column(name = "QUERY_STRING")
	@Basic(optional = false)
	public String queryString;

	@Column(name = "OFFICE_HELPER_ROLE")
	public String officeHelperRoleId;

	@Column(name = "GROUP_COM_ADMIN_ROLE")
	public String groupCompaniesAdminRoleId;

	@Column(name = "SYS_ADMIN_ROLE")
	public String systemAdminRoleId;

	@Column(name = "MY_NUMBER_ROLE")
	public String myNumberRoleId;

	@Column(name = "PERSONNEL_ROLE")
	public String personnelRoleId;

	@Column(name = "COM_ADMIN_ROLE")
	public String companyAdminRoleId;

	@Column(name = "ACCOUNTING_ROLE")
	public String accountingRoleId;

	@Column(name = "PERSON_INFO_ROLE")
	public String personalInfoRoleId;

	@Column(name = "ATTENDANCE_ROLE")
	public String attendanceRoleId;

	@Column(name = "PAYROLL_ROLE")
	public String payrollRoleId;

	@Column(name = "NOTE")
	public String note;

	@Override
	protected Object getKey() {
		return this.operationId;
	}

	public StartPageLog toDomain() {
		LogBasicInformation basicInfo = new LogBasicInformation(operationId, companyId, 
															UserInfo.employee(userId, employeeId, userName), 
															new LoginInformation(ipAddress, pcName, account), startDateTime, toUserRoles(), 
															new ScreenIdentifier(programId, screenId, queryString), 
															Optional.ofNullable(note));
		if(StringUtil.isNullOrEmpty(startBeforePid, true)){
			return StartPageLog.specialStarted(basicInfo);
		}
		return StartPageLog.pageStarted(new ScreenIdentifier(startBeforePid, startBeforScId, startBeforeQuery), basicInfo);
	}
	
	public static SrcdtStartPageInfo from(StartPageLog domain){
		SrcdtStartPageInfo entity = new SrcdtStartPageInfo();
		LogBasicInformation basicInfo = domain.getBasicInfo();
		entity.operationId = basicInfo.getOperationId();
		entity.companyId = basicInfo.getCompanyId();
		entity.userId = basicInfo.getUserInfo().getUserId();
		entity.userName = basicInfo.getUserInfo().getUserName();
		entity.employeeId = basicInfo.getUserInfo().getEmployeeId();
		entity.ipAddress = basicInfo.getLoginInformation().getIpAddress().orElse(null);
		entity.pcName = basicInfo.getLoginInformation().getPcName().orElse(null);
		entity.account = basicInfo.getLoginInformation().getAccount().orElse(null);
		entity.startDateTime = basicInfo.getModifiedDateTime();
		entity.programId = basicInfo.getTargetProgram().getProgramId();
		entity.screenId = basicInfo.getTargetProgram().getScreenId();
		entity.queryString = basicInfo.getTargetProgram().getQueryString();
		entity.officeHelperRoleId = basicInfo.getAuthorityInformation().forOfficeHelper();
		entity.groupCompaniesAdminRoleId = basicInfo.getAuthorityInformation().forCompanyAdmin();
		entity.systemAdminRoleId = basicInfo.getAuthorityInformation().forSystemAdmin();
//		entity.myNumberRoleId = basicInfo.getAuthorityInformation().nu;
		entity.personnelRoleId = basicInfo.getAuthorityInformation().forPersonnel();
		entity.companyAdminRoleId = basicInfo.getAuthorityInformation().forCompanyAdmin();
//		entity.accountingRoleId = basicInfo.getAuthorityInformation().ac;
		entity.personalInfoRoleId = basicInfo.getAuthorityInformation().forPersonalInfo();
		entity.attendanceRoleId = basicInfo.getAuthorityInformation().forAttendance();
		entity.payrollRoleId = basicInfo.getAuthorityInformation().forPayroll();
		entity.note = basicInfo.getNote().orElse(null);
		domain.getStartPageBeforeInfo().ifPresent(sb -> {
			entity.startBeforePid = sb.getProgramId();
			entity.startBeforScId = sb.getScreenId();
			entity.startBeforeQuery = sb.getQueryString();
		});
		return entity;
	}

	private DefaultLoginUserRoles toUserRoles() {
		DefaultLoginUserRoles loginRole = new DefaultLoginUserRoles();
		loginRole.setRoleIdForAttendance(attendanceRoleId);
		loginRole.setRoleIdforCompanyAdmin(companyAdminRoleId);
		loginRole.setRoleIdforGroupCompaniesAdmin(groupCompaniesAdminRoleId);
		loginRole.setRoleIdforOfficeHelper(officeHelperRoleId);
		loginRole.setRoleIdForPayroll(payrollRoleId);
		loginRole.setRoleIdforPersonalInfo(personalInfoRoleId);
		loginRole.setRoleIdForPersonnel(personnelRoleId);
		loginRole.setRoleIdforSystemAdmin(systemAdminRoleId);
		return loginRole;
	}
}
