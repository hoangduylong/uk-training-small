package nts.uk.ctx.bs.person.infra.repository.personal.contact;

import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.person.dom.person.personal.contact.PersonalContact;
import nts.uk.ctx.bs.person.dom.person.personal.contact.PersonalContactRepository;
import nts.uk.ctx.bs.person.infra.entity.person.personal.BpsmtContactAddrPs;
import nts.uk.shr.com.context.AppContexts;

import javax.ejb.Stateless;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Stateless
public class JpaPersonalContactRepository extends JpaRepository implements PersonalContactRepository {

    //select by personal ID
    private static final String SELECT_BY_PERSONAL_ID = "SELECT m FROM BpsmtContactAddrPs m WHERE m.bpsmtContactAddrPsPK.personalId = :personalId";
    
    //select by personal ID
    private static final String SELECT_BY_PERSONAL_IDS = "SELECT m FROM BpsmtContactAddrPs m WHERE m.bpsmtContactAddrPsPK.personalId IN :personalIds";

    private static BpsmtContactAddrPs toEntity(PersonalContact domain) {
        BpsmtContactAddrPs entity = new BpsmtContactAddrPs();
        domain.setMemento(entity);
        return entity;
    }

    @Override
    public void insert(PersonalContact personalContact) {
        BpsmtContactAddrPs entity = JpaPersonalContactRepository.toEntity(personalContact);
        entity.setContractCd(AppContexts.user().contractCode());
        entity.setVersion(0);
        this.commandProxy().insert(entity);
    }

    @Override
    public void update(PersonalContact personalContact) {
        BpsmtContactAddrPs entity = JpaPersonalContactRepository.toEntity(personalContact);
        Optional<BpsmtContactAddrPs> oldEntity = this.queryProxy().find(entity.getBpsmtContactAddrPsPK(), BpsmtContactAddrPs.class);
        if (oldEntity.isPresent()) {
            BpsmtContactAddrPs updateEntity = oldEntity.get();
            updateEntity.setMailAddress(entity.getMailAddress());
            updateEntity.setMobileEmailAddress(entity.getMobileEmailAddress());
            updateEntity.setPhoneNumber(entity.getPhoneNumber());
            updateEntity.setRemark1(entity.getRemark1());
            updateEntity.setContactName1(entity.getContactName1());
            updateEntity.setPhoneNumber1(entity.getPhoneNumber1());
            updateEntity.setRemark2(entity.getRemark2());
            updateEntity.setContactName2(entity.getContactName2());
            updateEntity.setPhoneNumber2(entity.getPhoneNumber2());
            updateEntity.setAddress1(entity.getAddress1());
            updateEntity.setAddress2(entity.getAddress2());
            updateEntity.setAddress3(entity.getAddress3());
            updateEntity.setAddress4(entity.getAddress4());
            updateEntity.setAddress5(entity.getAddress5());
            this.commandProxy().update(updateEntity);
        }
    }

    @Override
    public Optional<PersonalContact> getByPersonalId(String personalId) {
        return this.queryProxy()
                .query(SELECT_BY_PERSONAL_ID, BpsmtContactAddrPs.class)
                .setParameter("personalId", personalId)
                .getSingle(PersonalContact::createFromMemento);
    }

	@Override
	public List<PersonalContact> getByPersonalIds(List<String> personalIds) {
		List<PersonalContact> rs = new ArrayList<>();
		CollectionUtil.split(personalIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subPersonalIds -> {
			rs.addAll(this.queryProxy()
				.query(SELECT_BY_PERSONAL_IDS, BpsmtContactAddrPs.class)
				.setParameter("personalIds", personalIds)
				.getList(PersonalContact::createFromMemento));
		});
		return rs;
	}

	@Override
	public void insertAll(List<PersonalContact> personalContacts) {
		List<BpsmtContactAddrPs> entities = personalContacts.stream()
				.map(d -> {
					BpsmtContactAddrPs bpsmtContactAddrPs = new BpsmtContactAddrPs();
					d.setMemento(bpsmtContactAddrPs);
					bpsmtContactAddrPs.setContractCd(AppContexts.user().contractCode());
					return bpsmtContactAddrPs;
				})
				.collect(Collectors.toList());
        this.commandProxy().insertAll(entities);
	}

	@Override
	public void delete(String personalId) {
		this.commandProxy().remove(BpsmtContactAddrPs.class, personalId);
	}

	@Override
	public void updateAll(List<PersonalContact> personalContacts) {
		List<BpsmtContactAddrPs> entities = personalContacts.stream()
				.map(d -> {
					BpsmtContactAddrPs bpsmtContactAddrPs = new BpsmtContactAddrPs();
					d.setMemento(bpsmtContactAddrPs);
					bpsmtContactAddrPs.setContractCd(AppContexts.user().contractCode());
					return bpsmtContactAddrPs;
				})
				.collect(Collectors.toList());
		entities.forEach(entity -> {
			Optional<BpsmtContactAddrPs> oldEntity = this.queryProxy().find(entity.getBpsmtContactAddrPsPK(), BpsmtContactAddrPs.class);
	        if (oldEntity.isPresent()) {
	            BpsmtContactAddrPs updateEntity = oldEntity.get();
	            updateEntity.setMailAddress(entity.getMailAddress());
	            updateEntity.setMobileEmailAddress(entity.getMobileEmailAddress());
	            updateEntity.setPhoneNumber(entity.getPhoneNumber());
	            updateEntity.setRemark1(entity.getRemark1());
	            updateEntity.setContactName1(entity.getContactName1());
	            updateEntity.setPhoneNumber1(entity.getPhoneNumber1());
	            updateEntity.setRemark2(entity.getRemark2());
	            updateEntity.setContactName2(entity.getContactName2());
	            updateEntity.setPhoneNumber2(entity.getPhoneNumber2());
	            updateEntity.setAddress1(entity.getAddress1());
	            updateEntity.setAddress2(entity.getAddress2());
	            updateEntity.setAddress3(entity.getAddress3());
	            updateEntity.setAddress4(entity.getAddress4());
	            updateEntity.setAddress5(entity.getAddress5());
	            this.commandProxy().update(updateEntity);
	        }
		});
	}
}
