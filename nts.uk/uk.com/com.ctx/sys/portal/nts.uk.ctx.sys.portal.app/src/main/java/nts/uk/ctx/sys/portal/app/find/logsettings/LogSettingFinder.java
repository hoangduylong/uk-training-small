package nts.uk.ctx.sys.portal.app.find.logsettings;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import nts.uk.ctx.sys.portal.dom.logsettings.LogSettingRepository;
import nts.uk.shr.com.context.AppContexts;

@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class LogSettingFinder {

	@Inject
	private LogSettingRepository logSettingRepository;

	/**
	 *  システムからログ設定を取得
	 * @param systemType
	 * @return
	 */
	public List<LogSettingDto> findBySystem(int systemType) {
		String companyId = AppContexts.user().companyId();
		return this.logSettingRepository.findBySystem(companyId, systemType).stream()
				.map(c -> LogSettingDto.fromDomain(c))
				.collect(Collectors.toList());
	}
	
}
