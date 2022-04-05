package nts.uk.ctx.bs.employee.dom.groupcommonmaster;

import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;

@Stateless
public class GroupCommonMasterImpl implements IGroupCommonMaster {

	@Inject
	private GroupCommonMasterRepository groupMasterRepo;

	/**
	 * 
	 * @param 契約コード
	 * @param 共通マスタID
	 * @param 会社ID
	 * @param 基準日
	 * @return グループ会社共通マスタ
	 */
	@Override
	public GroupCommonMasterExportDto getGroupCommonMasterEnableItem(String contractCode, String commonMasterId,
			String companyId, GeneralDate baseDate) {
		GroupCommonMasterExportDto result = new GroupCommonMasterExportDto();

		Optional<GroupCommonMasterExportDto> masterOpt = this.groupMasterRepo.getBasicInfo(contractCode, commonMasterId)
				.map(x -> new GroupCommonMasterExportDto(x.getCommonMasterName().v()));
		if (!masterOpt.isPresent()) {
			return result;
		}

		result = masterOpt.get();

		result.setCommonMasterItems(this.groupMasterRepo
				.getGroupCommonMasterEnableItem(contractCode, commonMasterId, companyId, baseDate).stream()
				.sorted(Comparator.comparing(GroupCommonMasterItem::getDisplayNumber)).collect(Collectors.toList()));

		return result;
	}

}
