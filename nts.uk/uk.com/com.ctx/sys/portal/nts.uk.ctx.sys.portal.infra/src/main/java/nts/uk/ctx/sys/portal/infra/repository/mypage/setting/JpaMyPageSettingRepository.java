/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.infra.repository.mypage.setting;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;

import lombok.val;
import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.sys.portal.dom.mypage.setting.MyPageSetting;
import nts.uk.ctx.sys.portal.dom.mypage.setting.MyPageSettingRepository;
import nts.uk.ctx.sys.portal.dom.mypage.setting.TopPagePartUseSetting;
import nts.uk.ctx.sys.portal.infra.entity.mypage.setting.SptmtMyPageSet;

/**
 * The Class JpaMyPageSettingRepository.
 */
@Stateless
public class JpaMyPageSettingRepository extends JpaRepository implements MyPageSettingRepository {

	private static final String GET_ONE_MPS = "SELECT m FROM SptmtMyPageSet m WHERE m.cid = :companyId";

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.portal.dom.mypage.setting.MyPageSettingRepository#findByCompanyId(java.lang.String)
	 */
	@Override
	public Optional<MyPageSetting> findByCompanyId(String companyId) {
		return this.queryProxy().query(GET_ONE_MPS, SptmtMyPageSet.class).setParameter("companyId", companyId)
				.getSingle(c -> mpsToDomain(c));
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.portal.dom.mypage.setting.MyPageSettingRepository#update(
	 * nts.uk.ctx.sys.portal.dom.mypage.setting.MyPageSetting)
	 */
	@Override
	public void update(MyPageSetting myPageSetting) {
		// update myPageSet
		this.commandProxy().update(myPageSetToEntity(myPageSetting));
	}

	/**
	 * Mps to domain.
	 *
	 * @param c the c
	 * @return the my page setting
	 */
	private MyPageSetting mpsToDomain(SptmtMyPageSet c) {
		MyPageSetting mps = MyPageSetting.createFromJavaType(c.cid, c.useMyPageAtr, c.useStandarWidgetAtr, c.useOptionalWidgetAtr, c.useDashBoardAtr,
				c.useFolowMenuAtr, c.externalUrlPermissionAtr, new ArrayList<>());
		return mps;
	}
	
	/**
	 * My page set to entity.
	 *
	 * @param domain the domain
	 * @return the ccgmt my page set
	 */
	private SptmtMyPageSet myPageSetToEntity(MyPageSetting domain) {
		// Find Entity
		SptmtMyPageSet entity = this.queryProxy().query(GET_ONE_MPS, SptmtMyPageSet.class)
				.setParameter("companyId", domain.getCompanyId()).getSingleOrNull();
		if (entity != null) {
			entity.setUseMyPageAtr(domain.getUseMyPage().value);
			entity.setUseStandarWidgetAtr(domain.getUseStandarWidget().value);
			entity.setUseOptionalWidgetAtr(domain.getUseOptionalWidget().value);
			entity.setUseDashBoardAtr(domain.getUseDashboard().value);
			entity.setUseFolowMenuAtr(domain.getUseFlowMenu().value);
			entity.setExternalUrlPermissionAtr(domain.getExternalUrlPermission().value);
			return entity;
		} else {
			SptmtMyPageSet newEntity = new SptmtMyPageSet(domain.getCompanyId(), domain.getUseMyPage().value,
					domain.getUseStandarWidget().value, domain.getUseOptionalWidget().value, domain.getUseDashboard().value, domain.getUseFlowMenu().value,
					domain.getExternalUrlPermission().value);
			return newEntity;
		}
	}

	/**
	 * hoatt
	 * find my page setting
	 * @param companyId
	 * @return
	 */
	@Override
	public Optional<MyPageSetting> findMyPageSet(String companyId) {
		
		return this.queryProxy().find(companyId, SptmtMyPageSet.class).map(c->toDomainMyPageSet(c));
	}
	/**
	 * hoatt
	 * convert entity SptmtMyPageSet to domain MyPageSetting
	 * @param entity
	 * @return
	 */
	private MyPageSetting toDomainMyPageSet(SptmtMyPageSet entity) {
		 List<TopPagePartUseSetting> lstTopPart = null;
		val domain = MyPageSetting.createFromJavaType(entity.getCid(),
				Integer.valueOf(entity.getUseMyPageAtr()),
				Integer.valueOf(entity.getUseStandarWidgetAtr()),
				Integer.valueOf(entity.getUseOptionalWidgetAtr()),
				Integer.valueOf(entity.getUseDashBoardAtr()),
				Integer.valueOf(entity.getUseFolowMenuAtr()),
				Integer.valueOf(entity.getExternalUrlPermissionAtr()),
						lstTopPart);
		return domain;
	}
}
