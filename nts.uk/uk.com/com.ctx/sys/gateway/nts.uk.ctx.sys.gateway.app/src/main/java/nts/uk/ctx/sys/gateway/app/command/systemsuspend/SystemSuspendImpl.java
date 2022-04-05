package nts.uk.ctx.sys.gateway.app.command.systemsuspend;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import org.apache.logging.log4j.util.Strings;

import nts.uk.ctx.sys.gateway.app.command.loginold.LoginRecordRegistService;
import nts.uk.ctx.sys.gateway.app.command.loginold.dto.LoginRecordInput;
import nts.uk.ctx.sys.gateway.dom.company.CollectCompanyList;
import nts.uk.ctx.sys.gateway.dom.loginold.adapter.RoleAdapter;
import nts.uk.ctx.sys.gateway.dom.stopbycompany.StopByCompany;
import nts.uk.ctx.sys.gateway.dom.stopbycompany.StopByCompanyRepository;
import nts.uk.ctx.sys.gateway.dom.stopbycompany.StopModeType;
import nts.uk.ctx.sys.gateway.dom.stopbycompany.SystemStatusType;
import nts.uk.ctx.sys.gateway.dom.stopbysystem.StopBySystem;
import nts.uk.ctx.sys.gateway.dom.stopbysystem.StopBySystemRepository;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;

@Stateless
public class SystemSuspendImpl implements SystemSuspendService {
	
	@Inject
	private StopBySystemRepository stopBySystemRepository;
	
	@Inject
	private StopByCompanyRepository stopByCompanyRepository;
	
	@Inject
	private RoleAdapter roleAdapter;
	
	@Inject
	private LoginRecordRegistService loginRecordRegistService;
	@Inject
	private CollectCompanyList colComList;

	@Override
	public SystemSuspendOutput confirmSystemSuspend(String contractCD, String companyCD, int loginMethod, String programID, String screenID) {
		LoginUserRoles loginUserRoles = AppContexts.user().roles();

		return confirmSystemSuspend(contractCD, companyCD, loginMethod, programID, screenID, loginUserRoles);
	}
	
	@Override
	public SystemSuspendOutput confirmSystemSuspend(String contractCD, String companyCD, int loginMethod, String programID, String screenID, LoginUserRoles loginUserRoles) {
		// 「利用停止するしない」をチェックする
		UsageStopOutput usageStopOutput = this.checkUsageStop(contractCD, companyCD);
		if(!usageStopOutput.isUsageStop()){
			return new SystemSuspendOutput(false, "", "");
		}
		
		// [利用停止モード]を判別
		if(usageStopOutput.getStopMode()==StopModeType.ADMIN_MODE){
			// システム管理者ロールの設定があるか判別
			if(Strings.isNotBlank(loginUserRoles.forSystemAdmin())){
				return new SystemSuspendOutput(false, "Msg_1475", "");
			} 
			// 会社管理者ロールの設定があるか判別
			if(Strings.isNotBlank(loginUserRoles.forCompanyAdmin())){
				return new SystemSuspendOutput(false, "Msg_1475", "");
			}
		} else {
			// システム管理者ロールの設定があるか判別
			if(Strings.isNotBlank(loginUserRoles.forSystemAdmin())){
				return new SystemSuspendOutput(false, "Msg_1475", "");
			} 
			// 会社管理者ロールの設定があるか判別
			if(Strings.isNotBlank(loginUserRoles.forCompanyAdmin())){
				return new SystemSuspendOutput(false, "Msg_1475", "");
			}
			// リクエストリスト497を呼ぶ。：「ログイン者が担当者か判断する」で担当者ロールが存在するかを判別
			if(roleAdapter.isEmpWhetherLoginerCharge(loginUserRoles)){
				return new SystemSuspendOutput(false, "Msg_1475", "");
			}
		}
		// エラーメッセージダイアログを表示して、処理をエラー状態とする
		String msg = usageStopOutput.getStopMessage();
		// アルゴリズム「ログイン記録」を実行する１
		loginRecordRegistService.loginRecord(
				new LoginRecordInput(
						programID, 
						screenID, 
						"", 
						1, 
						loginMethod, 
						"", 
						"システム利用停止状態", 
						null), 
				"");
		return new SystemSuspendOutput(true, "", msg);
	}

	//#EA修正.3127
	//2019.02.22 hoatt
	@Override
	public UsageStopOutput checkUsageStop(String contractCD, String companyCD){
		//ドメインモデル「会社単位の利用停止」を取得する
		Optional<StopByCompany> opStopByCom = stopByCompanyRepository.findByKey(contractCD, companyCD);
		if(opStopByCom.isPresent()){//取得できる
			StopByCompany stopByCom = opStopByCom.get();
			//ドメインモデル「会社単位の利用停止.システム利用状態」をチェックする
			if(stopByCom.getSystemStatus()==SystemStatusType.STOP){
				//EA修正履歴No.3136
				//2019.03.02 hoatt
				//ドメインモデル「システム全体の利用停止」を取得する　#106436
				Optional<StopBySystem> opStopBySystem = stopBySystemRepository.findByKey(contractCD);
				if(opStopBySystem.isPresent()){
					StopBySystem stopBySystem = opStopBySystem.get();
					//ドメインモデル「システム全体の利用停止.システム利用状態」をチェックする　#106436 , ドメインモデル「会社単位の利用停止.利用停止モード」をチェックする　#106436
					if(stopBySystem.getSystemStatus().equals(SystemStatusType.STOP) &&
							stopByCom.getStopMode().equals(StopModeType.PERSON_MODE)){//システム:「利用停止中」の場合   & 会社:担当者モード(1)
						//「利用停止する」、　【システム全体の利用停止.利用停止モード】を返す　#106436
						return new UsageStopOutput(true, stopBySystem.getStopMode(), stopBySystem.getStopMessage().v());
					}
				}
				//システム:取得できない  || システム:「利用停止中」の以外の場合  || 会社:管理者モード(2)
				//「利用停止する」、　【会社単位の利用停止.利用停止モード】を返す　#106436
				return new UsageStopOutput(true, stopByCom.getStopMode(), stopByCom.getStopMessage().v());
			}
		}
		//会社:取得できない
		//ドメインモデル「システム全体の利用停止」を取得する
		Optional<StopBySystem> opStopBySystem = stopBySystemRepository.findByKey(contractCD);
		if(!opStopBySystem.isPresent()){
			// 「利用停止しない」を返す
			return new UsageStopOutput(false, StopModeType.ADMIN_MODE, "");
		}
		if(opStopBySystem.get().getSystemStatus()==SystemStatusType.STOP){
			//「利用停止する」、　【システム全体の利用停止.利用停止モード】を返す
			return new UsageStopOutput(true, opStopBySystem.get().getStopMode(), opStopBySystem.get().getStopMessage().v()); 
		} 
		// 「利用停止しない」を返す
		return new UsageStopOutput(false, StopModeType.ADMIN_MODE, "");
	}

	/**
	 * システム利用停止の確認_ログイン前
	 */
	@Override
	public SystemSuspendOutput confirmSystemSuspend_BefLog(String contractCD, String companyCD, int loginMethod,
			String programID, String screenID) {
		// 「利用停止するしない」をチェックする
		UsageStopOutput usageStopOutput = this.checkUsageStop(contractCD, companyCD);
		if(!usageStopOutput.isUsageStop()){//利用停止しないの場合
			return new SystemSuspendOutput(false, "", "");
		}
		//利用停止するの場合
		String companyIdNew = contractCD + "-" + companyCD;
		//利用停止のチェック
		List<String> lstFil = colComList.checkStopUse(contractCD, Arrays.asList(companyIdNew), AppContexts.user().userId());
		if(!lstFil.isEmpty()){
			return new SystemSuspendOutput(false, "Msg_1475", "");
		}
		//エラーメッセージダイアログを表示して、処理をエラー状態とする
		String msg = usageStopOutput.getStopMessage();
		// アルゴリズム「ログイン記録」を実行する１
		loginRecordRegistService.loginRecord(
				new LoginRecordInput(
						programID, 
						screenID, 
						"", 
						1, 
						loginMethod, 
						"", 
						"システム利用停止状態", 
						null), 
				companyIdNew);
		return new SystemSuspendOutput(true, "", msg);
	}
	
}
