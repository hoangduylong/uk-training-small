package nts.uk.ctx.bs.person.pubimp.anniversary;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.AllArgsConstructor;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.bs.person.dom.person.personal.anniversary.AnniversaryNotice;
import nts.uk.ctx.bs.person.dom.person.personal.anniversary.AnniversaryRepository;
import nts.uk.ctx.bs.person.dom.person.personal.anniversary.service.AnniversaryDomainService;
import nts.uk.ctx.bs.person.pub.anniversary.AnniversaryNoticeExport;
import nts.uk.ctx.bs.person.pub.anniversary.AnniversaryNoticePub;

@Stateless
public class AnniversaryNoticePubImpl implements AnniversaryNoticePub {

    @Inject
    private AnniversaryDomainService anniversaryDomainService;
    
    @Inject
    private AnniversaryRepository anniversaryRepository;

    @Override
    public Map<AnniversaryNoticeExport, Boolean> setFlag(DatePeriod datePeriod) {
    	AnniversaryDomainService.Require require = new RequireImpl(anniversaryRepository);
    	
        Map<AnniversaryNotice, Boolean> anniversaries = anniversaryDomainService.setFlag(require, datePeriod);
        Map<AnniversaryNoticeExport, Boolean> result = new LinkedHashMap<>();
        if (anniversaries.isEmpty()) {
            return result;
        }

        anniversaries.forEach((key, value) -> {
            AnniversaryNoticeExport export = AnniversaryNoticeExport.builder()
                    .personalId(key.getPersonalId())
                    .noticeDay(key.getNoticeDay().value)
                    .seenDate(key.getSeenDate())
                    .anniversary(key.getAnniversary())
                    .anniversaryTitle(key.getAnniversaryTitle().v())
                    .notificationMessage(key.getNotificationMessage().v())
                    .build();
            result.put(export, value);
        });

        return result;
    }

	@Override
	public boolean isTodayHaveNewAnniversary() {
    	AnniversaryDomainService.Require require = new RequireImpl(anniversaryRepository);
		// UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.個人.個人のインフォメーション.新記念日があるか.新記念日があるか 
		return this.anniversaryDomainService.isTodayHaveNewAnniversary(require);
	}
	
	@AllArgsConstructor
	private static class RequireImpl implements AnniversaryDomainService.Require {
		
		private AnniversaryRepository anniversaryRepository;

		@Override
		public List<AnniversaryNotice> getTodayAnniversary(GeneralDate date) {
			return this.anniversaryRepository.getTodayAnniversary(date);
		}

		@Override
		public List<AnniversaryNotice> getByDatePeriod(DatePeriod period) {
			return this.anniversaryRepository.getByDatePeriod(period);
		}
	}

}
