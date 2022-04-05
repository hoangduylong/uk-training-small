package nts.uk.ctx.sys.gateway.app.find.system;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.gateway.app.command.systemsuspend.SystemSuspendOutput;
import nts.uk.ctx.sys.gateway.app.command.systemsuspend.SystemSuspendService;
import nts.uk.ctx.sys.gateway.dom.loginold.adapter.RoleAdapter;
import nts.uk.ctx.sys.gateway.dom.stopbycompany.StopByCompany;
import nts.uk.ctx.sys.gateway.dom.stopbycompany.StopByCompanyRepository;
import nts.uk.ctx.sys.gateway.dom.stopbycompany.StopModeType;
import nts.uk.ctx.sys.gateway.dom.stopbycompany.SystemStatusType;
import nts.uk.ctx.sys.gateway.dom.stopbysystem.StopBySystem;
import nts.uk.ctx.sys.gateway.dom.stopbysystem.StopBySystemRepository;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;
import nts.uk.shr.com.operation.SystemOperationSetting;
import nts.uk.shr.com.operation.SystemOperationSetting.SystemOperationMode;
import nts.uk.shr.com.operation.SystemOperationSetting.SystemStopMode;
import nts.uk.shr.com.operation.SystemOperationSetting.SystemStopType;
import nts.uk.shr.com.operation.SystemOperationSettingAdapter;
import nts.uk.shr.com.operation.SystemSuspendOut;

@Stateless
public class SystemOperationSettingAdapterImpl implements SystemOperationSettingAdapter {

	@Inject
	private SystemSuspendService sysSuspendSv;
	
	@Inject
	private StopBySystemRepository stopBySysRepo;

	@Inject
	private StopByCompanyRepository stopByComRepo;
	
	@Inject
	private RoleAdapter roleAdapter;

	/**
	 * CCG020_メニュー.システム利用停止の警告確認
	 * @return
	 */
	@Override
	public SystemOperationSetting getSetting() {
		String contractCd = AppContexts.user().contractCode();
		String companyCd = AppContexts.user().companyCode();
		//ドメインモデル「システム全体の利用停止の設定」を取得する
//		検索条件：
//		　契約コード＝「ログイン共通変数の契約コード」
//		　システム利用状態＝「利用停止前段階」
		Optional<StopBySystem> sys = stopBySysRepo.findByCdStatus(contractCd, SystemStatusType.IN_PROGRESS.value);
		//ドメインモデル「会社単位の利用停止の設定」を取得する
//		検索条件：
//		　契約コード＝ログイン共通変数の「契約コード」
//		　会社コード＝ログイン共通変数の「会社コード」
//		　システム利用状態＝「利用停止前段階」
		Optional<StopByCompany> com = stopByComRepo.findByCdStt(contractCd, companyCd, SystemStatusType.IN_PROGRESS.value);
		//レコードが取得できたか判別
		if(!sys.isPresent() && !com.isPresent()){//どちらもレコードが取得できない場合
			//変数（停止予告メッセージ）をクリアする
			//state = 0 (RUNNING or STOP ),  msg = null
			return SystemOperationSetting.setting(SystemStopType.COMPANY, SystemOperationMode.RUNNING, SystemStopMode.ADMIN_MODE, null, null, false);
		}
		//1件または2件のレコードが取得できた場合
		//取得した「停止予告メッセージ」を編集する
		String msgSys = "";
		String msgCom = "";
		if(sys.isPresent()){
			msgSys = sys.get().getStopMessage().v();
		}
		if(com.isPresent()){
			msgCom = com.get().getStopMessage().v();
		}
		String msgFull = msgSys + msgCom;
		if (!msgSys.isEmpty() && !msgCom.isEmpty()) {
			msgFull = msgSys + "\n\n" + msgCom;
		}
		return SystemOperationSetting.setting(SystemStopType.COMPANY, SystemOperationMode.IN_PROGRESS, SystemStopMode.ADMIN_MODE, null, msgFull, true);
	}

	@Override
	public Optional<String> stopUseConfirm() {
		LoginUserRoles role = AppContexts.user().roles();
		if (role.forSystemAdmin() != null || role.forCompanyAdmin() != null) {
			return Optional.empty();
		}

		BusinessState businessState = roleAdapter.isEmpWhetherLoginerCharge() ? checkBusinessStateForAdmin() : checkBusinessState();

		if (businessState.canDoBusiness) {
			return Optional.empty();
		} else {
			return Optional.of(businessState.stopMessage);
		}

	}

	/**
	 * 業務担当者が業務可能か判別する
	 * 
	 * @return
	 */
	private BusinessState checkBusinessStateForAdmin() {
		Optional<StopBySystem> stopBySystemOpt = stopBySysRepo.findByKey(AppContexts.user().contractCode());

		if (isStopSystemAdmin(stopBySystemOpt)) {
			return new BusinessState(stopBySystemOpt.get().getStopMessage().v());
		}

		Optional<StopByCompany> stopByComOpt = stopByComRepo.findByKey(AppContexts.user().contractCode(),
				AppContexts.user().companyCode());

		if (isStopCompanyAdmin(stopByComOpt)) {
			return new BusinessState(stopByComOpt.get().getStopMessage().v());
		}

		return new BusinessState();

	}

	/**
	 * システム管理者/会社管理者/業務担当者でない場合業務可能か判別する
	 * 
	 * @return
	 */
	private BusinessState checkBusinessState() {
		Optional<StopBySystem> stopBySystemOpt = stopBySysRepo.findByKey(AppContexts.user().contractCode());

		if (isStopSystem(stopBySystemOpt)) {
			return new BusinessState(stopBySystemOpt.get().getStopMessage().v());
		}

		Optional<StopByCompany> stopByComOpt = stopByComRepo.findByKey(AppContexts.user().contractCode(),
				AppContexts.user().companyCode());

		if (isStopCompany(stopByComOpt)) {
			return new BusinessState(stopByComOpt.get().getStopMessage().v());
		}

		return new BusinessState();
	}

	private boolean isStopSystemAdmin(Optional<StopBySystem> stopBySystemOpt) {
		if (!stopBySystemOpt.isPresent()) {
			return false;
		}

		StopBySystem stopBySystem = stopBySystemOpt.get();

		return stopBySystem.getSystemStatus() == SystemStatusType.STOP
				&& stopBySystem.getStopMode() == StopModeType.ADMIN_MODE;
	}

	private boolean isStopSystem(Optional<StopBySystem> stopBySystemOpt) {
		if (!stopBySystemOpt.isPresent()) {
			return false;
		}

		StopBySystem stopBySystem = stopBySystemOpt.get();

		return stopBySystem.getSystemStatus() == SystemStatusType.STOP;
	}

	private boolean isStopCompanyAdmin(Optional<StopByCompany> stopByComOpt) {
		if (!stopByComOpt.isPresent()) {
			return false;
		}

		StopByCompany stopByCom = stopByComOpt.get();

		return stopByCom.getSystemStatus() == SystemStatusType.STOP
				&& stopByCom.getStopMode() == StopModeType.ADMIN_MODE;
	}

	private boolean isStopCompany(Optional<StopByCompany> stopByComOpt) {
		if (!stopByComOpt.isPresent()) {
			return false;
		}

		StopByCompany stopByCom = stopByComOpt.get();

		return stopByCom.getSystemStatus() == SystemStatusType.STOP;
	}

	class BusinessState {

		boolean canDoBusiness;

		String stopMessage;

		public BusinessState(String stopMessage) {
			this.canDoBusiness = false;
			this.stopMessage = stopMessage;
		}

		public BusinessState() {
			this.canDoBusiness = true;
			this.stopMessage = "";
		}

	}
	@Override
	public SystemSuspendOut stopUseConfirm_loginBf(String contractCD, String companyCD, int loginMethod, String programID, String screenID) {
		SystemSuspendOutput sys = sysSuspendSv.confirmSystemSuspend_BefLog(contractCD, companyCD, loginMethod, programID, screenID);
		return new SystemSuspendOut(sys.isError(), sys.getMsgID(), sys.getMsgContent());
	}
}
