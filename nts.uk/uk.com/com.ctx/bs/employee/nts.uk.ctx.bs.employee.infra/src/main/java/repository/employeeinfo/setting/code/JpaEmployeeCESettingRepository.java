package repository.employeeinfo.setting.code;

import java.util.Optional;

import javax.ejb.Stateless;

import entity.employeeinfo.setting.code.BsymtEmployeeCESetting;
import entity.employeeinfo.setting.code.BsymtEmployeeCESettingPk;
import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.bs.employee.dom.setting.code.EmployeeCESetting;
import nts.uk.ctx.bs.employee.dom.setting.code.IEmployeeCESettingRepository;

@Stateless
public class JpaEmployeeCESettingRepository extends JpaRepository implements IEmployeeCESettingRepository {
	public static final String SELECT_ALL = "SELECT s FROM BsymtEmployeeCESetting s";
	public static final String SELECT_BY_COM_ID = SELECT_ALL + " WHERE s.bsymtEmployeeCESettingPk.cId = :companyId";

	@Override
	public Optional<EmployeeCESetting> getByComId(String companyId) {
		Optional<BsymtEmployeeCESetting> entity = this.queryProxy()
				.query(SELECT_BY_COM_ID, BsymtEmployeeCESetting.class).setParameter("companyId", companyId).getSingle();

		if (!entity.isPresent()) {
			return Optional.empty();
		}

		return Optional.of(toDomain(entity.get()));
	}

	@Override
	public void saveSetting(EmployeeCESetting domain) {
		Optional<BsymtEmployeeCESetting> entity = this.queryProxy()
				.query(SELECT_BY_COM_ID, BsymtEmployeeCESetting.class).setParameter("companyId", domain.getCompanyId())
				.getSingle();

		if (!entity.isPresent()) {
			commandProxy().insert(toEntity(domain));
		} else {
			BsymtEmployeeCESetting _update = entity.get();

			// update value from domain to entity
			_update.setDigitNumb(domain.getDigitNumb().v());
			_update.setCeMethodAtr(domain.getCeMethodAtr().value);

			// commit data to db
			commandProxy().update(_update);
		}
	}

	@Override
	public void removeSetting(String companyId) {
		BsymtEmployeeCESettingPk pkey = new BsymtEmployeeCESettingPk(companyId);

		Optional<BsymtEmployeeCESetting> entity = this.queryProxy()
				.query(SELECT_BY_COM_ID, BsymtEmployeeCESetting.class).setParameter("companyId", companyId).getSingle();

		if (entity.isPresent()) {
			this.commandProxy().remove(BsymtEmployeeCESetting.class, pkey);
		}
	}

	@Override
	public void removeSetting(EmployeeCESetting domain) {
		this.removeSetting(domain.getCompanyId());
	}

	private EmployeeCESetting toDomain(BsymtEmployeeCESetting entity) {
		return EmployeeCESetting.createFromJavaType(entity.getBsymtEmployeeCESettingPk().getCId(),
				entity.getCeMethodAtr(), entity.getDigitNumb());
	}

	private BsymtEmployeeCESetting toEntity(EmployeeCESetting domain) {
		BsymtEmployeeCESettingPk pkey = new BsymtEmployeeCESettingPk(domain.getCompanyId());

		return new BsymtEmployeeCESetting(pkey, domain.getCeMethodAtr().value, domain.getDigitNumb().v());
	}
}
