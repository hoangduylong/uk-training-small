package repository.workplacegroup;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import entity.workplacegroup.BsymtMedcareNightShiftRuleHist;
import entity.workplacegroup.BsymtMedcareNightShiftRuleHistPk;
import entity.workplacegroup.metamodel.BsymtMedcareNightShiftRuleHistPk_;
import entity.workplacegroup.metamodel.BsymtMedcareNightShiftRuleHist_;
import lombok.val;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.arc.time.clock.ClockHourMinuteSpan;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.HospitalBusinessOfficeInfo;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.HospitalBusinessOfficeInfoHistory;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.HospitalBusinessOfficeInfoHistoryRepository;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.HospitalBusinessOfficeInfoWithPeriod;
import nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo.NightShiftOperationRule;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class JpaHospitalBusinessOfficeInfoHistoryRepository extends JpaRepository implements HospitalBusinessOfficeInfoHistoryRepository {
	@Override
	public Optional<HospitalBusinessOfficeInfo> get(String workplaceGroupId, GeneralDate baseDate) {
		String cid = AppContexts.user().companyId();
		EntityManager entityManager = this.getEntityManager();
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<BsymtMedcareNightShiftRuleHist> criteriaQuery = criteriaBuilder.createQuery(BsymtMedcareNightShiftRuleHist.class);
		Root<BsymtMedcareNightShiftRuleHist> root = criteriaQuery.from(BsymtMedcareNightShiftRuleHist.class);
		criteriaQuery.select(root);
		List<Predicate> conditions = new ArrayList<Predicate>();
		conditions.add(criteriaBuilder.equal(root.get(BsymtMedcareNightShiftRuleHist_.pK).get(BsymtMedcareNightShiftRuleHistPk_.CID), cid));
		conditions.add(criteriaBuilder.equal(root.get(BsymtMedcareNightShiftRuleHist_.pK).get(BsymtMedcareNightShiftRuleHistPk_.WKPGRPID), workplaceGroupId));
		conditions.add(criteriaBuilder.lessThanOrEqualTo(root.get(BsymtMedcareNightShiftRuleHist_.STARTDATE), baseDate));
		conditions.add(criteriaBuilder.greaterThan(root.get(BsymtMedcareNightShiftRuleHist_.ENDDATE), baseDate));
		criteriaQuery.where(conditions.toArray(new Predicate[]{}));
		TypedQuery<BsymtMedcareNightShiftRuleHist> query = entityManager.createQuery(criteriaQuery);
		List<BsymtMedcareNightShiftRuleHist> resultList = query.getResultList();
		if (resultList.isEmpty()) {
			return Optional.empty();
		} else {
			val entity = resultList.get(0);
			return Optional.of(BsymtMedcareNightShiftRuleHist.toDomainInFo(entity));
		}

	}

	@Override
	public Optional<HospitalBusinessOfficeInfoHistory> getHospitalBusinessOfficeInfoHistory(String workplaceGroupId) {
		val cid = AppContexts.user().companyId();
		EntityManager entityManager = this.getEntityManager();
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<BsymtMedcareNightShiftRuleHist> criteriaQuery = criteriaBuilder.createQuery(BsymtMedcareNightShiftRuleHist.class);
		Root<BsymtMedcareNightShiftRuleHist> root = criteriaQuery.from(BsymtMedcareNightShiftRuleHist.class);
		criteriaQuery.select(root);

		List<Predicate> conditions = new ArrayList<>();
		conditions.add(criteriaBuilder.equal(root.get(BsymtMedcareNightShiftRuleHist_.pK).get(BsymtMedcareNightShiftRuleHistPk_.WKPGRPID), workplaceGroupId));
		conditions.add(criteriaBuilder.equal(root.get(BsymtMedcareNightShiftRuleHist_.pK).get(BsymtMedcareNightShiftRuleHistPk_.CID), cid));

		criteriaQuery.where(conditions.toArray(new Predicate[]{}));

		TypedQuery<BsymtMedcareNightShiftRuleHist> query = entityManager.createQuery(criteriaQuery);
		List<BsymtMedcareNightShiftRuleHist> ruleHists = query.getResultList();
		if (ruleHists.isEmpty()) {
			return Optional.empty();
		} else {
			return Optional.of(BsymtMedcareNightShiftRuleHist.toListDomainHist(ruleHists).get(0));
		}

	}

	@Override
	public Optional<HospitalBusinessOfficeInfo> get(String historyId) {
		val cid = AppContexts.user().companyId();
		EntityManager entityManager = this.getEntityManager();
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<BsymtMedcareNightShiftRuleHist> criteriaQuery = criteriaBuilder.createQuery(BsymtMedcareNightShiftRuleHist.class);
		Root<BsymtMedcareNightShiftRuleHist> root = criteriaQuery.from(BsymtMedcareNightShiftRuleHist.class);
		criteriaQuery.select(root);

		List<Predicate> conditions = new ArrayList<>();
		conditions.add(criteriaBuilder.equal(root.get(BsymtMedcareNightShiftRuleHist_.pK).get(BsymtMedcareNightShiftRuleHistPk_.HISTID), historyId));
		conditions.add(criteriaBuilder.equal(root.get(BsymtMedcareNightShiftRuleHist_.pK).get(BsymtMedcareNightShiftRuleHistPk_.CID), cid));

		criteriaQuery.where(conditions.toArray(new Predicate[]{}));

		TypedQuery<BsymtMedcareNightShiftRuleHist> query = entityManager.createQuery(criteriaQuery);
		List<BsymtMedcareNightShiftRuleHist> ruleHists = query.getResultList();
		if (ruleHists.isEmpty()) {
			return Optional.empty();
		} else {
			return Optional.of(BsymtMedcareNightShiftRuleHist.toDomainInFo(ruleHists.get(0)));
		}
	}

	@Override
	public boolean exists(String workplaceGroupId, GeneralDate baseDate) {
		return this.get(workplaceGroupId, baseDate).isPresent();
	}

	@Override
	public void insert(HospitalBusinessOfficeInfo hospitalInfo, HospitalBusinessOfficeInfoHistory hospitalHist) {
		val cid = AppContexts.user().companyId();
		val cd = AppContexts.user().contractCode();
		val wplgId = hospitalInfo.getWorkplaceGroupId();
		val histId = hospitalInfo.getHistoryId();
		NightShiftOperationRule rule = hospitalInfo.getNightShiftOpeRule();
		Optional<ClockHourMinuteSpan> optionalSpan = rule.getShiftTime();
		val histNewOpt = hospitalHist.getHistoryItems().stream().filter(x -> x.identifier().equals(histId)).findFirst();
		if (histNewOpt.isPresent()) {
			val histNew = histNewOpt.get();
			val histUpdateOpt = hospitalHist.immediatelyBefore(histNew);
			BsymtMedcareNightShiftRuleHist entity = new BsymtMedcareNightShiftRuleHist(
					new BsymtMedcareNightShiftRuleHistPk(cid, wplgId, histId),
					cd,
					histNew.start(),
					histNew.end(),
					rule.getNightShiftOperationAtr().value,
					optionalSpan.isPresent() ? optionalSpan.get().start().v() : null,
					optionalSpan.isPresent() ? optionalSpan.get().end().v() : null
			);
			this.commandProxy().insert(entity);
			if (histUpdateOpt.isPresent()) {
				val histUpdate = histUpdateOpt.get();
				val entityUpdateOpt = this.queryProxy()
						.find(new BsymtMedcareNightShiftRuleHistPk(cid, wplgId, histUpdate.identifier()), BsymtMedcareNightShiftRuleHist.class);
				if (entityUpdateOpt.isPresent()) {
					BsymtMedcareNightShiftRuleHist entityUpdate = entityUpdateOpt.get();
					entityUpdate.ENDDATE = (histUpdate.end());
					this.commandProxy().update(entityUpdate);
				}
			}

		}

	}

	@Override
	public void updateHospitalInfoHistory(HospitalBusinessOfficeInfoHistory hospitalHist) {
		val cid = AppContexts.user().companyId();
		val wplgId = hospitalHist.getWorkplaceGroupId();
		val histEndOpt = hospitalHist.getHistoryItems().stream().filter(e -> e.end().equals(GeneralDate.max())).findFirst();
		if (histEndOpt.isPresent()) {
			val histEnd = histEndOpt.get();
			val entityUpdateOpt = this.queryProxy().find(new BsymtMedcareNightShiftRuleHistPk(
					cid,
					wplgId,
					histEnd.identifier()
			), BsymtMedcareNightShiftRuleHist.class);
			if (entityUpdateOpt.isPresent()) {
				val entityUpdate = entityUpdateOpt.get();
				entityUpdate.ENDDATE =(histEnd.end());
				entityUpdate.STARTDATE = (histEnd.start());
				this.commandProxy().update(entityUpdate);
			}
			val histBeforeOpt = hospitalHist.immediatelyBefore(histEnd);
			if(histBeforeOpt.isPresent()){
				val histBefore = histBeforeOpt.get();
				val entityUpdateBeforeOpt = this.queryProxy().find(new BsymtMedcareNightShiftRuleHistPk(
						cid,
						wplgId,
						histBefore.identifier()
				), BsymtMedcareNightShiftRuleHist.class);
				if (entityUpdateBeforeOpt.isPresent()) {
					val entityUpdateBefore = entityUpdateBeforeOpt.get();
					entityUpdateBefore.STARTDATE = (histBefore.start());
					entityUpdateBefore.ENDDATE =(histBefore.end());
					this.commandProxy().update(entityUpdateBefore);
				}
			}
		}

	}

	@Override
	public void updateHospitalBusinessOfficeInfo(HospitalBusinessOfficeInfo hospitalBusinessOfficeInfo) {
		val cid = AppContexts.user().companyId();
		val wplgId = hospitalBusinessOfficeInfo.getWorkplaceGroupId();
		val histId = hospitalBusinessOfficeInfo.getHistoryId();
		NightShiftOperationRule rule = hospitalBusinessOfficeInfo.getNightShiftOpeRule();
		Optional<ClockHourMinuteSpan> optionalSpan = rule.getShiftTime();
		val entityOpt = this.queryProxy().find(new BsymtMedcareNightShiftRuleHistPk(cid, wplgId, histId), BsymtMedcareNightShiftRuleHist.class);
		if (entityOpt.isPresent()) {
			val entity = entityOpt.get();
			Integer STARTCLOCK = optionalSpan.isPresent() ? optionalSpan.get().start().v() : null;
			Integer ENDCLOCK = optionalSpan.isPresent() ? optionalSpan.get().end().v() : null;
			entity.NIGHTSHIFTUSEATR = (rule.getNightShiftOperationAtr().value);
			entity.ENDCLOCK = (ENDCLOCK);
			entity.STARTCLOCK = (STARTCLOCK);
		}
	}

	@Override
	public void delete(String workplaceGroupId, String historyId) {
		val cid = AppContexts.user().companyId();
		this.commandProxy().remove(BsymtMedcareNightShiftRuleHist.class, new BsymtMedcareNightShiftRuleHistPk(
				cid,
				workplaceGroupId,
				historyId
		));
	}

	@Override
	public List<HospitalBusinessOfficeInfoWithPeriod> getItemWithDataForPeriod(String workplaceGroupId, DatePeriod period) {
		// TODO 自動生成されたメソッド・スタブ
		return null;
	}

}
