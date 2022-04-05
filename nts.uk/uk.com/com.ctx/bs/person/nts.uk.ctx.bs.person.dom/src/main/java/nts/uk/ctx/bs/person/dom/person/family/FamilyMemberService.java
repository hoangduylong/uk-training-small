package nts.uk.ctx.bs.person.dom.person.family;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.person.dom.person.family.relationship.FamilyRelationType;
import nts.uk.ctx.bs.person.dom.person.family.relationship.FamilyRelationTypeRepository;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class FamilyMemberService {
	@Inject
	private FamilyMemberRepository familyMemberRepo;
	
	@Inject
	private FamilyRelationTypeRepository familyRelationTypeRepo;
	
	/**
	 * 個人IDをもとに配偶者を取得する
	 * @param pid
	 * @return
	 */
	public List<FamilyMember> getRomajiOfFamilySpouseByPid(String pid){
		String contractCd = AppContexts.user().contractCode();
		//ドメインモデル「家族続柄種類」を取得する
		List<FamilyRelationType> familyRelationTypeLst = this.familyRelationTypeRepo
				.getFamilyRelationTypeIsSpouse(contractCd);
		
		if(CollectionUtil.isEmpty(familyRelationTypeLst)) return new ArrayList<>();
		
		List<String> relationCodes = familyRelationTypeLst.stream().map(c -> c.getRelationShipCode().v())
				.distinct()
				.collect(Collectors.toList());
		//ドメインモデル「家族」を取得する
		List<FamilyMember> familyMembers = this.familyMemberRepo.getListByPidAndRelationCode(pid, relationCodes);
		return familyMembers;
	}
}
