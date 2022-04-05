package nts.uk.ctx.sys.gateway.app.find.stopsetting;

import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.gateway.app.find.stopsetting.stopbycompany.StopByCompanyDto;
import nts.uk.ctx.sys.gateway.app.find.stopsetting.stopbysystem.StopBySystemDto;
import nts.uk.ctx.sys.gateway.dom.stopbycompany.StopByCompany;
import nts.uk.ctx.sys.gateway.dom.stopbycompany.StopByCompanyRepository;
import nts.uk.ctx.sys.gateway.dom.stopbycompany.SystemStatusType;
import nts.uk.ctx.sys.gateway.dom.stopbysystem.StopBySystem;
import nts.uk.ctx.sys.gateway.dom.stopbysystem.StopBySystemRepository;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class StopSettingFinder {
	@Inject
	private StopBySystemRepository systemRepo;
	@Inject
	private StopByCompanyRepository companyRepo;

	public StopSettingDto find(int isSystem) {
		StopSettingDto result = new StopSettingDto();
		result.setAdmin(AppContexts.user().roles().have().systemAdmin());

		boolean isAdmin = result.isAdmin();
		if (isAdmin) {
			// 選択された停止対象を判別
			if (isSystem == 1) {
				getSystem(result);

			} else {
				getCompany(result);
			}
		} else {
			getCompany(result);

		}
		return result;
	}

	private void getSystem(StopSettingDto result) {
		String contractCd = AppContexts.user().contractCode();
		// ドメインモデル「システム全体の利用停止の設定」を取得する
		this.systemRepo.findByKey(contractCd).ifPresent(x -> {
			result.setSystem(StopBySystemDto.fromDomain(x));
		});

		// ドメインモデル「会社単位の利用停止の設定」を取得し会社の「停止状況」を取得する
		List<StopByCompany> stopCompanys = this.companyRepo.findByContractCodeAndState(contractCd,
				SystemStatusType.STOP.value);
		result.setStopCompanys(stopCompanys);
		// ドメインモデル「会社単位の利用停止の設定」を取得し会社の「前段階状況」を取得する
		List<StopByCompany> inProgressCompanys = this.companyRepo.findByContractCodeAndState(contractCd,
				SystemStatusType.IN_PROGRESS.value);
		result.setInProgressCompanys(inProgressCompanys);
	}

	private void getCompany(StopSettingDto result) {

		String contractCd = AppContexts.user().contractCode();
		String companyCd = AppContexts.user().companyCode();
		// ドメインモデル「会社単位の利用停止の設定」を取得する
		this.companyRepo.findByKey(contractCd, companyCd).ifPresent(company -> {
			result.setCompany(StopByCompanyDto.fromDomain(company));
		});
		// ドメインモデル「システム全体の利用停止の設定」を取得しシステム全体の「システム利用状態」を取得する
		this.systemRepo.findByKey(contractCd).ifPresent(system -> {
			result.setSystem(StopBySystemDto.fromDomain(system));
		});
	}
	
	/**
	 * システム利用停止の警告確認
	 * @return
	 */
	public boolean isSystemStop(){
		String contractCD = AppContexts.user().contractCode();
		String companyCD = AppContexts.user().companyCode();
		// ドメインモデル「システム全体の利用停止の設定」を取得する
		Optional<StopBySystem> opStopBySystem = systemRepo.findByCdStatus(contractCD, 1);
		if(opStopBySystem.isPresent()){
			return true;
		}
		// ドメインモデル「会社単位の利用停止の設定」を取得する
		Optional<StopByCompany> opStopByCompany = companyRepo.findByCdStt(contractCD, companyCD, 1);
		if(opStopByCompany.isPresent()){
			return true;
		}
		return false;
	}

}
