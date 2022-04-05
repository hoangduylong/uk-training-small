package nts.uk.ctx.bs.person.pubimp.family;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.person.dom.person.family.FamilyMember;
import nts.uk.ctx.bs.person.dom.person.family.FamilyMemberService;
import nts.uk.ctx.bs.person.dom.person.family.fullnameset.FullNameSet;
import nts.uk.ctx.bs.person.pub.family.FamilyExport623;
import nts.uk.ctx.bs.person.pub.family.FamilyPub;
@Stateless
public class FamilyMemberPubImpl implements FamilyPub{

	@Inject
	private FamilyMemberService familyMemberService;
	
	@Override
	public List<FamilyExport623> getRomajiOfFamilySpouseByPid(String pid) {
		// 個人IDをもとに配偶者を取得する
        List<FamilyMember> familyMembers = this.familyMemberService.getRomajiOfFamilySpouseByPid(pid);
		
		if(CollectionUtil.isEmpty(familyMembers)) return new ArrayList<>();
		
		return familyMembers.stream().map(c -> {
			Optional<FullNameSet> romajiOpt = c.getFullNameRomaji();
			return new FamilyExport623(c.getFamilyMemberId(), c.getBirthday() == null?"": c.getBirthday().toString(),
					c.getFullName().getFullName() == null? "": c.getFullName().getFullName().v(),
					c.getFullName().getFullNameKana() == null? "": c.getFullName().getFullNameKana().v(),
					Optional.ofNullable(romajiOpt.isPresent()? (romajiOpt.get().getFullName() == null? "":romajiOpt.get().getFullName().v()):""),
					Optional.ofNullable(romajiOpt.isPresent()? (romajiOpt.get().getFullNameKana() == null?"":romajiOpt.get().getFullNameKana().v()):""));
			}).collect(Collectors.toList());
	}
	
}
