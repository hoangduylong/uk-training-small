package nts.uk.ctx.bs.person.infra.repository.person.emergencycontact;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;

import lombok.val;
import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.bs.person.dom.person.emergencycontact.PersonEmergencyContact;
import nts.uk.ctx.bs.person.dom.person.emergencycontact.PersonEmergencyCtRepository;
import nts.uk.ctx.bs.person.infra.entity.person.emergencycontact.BpsmtEmergencyContact;
import nts.uk.ctx.bs.person.infra.entity.person.emergencycontact.BpsmtEmergencyContactPK;

@Stateless
public class JpaPerEmergencyCtRepository extends JpaRepository implements PersonEmergencyCtRepository {

	public static final String GET_ALL_BY_PID = "SELECT c FROM BpsmtEmergencyContact c WHERE c.pid = :pid";
	
	private static final String SELECT_PER_EMER_BY_ID = "SELECT c FROM BpsmtEmergencyContact c "
			+ " WHERE c.bpsmtEmergencyContactPK.emergencyCtId = :emergencyCtId";

	private List<PersonEmergencyContact> toListEmergencyContacts(List<BpsmtEmergencyContact> listEntity) {

		List<PersonEmergencyContact> lstEmergencyContact = new ArrayList<>();
		if (!listEntity.isEmpty()) {
			listEntity.stream().forEach(c -> {
				PersonEmergencyContact emergencyContact = toDomainEmergencyContact(c);

				lstEmergencyContact.add(emergencyContact);
			});
		}
		return lstEmergencyContact;
	}

	
	private PersonEmergencyContact toDomainEmergencyContact(BpsmtEmergencyContact entity) {
		val domain = PersonEmergencyContact.createFromJavaType(entity.bpsmtEmergencyContactPK.emergencyCtId, entity.pid,
				entity.personName, entity.mailAddress, entity.streetAddress, entity.phone, entity.priority,
				entity.relationShip);
		return domain;
	}

	@Override
	public PersonEmergencyContact getByid(String id) {
		Optional<PersonEmergencyContact> personEmergencyContact = this.queryProxy().query(SELECT_PER_EMER_BY_ID, BpsmtEmergencyContact.class)
				.setParameter("emergencyCtId", id).getSingle(x -> toDomainEmergencyContact(x));				
		return personEmergencyContact.isPresent()?personEmergencyContact.get(): null;
	}

	@Override
	public List<PersonEmergencyContact> getListbyPid(String pid) {
		List<BpsmtEmergencyContact> listEntity = this.queryProxy().query(GET_ALL_BY_PID, BpsmtEmergencyContact.class)
				.setParameter("pid", pid).getList();
		return toListEmergencyContacts(listEntity);
	}
	/**
	 * to entity
	 * @param domain
	 * @return
	 */
	private BpsmtEmergencyContact toEntity(PersonEmergencyContact domain){
		BpsmtEmergencyContactPK key = new BpsmtEmergencyContactPK(domain.getEmgencyContactId());
		return new BpsmtEmergencyContact(key, domain.getPid(), domain.getPersonName().v(), domain.getPersonMailAddress().v(),
				domain.getStreetAddressPerson().v(), domain.getPhone().v(), domain.getRelationShip().v(), domain.getPriorityEmegencyContact().v());
	}
	/**
	 * updateEntity
	 * @param domain
	 * @param entity
	 * @return
	 */
	private void updateEntity(PersonEmergencyContact domain, BpsmtEmergencyContact entity){
		entity.pid = domain.getPid();
		entity.personName =  domain.getPersonName().v();
		entity.mailAddress = domain.getPersonMailAddress().v();
		entity.streetAddress = domain.getStreetAddressPerson().v();
		entity.phone = domain.getPhone().v();
		entity.relationShip = domain.getRelationShip().v();
		entity.priority = domain.getPriorityEmegencyContact().v();
	}
	/**
	 * Add PersonEmergencyContact ドメインモデル「緊急連絡先」を新規登録する
	 * @param domain
	 */
	@Override
	public void addPersonEmergencyContact(PersonEmergencyContact domain) {
		this.commandProxy().insert(toEntity(domain));
	}

	/**
	 * Update PersonEmergencyContact 取得した「緊急連絡先」を更新する
	 * @param domain
	 */
	@Override
	public void updatePersonEmergencyContact(PersonEmergencyContact domain) {
		// Get exist entity
		BpsmtEmergencyContactPK pk = new BpsmtEmergencyContactPK(domain.getEmgencyContactId());
		Optional<BpsmtEmergencyContact> existItem = this.queryProxy().find(pk, BpsmtEmergencyContact.class);
		if (!existItem.isPresent()){
			throw new RuntimeException("invalid PersonEmergencyContact");
		}
		// Update entity
		updateEntity(domain, existItem.get());
		// Update Emergency contact table
		this.commandProxy().update(existItem.get());
	}

}
