package nts.uk.ctx.bs.person.infra.repository.person.family;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.bs.person.dom.person.family.FamilyMember;
import nts.uk.ctx.bs.person.dom.person.family.fullnameset.*;
import nts.uk.ctx.bs.person.dom.person.family.FamilyMemberRepository;
import nts.uk.ctx.bs.person.infra.entity.person.family.BpsmtFamily;
import nts.uk.ctx.bs.person.infra.entity.person.family.BpsmtFamilyPk;

@Stateless
public class JpaFamilyMember extends JpaRepository implements FamilyMemberRepository {

	public static final String GET_ALL_BY_PID = "SELECT c FROM BpsmtFamily c WHERE c.pid = :pid";
	
	private static final String SELECT_FAMILY_BY_ID = "SELECT c FROM BpsmtFamily c WHERE c.ppsmtFamilyPk.familyId = :familyId";
	
	public static final String SELECT_ALL_BY_PID_AND_RELATION_CD = "SELECT c FROM BpsmtFamily c WHERE c.pid = :pid AND c.relationCode IN :relationCode";

	private List<FamilyMember> toListFamily(List<BpsmtFamily> listEntity) {
		List<FamilyMember> lstFamily = new ArrayList<>();
		if (!listEntity.isEmpty()) {
			listEntity.stream().forEach(c -> {
				FamilyMember family = toDomainFamily(c);

				lstFamily.add(family);
			});
		}
		return lstFamily;
	}

	private FamilyMember toDomainFamily(BpsmtFamily entity) {
		FamilyMember domain = FamilyMember.createFromJavaType(
				entity.ppsmtFamilyPk.familyId, 
				entity.pid,
				entity.fName,
				entity.fNameKana,
				entity.fNameRomaji,
				entity.fNameRomajiKana,
				entity.fNameMultiLang, 
				entity.fNameMultiLangKana,
				entity.todukedeName, 
				entity.todukedeNameKana, 
				entity.birthday,
				entity.deathDate, 
				entity.entryDate, 
				entity.expDate,
				entity.relationCode);
		return domain;
	}
	
	@Override
	public FamilyMember getFamilyById(String familyId) {
		Optional<FamilyMember> family = this.queryProxy().query(SELECT_FAMILY_BY_ID, BpsmtFamily.class)
				.setParameter("familyId", familyId).getSingle(x -> toDomainFamily(x));
		return family.isPresent()?family.get():null;
	}

	@Override
	public List<FamilyMember> getListByPid(String pid) {
		List<BpsmtFamily> listEntity = this.queryProxy().query(GET_ALL_BY_PID, BpsmtFamily.class)
				.setParameter("pid", pid).getList();
		return toListFamily(listEntity);
	}
	/**
	 * toEntity
	 * @param domain
	 * @return
	 */
	private BpsmtFamily toEntity(FamilyMember domain){
		BpsmtFamilyPk key = new BpsmtFamilyPk(domain.getFamilyMemberId());
		List<String> fName = getStringFromOptional(Optional.of(domain.getFullName()));
		List<String> fullNameRomaji = getStringFromOptional(domain.getFullNameRomaji());
		List<String> fullNameMultiLang = getStringFromOptional(domain.getFullNameMultiLang());
		List<String> fullNametokodeke = getStringFromOptional(domain.getFullNametokodeke());
		return new BpsmtFamily(key, domain.getPersonId(), domain.getBirthday(),
				domain.getRelationshipCode().v(),
				fName.size() == 0? null: fName.get(0),
			    fName.size() == 0? null: fName.get(1),
			    fullNameRomaji.size() == 0? null: fullNameRomaji.get(0),
			    fullNameRomaji.size() == 0? null: fullNameRomaji.get(1),	
			    fullNameMultiLang.size() == 0? null: fullNameMultiLang.get(0),
			    fullNameMultiLang.size() == 0? null: fullNameMultiLang.get(1),	
			    fullNametokodeke.size() == 0? null: fullNametokodeke.get(0),
			    fullNametokodeke.size() == 0? null: fullNametokodeke.get(1),
			    domain.getDeadDay().isPresent()? domain.getDeadDay().get(): null,
			    domain.getEntryDate().isPresent()? domain.getEntryDate().get(): null,
			    domain.getExpelledDate().isPresent()? domain.getExpelledDate().get(): null
			   );
	}
	
	private List<String> getStringFromOptional(Optional<FullNameSet> fullNameSetOpt) {
		List<String> result = new ArrayList<>();
		if(fullNameSetOpt.isPresent()) {
			FullNameSet fullNameSet = fullNameSetOpt.get();
			result.add(fullNameSet.getFullName() == null? "": fullNameSet.getFullName().v());
			result.add(fullNameSet.getFullNameKana() == null? "": fullNameSet.getFullNameKana().v());
		}
		return result;
	}
	/**
	 * updateEntity
	 * @param domain
	 * @param entity
	 */
	private void updateEntity(FamilyMember domain, BpsmtFamily entity){
		List<String> fName = getStringFromOptional(Optional.of(domain.getFullName()));
		List<String> fullNameRomaji = getStringFromOptional(domain.getFullNameRomaji());
		List<String> fullNameMultiLang = getStringFromOptional(domain.getFullNameMultiLang());
		List<String> fullNametokodeke = getStringFromOptional(domain.getFullNametokodeke());
		entity.pid = domain.getPersonId();
		entity.birthday = domain.getBirthday();
		entity.relationCode = domain.getRelationshipCode().v();
		entity.fName	= fName.size() == 0? null: fName.get(0);
		entity.fNameKana = fName.size() == 0? null: fName.get(1);
		entity.fNameRomaji = fullNameRomaji.size() == 0? null: fullNameRomaji.get(0);
		entity.fNameRomajiKana = fullNameRomaji.size() == 0? null: fullNameRomaji.get(1);
		entity.fNameMultiLang = fullNameMultiLang.size() == 0? null: fullNameMultiLang.get(0);
	 	entity.fNameMultiLangKana = fullNameMultiLang.size() == 0? null: fullNameMultiLang.get(1);
	 	entity.todukedeName = fullNametokodeke.size() == 0? null: fullNametokodeke.get(0);
		entity.todukedeNameKana = fullNametokodeke.size() == 0? null: fullNametokodeke.get(1);
		entity.expDate = domain.getExpelledDate().isPresent()? domain.getExpelledDate().get(): null;
		entity.entryDate = domain.getEntryDate().isPresent()? domain.getEntryDate().get(): null;
		entity.deathDate =  domain.getDeadDay().isPresent()? domain.getDeadDay().get(): null;
		
	}
	/**
	 * Add family ドメインモデル「家族」を新規登録する
	 * @param family
	 */
	@Override
	public void addFamily(FamilyMember family) {
		this.commandProxy().insert(toEntity(family));
	}
	/**
	 * Update family 取得した「家族」を更新する
	 * @param family
	 */
	@Override
	public void updateFamily(FamilyMember family) {
		// Get exist entity
		BpsmtFamilyPk pk = new BpsmtFamilyPk(family.getFamilyMemberId());
		Optional<BpsmtFamily> existItem = this.queryProxy().find(pk, BpsmtFamily.class);
		if(!existItem.isPresent()){
			throw new RuntimeException("invalid Family");
		}
		// Update entity
		updateEntity(family,existItem.get());
		// Update family
		this.commandProxy().update(existItem.get());
	
		
	}

	@Override
	public List<FamilyMember> getListByPidAndRelationCode(String pid, List<String> relationShipCodes) {
		List<BpsmtFamily> listEntity = this.queryProxy().query(SELECT_ALL_BY_PID_AND_RELATION_CD, BpsmtFamily.class)
				.setParameter("pid", pid)
				.setParameter("relationCode", relationShipCodes)
				.getList();
		return toListFamily(listEntity);
	}

}
