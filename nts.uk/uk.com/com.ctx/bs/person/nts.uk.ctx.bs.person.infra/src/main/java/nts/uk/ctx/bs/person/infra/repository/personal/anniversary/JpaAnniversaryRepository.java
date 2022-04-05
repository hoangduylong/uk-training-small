package nts.uk.ctx.bs.person.infra.repository.personal.anniversary;

import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.bs.person.dom.person.personal.anniversary.AnniversaryNotice;
import nts.uk.ctx.bs.person.dom.person.personal.anniversary.AnniversaryRepository;
import nts.uk.ctx.bs.person.infra.entity.person.anniversary.BpsdtPsAnniversaryInfo;
import nts.uk.shr.com.context.AppContexts;

import javax.ejb.Stateless;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Stateless
public class JpaAnniversaryRepository extends JpaRepository implements AnniversaryRepository {

    //select by personal ID
    private static final String SELECT_BY_PERSONAL_ID = "SELECT a FROM BpsdtPsAnniversaryInfo a WHERE a.bpsdtPsAnniversaryInfoPK.personalId = :personalId";

    //select by date period
    private static final String SELECT_BY_DATE_PERIOD = "SELECT a FROM BpsdtPsAnniversaryInfo a"
            + " WHERE a.bpsdtPsAnniversaryInfoPK.personalId = :personalId"
            + " AND :start <= a.bpsdtPsAnniversaryInfoPK.anniversary"
            + " AND a.bpsdtPsAnniversaryInfoPK.anniversary <= :end";

    //select by person ID and anniversary
    private static final String SELECT_BY_PERSONAL_ID_AND_ANNIVERSARY = "SELECT a FROM BpsdtPsAnniversaryInfo a"
            + " WHERE a.bpsdtPsAnniversaryInfoPK.personalId = :personalId"
            + " AND a.bpsdtPsAnniversaryInfoPK.anniversary = :anniversary";

    private static BpsdtPsAnniversaryInfo toEntity(AnniversaryNotice domain) {
        BpsdtPsAnniversaryInfo entity = new BpsdtPsAnniversaryInfo();
        domain.setMemento(entity);
        return entity;
    }

    @Override
    public void insert(AnniversaryNotice anniversaryNotice) {
        BpsdtPsAnniversaryInfo entity = JpaAnniversaryRepository.toEntity(anniversaryNotice);
        entity.setContractCd(AppContexts.user().contractCode());
        entity.setVersion(0);
        this.commandProxy().insert(entity);
    }

    @Override
    public void insertAll(List<AnniversaryNotice> anniversaryNotice) {
        List<BpsdtPsAnniversaryInfo> entities = anniversaryNotice.stream()
                .map(item -> {
                    BpsdtPsAnniversaryInfo entity = JpaAnniversaryRepository.toEntity(item);
                    entity.setContractCd(AppContexts.user().contractCode());
                    return entity;
                })
                .collect(Collectors.toList());
        this.commandProxy().insertAll(entities);
    }

    @Override
    public void update(AnniversaryNotice anniversaryNotice) {
        BpsdtPsAnniversaryInfo entity = JpaAnniversaryRepository.toEntity(anniversaryNotice);
        Optional<BpsdtPsAnniversaryInfo> oldEntity = this.queryProxy().find(entity.getBpsdtPsAnniversaryInfoPK(), BpsdtPsAnniversaryInfo.class);
        if (oldEntity.isPresent()) {
            BpsdtPsAnniversaryInfo updateEntity = oldEntity.get();
            updateEntity.setNoticeDay(entity.getNoticeDay());
            updateEntity.setSeenDate(entity.getSeenDate());
            updateEntity.setAnniversaryTitle(entity.getAnniversaryTitle());
            updateEntity.setNotificationMessage(entity.getNotificationMessage());
            this.commandProxy().update(updateEntity);
        }
    }

    @Override
    public void updateAll(List<AnniversaryNotice> anniversaryNotice) {
        List<BpsdtPsAnniversaryInfo> entities = anniversaryNotice.stream()
                .map(item -> {
                    BpsdtPsAnniversaryInfo entity = JpaAnniversaryRepository.toEntity(item);
                    Optional<BpsdtPsAnniversaryInfo> oldEntity = this.queryProxy().find(entity.getBpsdtPsAnniversaryInfoPK(), BpsdtPsAnniversaryInfo.class);
                    if (oldEntity.isPresent()) {
                        BpsdtPsAnniversaryInfo updateEntity = oldEntity.get();
                        updateEntity.setNoticeDay(entity.getNoticeDay());
                        updateEntity.setSeenDate(entity.getSeenDate());
                        updateEntity.setAnniversaryTitle(entity.getAnniversaryTitle());
                        updateEntity.setNotificationMessage(entity.getNotificationMessage());
                        return updateEntity;
                    }
                    return null;
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        this.commandProxy().updateAll(entities);
    }

    @Override
    public void delete(AnniversaryNotice anniversaryNotice) {
        BpsdtPsAnniversaryInfo entity = JpaAnniversaryRepository.toEntity(anniversaryNotice);
        Optional<BpsdtPsAnniversaryInfo> oldEntity = this.queryProxy().find(entity.getBpsdtPsAnniversaryInfoPK(), BpsdtPsAnniversaryInfo.class);
        oldEntity.ifPresent(e -> this.commandProxy().remove(e));
    }

    @Override
    public void deleteAll(List<AnniversaryNotice> anniversaryNotice) {
        List<BpsdtPsAnniversaryInfo> entities = anniversaryNotice.stream()
                .map(item -> {
                    BpsdtPsAnniversaryInfo entity = JpaAnniversaryRepository.toEntity(item);
                    Optional<BpsdtPsAnniversaryInfo> oldEntity = this.queryProxy().find(entity.getBpsdtPsAnniversaryInfoPK(), BpsdtPsAnniversaryInfo.class);
                    return oldEntity.orElse(null);
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        this.commandProxy().removeAll(entities);
    }

    @Override
    public Optional<AnniversaryNotice> getByPersonalIdAndAnniversary(String personalId, String anniversary) {
        return this.queryProxy()
                .query(SELECT_BY_PERSONAL_ID_AND_ANNIVERSARY, BpsdtPsAnniversaryInfo.class)
                .setParameter("personalId", personalId)
                .setParameter("anniversary", anniversary)
                .getSingle(AnniversaryNotice::createFromMemento);
    }

    @Override
    public List<AnniversaryNotice> getByPersonalId(String personalId) {
    	List<AnniversaryNotice> list = this.queryProxy()
                .query(SELECT_BY_PERSONAL_ID, BpsdtPsAnniversaryInfo.class)
                .setParameter("personalId", personalId)
                .getList(AnniversaryNotice::createFromMemento);
        list.sort(Comparator.comparing(AnniversaryNotice::getAnniversary));
        return list;
    }

    @Override
    public List<AnniversaryNotice> getTodayAnniversary(GeneralDate ymd) {
        String loginPersonalId = AppContexts.user().personId();
        
        //a.個人ID  = ログイン個人ID
       	List<AnniversaryNotice> list = this.queryProxy()
                .query(SELECT_BY_PERSONAL_ID, BpsdtPsAnniversaryInfo.class)
                .setParameter("personalId", loginPersonalId)
                .getList(AnniversaryNotice::createFromMemento);
       	//AND(
       	return list.stream()
       		.filter(anniver -> this.filterToGetTodayAnniver(anniver, ymd))
       		.sorted(Comparator.comparing(AnniversaryNotice::getAnniversary))
       		.collect(Collectors.toList());
    }
    
    private boolean filterToGetTodayAnniver(AnniversaryNotice anniver, GeneralDate ymd) {
    	if(this.filter1(anniver, ymd) || this.filter2(anniver, ymd) || this.filter3(anniver, ymd)) {
    		return true;
    	}
    	return false;
    }
    
    //(CAST(CONCAT(年月日.年,　a.記念日)AS datetime2) >= 年月日　　AND　CAST(CONCAT(年月日.年,　a.記念日)AS datetime2) <= DATEADD(day,　a.日数前の通知,　年月日) )
    private boolean filter1(AnniversaryNotice anniver, GeneralDate ymd) {
    	GeneralDate concatAnniver = GeneralDate.ymd(ymd.year(), anniver.getAnniversary().getMonthValue(), anniver.getAnniversary().getDayOfMonth());
    	GeneralDate dateAddYmd = ymd.addDays(anniver.getNoticeDay().value);
    	if(concatAnniver.afterOrEquals(ymd) && concatAnniver.beforeOrEquals(dateAddYmd)) {
    		return true;
    	}
    	return false;
    }
    
    //(CAST(CONCAT(年月日.年を足す(1).年,　a.記念日)AS datetime2) >= 年月日　AND　CAST(CONCAT(年月日.年を足す(1).年,　a.記念日)AS datetime2) <= DATEADD(day,　a.日数前の通知,　年月日) )
    private boolean filter2(AnniversaryNotice anniver, GeneralDate ymd) {
    	GeneralDate concatAnniver = GeneralDate.ymd(ymd.year() + 1, anniver.getAnniversary().getMonthValue(), anniver.getAnniversary().getDayOfMonth());
    	GeneralDate dateAddYmd = ymd.addDays(anniver.getNoticeDay().value);
    	if(concatAnniver.afterOrEquals(ymd) && concatAnniver.beforeOrEquals(dateAddYmd)) {
    		return true;
    	}
    	return false;
    }
    
    //最後見た記念日.年を足す(1)　＜＝　年月日
    private boolean filter3(AnniversaryNotice anniver, GeneralDate ymd) {
    	if(anniver.getSeenDate().addYears(1).beforeOrEquals(ymd)) {
    		return true;
    	}
    	return false;
    }

    @Override
    public List<AnniversaryNotice> getByDatePeriod(DatePeriod datePeriod) {
        String loginPersonalId = AppContexts.user().personId();
        List<AnniversaryNotice> list = this.queryProxy()
                .query(SELECT_BY_DATE_PERIOD, BpsdtPsAnniversaryInfo.class)
                .setParameter("personalId", loginPersonalId)
                .setParameter("start", datePeriod.start().toString("MMdd"))
                .setParameter("end", datePeriod.end().toString("MMdd"))
                .getList(AnniversaryNotice::createFromMemento);
        list.sort(Comparator.comparing(AnniversaryNotice::getAnniversary));
        return list;
    }
}
