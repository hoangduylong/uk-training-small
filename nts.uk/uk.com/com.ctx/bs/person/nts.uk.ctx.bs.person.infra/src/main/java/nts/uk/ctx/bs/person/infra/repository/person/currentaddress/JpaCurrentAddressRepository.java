/**
 * 
 */
package nts.uk.ctx.bs.person.infra.repository.person.currentaddress;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;

import lombok.val;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.person.dom.person.currentaddress.CurrentAddress;
import nts.uk.ctx.bs.person.dom.person.currentaddress.CurrentAddressRepository;
import nts.uk.ctx.bs.person.infra.entity.person.currentaddress.BpsmtCurrentaddress;
import nts.uk.ctx.bs.person.infra.entity.person.currentaddress.BpsmtCurrentaddressPK;

/**
 * @author danpv
 *
 */
@Stateless
public class JpaCurrentAddressRepository extends JpaRepository implements CurrentAddressRepository {

	public static final String GET_ALL_BY_PID = "SELECT c FROM BpsmtCurrentaddress c WHERE c.pid = :pid";

	private static final String SELECT_CURRENT_ADD_BY_ID = "SELECT c FROM BpsmtCurrentaddress c "
			+ " WHERE c.bpsmtCurrentaddressPK.currentAddId = :currentAddId";

	private static final String SELECT_BY_PERID_STD = "SELECT c FROM BpsmtCurrentaddress c "
			+ " WHERE c.pid = :personId AND c.startDate <= :standardDate AND c.endDate >= :standardDate";

	private List<CurrentAddress> toListCurrentAddress(List<BpsmtCurrentaddress> listEntity) {
		List<CurrentAddress> lstCurrentAddress = new ArrayList<>();
		if (!listEntity.isEmpty()) {
			listEntity.stream().forEach(c -> {
				CurrentAddress currentAddress = toDomainCurrentAddress(c);

				lstCurrentAddress.add(currentAddress);
			});
		}
		return lstCurrentAddress;
	}

	private CurrentAddress toDomainCurrentAddress(BpsmtCurrentaddress entity) {
		val domain = CurrentAddress.createFromJavaType(entity.bpsmtCurrentaddressPK.currentAddId, entity.pid,
				entity.countryId, entity.postalCode, entity.phoneNumber, entity.prefectures, entity.houseRent,
				entity.startDate, entity.endDate, entity.address1, entity.addressKana1, entity.address2,
				entity.addressKana2, entity.homeSituationType, entity.emailAddress, entity.houseType,
				entity.nearestStation);
		return domain;
	}

	public Optional<CurrentAddress> getByPerIdAndStd(String personId, GeneralDate standandDate) {
		Optional<BpsmtCurrentaddress> caOpt = this.queryProxy().query(SELECT_BY_PERID_STD, BpsmtCurrentaddress.class)
				.getSingle();
		if (caOpt.isPresent()) {
			BpsmtCurrentaddress entity = caOpt.get();
			return Optional.of(CurrentAddress.createFromJavaType(entity.bpsmtCurrentaddressPK.currentAddId, entity.pid,
					entity.countryId, entity.postalCode, entity.phoneNumber, entity.prefectures, entity.houseRent,
					entity.startDate, entity.endDate, entity.address1, entity.addressKana1, entity.address2,
					entity.addressKana2, entity.homeSituationType, entity.emailAddress, entity.houseType,
					entity.nearestStation));
		} else {
			return Optional.empty();
		}

	}

	@Override
	public List<CurrentAddress> getListByPid(String pid) {
		// TODO Auto-generated method stub
		List<BpsmtCurrentaddress> listEntity = this.queryProxy().query(GET_ALL_BY_PID, BpsmtCurrentaddress.class)
				.setParameter("pid", pid).getList();
		return toListCurrentAddress(listEntity);
	}

	public CurrentAddress getCurAddById(String curAddId) {
		Optional<CurrentAddress> currentAddress = this.queryProxy()
				.query(SELECT_CURRENT_ADD_BY_ID, BpsmtCurrentaddress.class).setParameter("currentAddId", curAddId)
				.getSingle(x -> toDomainCurrentAddress(x));
		return currentAddress.isPresent() ? currentAddress.get() : null;
	}

	private static BpsmtCurrentaddress toEntity(CurrentAddress domain) {
		BpsmtCurrentaddressPK key = new BpsmtCurrentaddressPK(domain.getCurrentAddressId());
		return new BpsmtCurrentaddress(key, domain.getPid(), domain.getPeriod().start(), domain.getPeriod().end(),
				domain.getAddress1().getAddress1().v(), domain.getAddress2().getAddress2().v(),
				domain.getAddress1().getAddressKana1().v(), domain.getAddress2().getAddressKana2().v(),
				domain.getCountryId(), domain.getHomeSituationType().v(), domain.getHouseRent().v(),
				domain.getPhoneNumber().v(), domain.getPostalCode().v(), domain.getPrefectures().v(),
				domain.getPersonMailAddress().v(), domain.getHouseType().v(), domain.getNearestStation().v());

	}

	/**
	 * add current address ドメインモデル「現住所」を新規登録する
	 * 
	 * @param currentAddress
	 */
	@Override
	public void addCurrentAddress(CurrentAddress currentAddress) {
		this.commandProxy().insert(toEntity(currentAddress));
	}

	/**
	 * update current address 取得した「現住所」を更新する
	 * 
	 * @param currentAddress
	 */
	@Override
	public void updateCurrentAddress(CurrentAddress currentAddress) {
		// Get from entity
		Optional<BpsmtCurrentaddress> existItem = getCurrentAddressById(currentAddress.getCurrentAddressId());
		
		if (!existItem.isPresent()) {
			throw new RuntimeException("invalid currentAddress");
		}
		
		// Update entity
		updateEntity(currentAddress, existItem.get());

		this.commandProxy().update(existItem.get());

	}

	private void updateEntity(CurrentAddress domain, BpsmtCurrentaddress entity) {

		entity.pid = domain.getPid();
		entity.startDate = domain.getPeriod().start();
		entity.endDate = domain.getPeriod().end();
		entity.address1 = domain.getAddress1().getAddress1().v();
		entity.address2 = domain.getAddress2().getAddress2().v();
		entity.addressKana1 = domain.getAddress1().getAddressKana1().v();
		entity.addressKana2 = domain.getAddress2().getAddressKana2().v();
		entity.countryId = domain.getCountryId();
		entity.homeSituationType = domain.getHomeSituationType().v();
		entity.houseRent = domain.getHouseRent().v();
		entity.phoneNumber = domain.getPhoneNumber().v();
		entity.postalCode = domain.getPostalCode().v();
		entity.prefectures = domain.getPrefectures().v();
		entity.emailAddress = domain.getPersonMailAddress().v();
		entity.houseType = domain.getHouseType().v();
		entity.nearestStation = domain.getNearestStation().v();
	}

	/**
	 * Get currrent address by current address id
	 * 
	 * @param currentAddressId
	 * @return
	 */
	private Optional<BpsmtCurrentaddress> getCurrentAddressById(String currentAddressId) {
		BpsmtCurrentaddressPK pk = new BpsmtCurrentaddressPK(currentAddressId);
		return this.queryProxy().find(pk, BpsmtCurrentaddress.class);
	}
}
