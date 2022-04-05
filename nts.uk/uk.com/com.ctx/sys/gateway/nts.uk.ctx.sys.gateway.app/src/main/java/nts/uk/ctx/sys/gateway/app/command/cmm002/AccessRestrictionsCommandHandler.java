package nts.uk.ctx.sys.gateway.app.command.cmm002;

import java.util.ArrayList;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.enums.EnumAdaptor;
import nts.uk.ctx.sys.gateway.dom.accessrestrictions.AccessRestrictions;
import nts.uk.ctx.sys.gateway.dom.accessrestrictions.AccessRestrictionsRepository;
import nts.uk.ctx.sys.gateway.dom.loginold.ContractCode;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.enumcommon.NotUseAtr;

@Stateless
public class AccessRestrictionsCommandHandler {

	@Inject
	private AccessRestrictionsRepository repo;
	
	/**
	 * アクセス制限を追加する
	 */
	public void insertAccessRestrictions() {
		String contractCode = AppContexts.user().contractCode();
		Optional<AccessRestrictions> domain = repo.get(new ContractCode(contractCode));
		if (!domain.isPresent()) {
			/*
			 * 1: create()
			 * 2: persist()
			 */
			repo.insert(new AccessRestrictions(contractCode, NotUseAtr.NOT_USE, new ArrayList<>()));
		}
	}
	
	/**
	 * 許可するIPアドレスを追加する
	 */
	public void addAllowdIpAddress(AllowedIPAddressAddCommand command) {
		String contractCode = AppContexts.user().contractCode();
		NotUseAtr accessLimitUseAtr = EnumAdaptor.valueOf(command.accessLimitUseAtr, NotUseAtr.class);
		/* 1:get(ログイン者の契約コード) */
		Optional<AccessRestrictions> domain = repo.get(new ContractCode(contractCode));
		if (domain.isPresent()) {
			domain.get().addIPAddress(command.allowedIPAddress.toDomain(), accessLimitUseAtr, 
					command.getIpAddressToCheck().toDomain());
			/* 2:persist() */
			repo.update(new AccessRestrictions(contractCode, NotUseAtr.valueOf(command.accessLimitUseAtr), domain.get().getWhiteList()));
		}
	}
	
	/**
	 * IPアドレスの制限設定を更新する
	 */
	public void updateAllowdIpAddress(AllowedIPAddressUpdateCommand command) {
		String contractCode = AppContexts.user().contractCode();
		NotUseAtr accessLimitUseAtr = EnumAdaptor.valueOf(command.accessLimitUseAtr, NotUseAtr.class);
		/* 1:get(ログイン者の契約コード) */
		Optional<AccessRestrictions> domain = repo.get(new ContractCode(contractCode));
		/* 2:persist() */
		if (domain.isPresent()) {
			/* 3:許可IPアドレスを更新する(許可IPアドレス_NEW) */
			domain.get().updateIPAddress(command.allowedIPAddressOld.toDomain(), command.allowedIPAddressNew.toDomain(),
					accessLimitUseAtr, command.ipAddressToCheck.toDomain());
			/* 4:persist() */
			repo.update(new AccessRestrictions(contractCode, NotUseAtr.valueOf(command.accessLimitUseAtr), domain.get().getWhiteList()));
		}
	}
	
	/**
	 * 許可するIPアドレスを削除する
	 */
	public void deleteAllowdIpAddress(AllowedIPAddressDeleteCommand command) {
		String contractCode = AppContexts.user().contractCode();
		NotUseAtr accessLimitUseAtr = EnumAdaptor.valueOf(command.getAccessLimitUseAtr(), NotUseAtr.class);
		/* 1: get(ログイン者の契約コード) */
		Optional<AccessRestrictions> domain = repo.get(new ContractCode(contractCode));
		if (domain.isPresent()) {
			/* 2: 許可IPアドレスを削除する(IPアドレス) */
			domain.get().deleteIPAddress(command.getIpAddress().toDomain().getStartAddress(), accessLimitUseAtr,
					command.getIpAddressToCheck().toDomain());
			/* 3:persist() */
			repo.update(domain.get());
		}
	}
}
