package nts.uk.ctx.bs.employee.infra.repository.groupcommonmaster;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;

import nts.arc.error.BusinessException;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.time.GeneralDate;
import nts.gul.collection.CollectionUtil;
import nts.gul.text.IdentifierUtil;
import nts.uk.ctx.bs.employee.dom.employee.employeelicense.ContractCode;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.CommonMasterCode;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.CommonMasterItemCode;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.CommonMasterItemName;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.CommonMasterName;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.GroupCommonMaster;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.GroupCommonMasterItem;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.GroupCommonMasterRepository;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.NotUseCompanyList;
import nts.uk.ctx.bs.employee.infra.entity.groupcommonmaster.BsymtGpMasterCategory;
import nts.uk.ctx.bs.employee.infra.entity.groupcommonmaster.BsymtGpMasterCategoryPK;
import nts.uk.ctx.bs.employee.infra.entity.groupcommonmaster.BsymtGpMasterItem;
import nts.uk.ctx.bs.employee.infra.entity.groupcommonmaster.BsymtGpMasterNotUse;
import nts.uk.ctx.bs.employee.infra.entity.groupcommonmaster.BsymtGpMasterNotUsePK;

@Stateless
public class JpaGroupCommonMasterRepository extends JpaRepository implements GroupCommonMasterRepository {

	private static final String GET_BY_CONTRACT_CODE = "SELECT mc FROM BsymtGpMasterCategory mc WHERE mc.pk.contractCode = :contractCode";

	private static final String GET_ITEM_BY_CONTRACT_CODE_AND_LIST_MASTER_ID = "SELECT mi FROM BsymtGpMasterItem mi WHERE mi.contractCode = :contractCode AND mi.commonMasterId IN :commonMasterIds";

	private static final String GET_NOT_USE_BY_LIST_ITEM_ID = "SELECT nu FROM BsymtGpMasterNotUse nu WHERE nu.pk.commonMasterItemId IN :commonMasterItemIds";

	private static final String GET_BY_CONTRACT_CODE_AND_ID = "SELECT mc FROM BsymtGpMasterCategory mc WHERE mc.pk.contractCode = :contractCode AND mc.pk.commonMasterId = :commonMasterId";

	private static final String GET_ENABLE_ITEM = "SELECT mi FROM BsymtGpMasterItem mi "
			+ "WHERE mi.contractCode = :contractCode " + "AND mi.commonMasterId = :commonMasterId "
			+ "AND :baseDate BETWEEN mi.usageStartDate " + "AND mi.usageEndDate "
			+ "AND NOT EXISTS(SELECT nu FROM BsymtGpMasterNotUse nu "
			+ "WHERE nu.pk.commonMasterItemId = mi.commonMasterItemId " + "AND nu.pk.companyId = :companyId)";

	@Override
	public void addListGroupCommonMaster(List<GroupCommonMaster> domains) {

		// add categories
		List<BsymtGpMasterCategory> categories = domains.stream().map(x -> mapCategory(x)).collect(Collectors.toList());

		this.commandProxy().insertAll(categories);

		if (!CollectionUtil.isEmpty(categories)) {
			return;
		}

		// add items
		List<BsymtGpMasterItem> items = domains.stream().filter(x -> !CollectionUtil.isEmpty(x.getCommonMasterItems()))
				.map(x -> mapItemList(x)).collect(Collectors.toList()).stream().flatMap(List::stream)
				.collect(Collectors.toList());

		if (!CollectionUtil.isEmpty(items)) {
			return;
		}

		this.commandProxy().insertAll(items);

		// add not use
		List<BsymtGpMasterNotUse> notUses = domains.stream()
				.filter(domain -> !CollectionUtil.isEmpty(domain.getCommonMasterItems()))
				.map(domain -> mapNotUseList(domain.getCommonMasterItems())).collect(Collectors.toList()).stream()
				.flatMap(List::stream).collect(Collectors.toList());

		if (!CollectionUtil.isEmpty(notUses)) {
			return;
		}

		this.commandProxy().insertAll(notUses);

	}

	private BsymtGpMasterCategory mapCategory(GroupCommonMaster domain) {
		return new BsymtGpMasterCategory(
				new BsymtGpMasterCategoryPK(domain.getCommonMasterId(), domain.getContractCode().v()),
				domain.getCommonMasterCode().v(), domain.getCommonMasterName().v(), domain.getCommonMasterMemo());
	}

	private List<BsymtGpMasterItem> mapItemList(GroupCommonMaster domain) {

		return domain.getCommonMasterItems().stream()
				.map(x -> mapItem(domain.getContractCode().v(), domain.getCommonMasterId(), x))
				.collect(Collectors.toList());

	}

	private BsymtGpMasterItem mapItem(String contractCode, String commonMasterId, GroupCommonMasterItem item) {

		return new BsymtGpMasterItem(commonMasterId, item.getCommonMasterItemId(),
				item.getCommonMasterItemCode().v(), item.getCommonMasterItemName().v(), item.getDisplayNumber(),
				item.getUsageStartDate(), item.getUsageEndDate());

	}

	private List<BsymtGpMasterNotUse> mapNotUseList(List<GroupCommonMasterItem> items) {

		return items.stream()
				.map(item -> item.getNotUseCompanyList().stream()
						.map(notuse -> mapNotUse(item.getCommonMasterItemId(), notuse)).collect(Collectors.toList()))
				.flatMap(List::stream).collect(Collectors.toList());

	}

	private BsymtGpMasterNotUse mapNotUse(String commonMasterItemId, NotUseCompanyList notuse) {
		return new BsymtGpMasterNotUse(new BsymtGpMasterNotUsePK(commonMasterItemId, notuse.getCompanyId()));
	}

	@Override
	public List<GroupCommonMaster> getByContractCode(String contractCode) {

		List<GroupCommonMaster> commonMasters = this.queryProxy()
				.query(GET_BY_CONTRACT_CODE, BsymtGpMasterCategory.class).setParameter("contractCode", contractCode)
				.getList().stream().map(x -> toCategoryDomain(x)).collect(Collectors.toList());

		if (CollectionUtil.isEmpty(commonMasters)) {
			return commonMasters;
		}

		setMasterItems(contractCode, commonMasters);

		setNotUses(commonMasters);

		return commonMasters;

	}

	private void setMasterItems(String contractCode, List<GroupCommonMaster> commonMasters) {

		List<String> commonMasterIds = commonMasters.stream().map(x -> x.getCommonMasterId())
				.collect(Collectors.toList());

		List<BsymtGpMasterItem> commonMasterItems = this.queryProxy()
				.query(GET_ITEM_BY_CONTRACT_CODE_AND_LIST_MASTER_ID, BsymtGpMasterItem.class)
				.setParameter("contractCode", contractCode).setParameter("commonMasterIds", commonMasterIds).getList();

		commonMasters.forEach(commonMaster -> {
			List<GroupCommonMasterItem> items = commonMasterItems.stream()
					.filter(item -> item.getCommonMasterId().equals(commonMaster.getCommonMasterId()))
					.map(item -> toItemDomain(item)).collect(Collectors.toList());
			commonMaster.setCommonMasterItems(items);
		});

	}

	private void setNotUses(List<GroupCommonMaster> commonMasters) {
		List<String> commonMasterItemIds = commonMasters.stream()
				.filter(domain -> !CollectionUtil.isEmpty(domain.getCommonMasterItems()))
				.map(x -> x.getCommonMasterItems().stream().map(item -> item.getCommonMasterItemId())
						.collect(Collectors.toList()))
				.flatMap(List::stream).collect(Collectors.toList());

		if (CollectionUtil.isEmpty(commonMasterItemIds)) {
			return;
		}

		List<BsymtGpMasterNotUse> notUseCompanyList = this.queryProxy()
				.query(GET_NOT_USE_BY_LIST_ITEM_ID, BsymtGpMasterNotUse.class)
				.setParameter("commonMasterItemIds", commonMasterItemIds).getList();

		List<GroupCommonMasterItem> masterItems = commonMasters.stream().map(master -> master.getCommonMasterItems())
				.flatMap(List::stream).collect(Collectors.toList());

		masterItems.forEach(item -> {

			List<NotUseCompanyList> notUses = notUseCompanyList.stream()
					.filter(notUse -> notUse.getPk().getCommonMasterItemId().equals(item.getCommonMasterItemId()))
					.map(notUse -> new NotUseCompanyList(notUse.getPk().getCompanyId())).collect(Collectors.toList());

			item.setNotUseCompanyList(notUses);

		});
	}

	private GroupCommonMaster toCategoryDomain(BsymtGpMasterCategory entity) {

		GroupCommonMaster domain = new GroupCommonMaster(new ContractCode(entity.getPk().getContractCode()),
				entity.getPk().getCommonMasterId(), new CommonMasterCode(entity.getCommonMasterCode()),
				new CommonMasterName(entity.getCommonMasterName()), entity.getCommonMasterMemo());

		return domain;
	}

	private GroupCommonMasterItem toItemDomain(BsymtGpMasterItem entity) {

		GroupCommonMasterItem domain = new GroupCommonMasterItem(entity.getCommonMasterItemId(),
				new CommonMasterItemCode(entity.getCommonMasterItemCode()),
				new CommonMasterItemName(entity.getCommonMasterItemName()), entity.getDisplayNumber(),
				entity.getUsageStartDate(), entity.getUsageEndDate());

		return domain;
	}

	@Override
	public Optional<GroupCommonMaster> getByContractCodeAndId(String contractCode, String commonMasterId) {

		Optional<GroupCommonMaster> commonMasterOpt = this.queryProxy()
				.query(GET_BY_CONTRACT_CODE_AND_ID, BsymtGpMasterCategory.class)
				.setParameter("contractCode", contractCode).setParameter("commonMasterId", commonMasterId).getSingle()
				.map(x -> toCategoryDomain(x));

		GroupCommonMaster commonMaster = null;

		if (commonMasterOpt.isPresent()) {

			commonMaster = commonMasterOpt.get();

			setMasterItems(contractCode, Arrays.asList(commonMaster));

			setNotUses(Arrays.asList(commonMaster));
		}

		return Optional.ofNullable(commonMaster);
	}

	@Override
	public Optional<GroupCommonMaster> getBasicInfo(String contractCode, String commonMasterId) {

		Optional<GroupCommonMaster> commonMasterOpt = this.queryProxy()
				.query(GET_BY_CONTRACT_CODE_AND_ID, BsymtGpMasterCategory.class)
				.setParameter("contractCode", contractCode).setParameter("commonMasterId", commonMasterId).getSingle()
				.map(x -> toCategoryDomain(x));

		GroupCommonMaster commonMaster = null;

		if (commonMasterOpt.isPresent()) {
			commonMaster = commonMasterOpt.get();
		}

		return Optional.ofNullable(commonMaster);
	}

	@Override
	public void removeGroupCommonMasterUsage(String contractCode, String commonMasterId, String companyId,
			List<String> masterItemIds) {

		this.commandProxy().removeAll(BsymtGpMasterNotUse.class,
				masterItemIds.stream().map(x -> new BsymtGpMasterNotUsePK(x, companyId)).collect(Collectors.toList()));
		this.getEntityManager().flush();
	}

	@Override
	public void addGroupCommonMasterUsage(String contractCode, String commonMasterId, String companyId,
			List<String> masterItemIds) {

		this.commandProxy().insertAll(genNotUseEntity(masterItemIds, companyId));
		this.getEntityManager().flush();
	}

	private List<BsymtGpMasterNotUse> genNotUseEntity(List<String> masterItemIds, String companyId) {
		return masterItemIds.stream()
				.map(masterItemId -> new BsymtGpMasterNotUse(new BsymtGpMasterNotUsePK(masterItemId, companyId)))
				.collect(Collectors.toList());
	}

	@Override
	public List<GroupCommonMasterItem> getGroupCommonMasterEnableItem(String contractCode, String commonMasterId,
			String companyId, GeneralDate baseDate) {
		return this.queryProxy().query(GET_ENABLE_ITEM, BsymtGpMasterItem.class)
				.setParameter("contractCode", contractCode).setParameter("commonMasterId", commonMasterId)
				.setParameter("baseDate", baseDate).setParameter("companyId", companyId).getList().stream()
				.map(x -> toItemDomain(x)).collect(Collectors.toList());

	}

	@Override
	public void updateGroupCommonMaster(String contractCd, List<GroupCommonMaster> domains) {		
		for(GroupCommonMaster item: domains) {
			// update commonMaster .find(item.getCommonMasterId(), BsymtGpMasterCategory.class);
			Optional<BsymtGpMasterCategory> findItem = this.queryProxy().find(new BsymtGpMasterCategoryPK(item.getCommonMasterId(), contractCd) , BsymtGpMasterCategory.class);
			if(!findItem.isPresent()) {
				throw new BusinessException("don't exist in BsymtGpMasterCategory");
			}
			BsymtGpMasterCategory categories = mapCategory(item);
			this.commandProxy().update(categories);
		}
	}

	@Override
	public void addCommonMasterItem(String contractCd, String commonMasterId, List<GroupCommonMasterItem> domains) {
		List<BsymtGpMasterItem> listMasterItem = new ArrayList<>();
		// add items
		for(GroupCommonMasterItem item: domains) {
			if(item.getCommonMasterItemId() == null) {
				BsymtGpMasterItem entity = mapItem(contractCd, commonMasterId, new GroupCommonMasterItem(IdentifierUtil.randomUniqueId(), item.getCommonMasterItemCode(), item.getCommonMasterItemName(), item.getDisplayNumber(), item.getUsageStartDate(), item.getUsageEndDate()));
				listMasterItem.add(entity);
			}else {
				BsymtGpMasterItem entity = mapItem(contractCd, commonMasterId, item);
				listMasterItem.add(entity);
			}
		}
		
		this.commandProxy().insertAll(listMasterItem);
				
	}

	@Override
	public void updateCommonMasterItem(String contractCd, String commonMasterId, List<GroupCommonMasterItem> domains) {
		List<BsymtGpMasterItem> listItemAdd = new ArrayList<>();
		for(GroupCommonMasterItem item: domains) {
			Optional<BsymtGpMasterItem> findMasterItem = this.queryProxy().find(item.getCommonMasterItemId(), BsymtGpMasterItem.class);
			if(findMasterItem.isPresent()) {
				BsymtGpMasterItem convertToEntity = mapItem(contractCd, commonMasterId, item);
				listItemAdd.add(convertToEntity);
			}
		}
		if(!listItemAdd.isEmpty()) {
			this.commandProxy().updateAll(listItemAdd);
		}
	}

	@Override
	public List<GroupCommonMaster> getCommonMaster(String contractCd) {
		List<GroupCommonMaster> commonMasters = this.queryProxy()
				.query(GET_BY_CONTRACT_CODE, BsymtGpMasterCategory.class).setParameter("contractCode", contractCd)
				.getList().stream().map(x -> toCategoryDomain(x)).collect(Collectors.toList());

		if (CollectionUtil.isEmpty(commonMasters)) {
			return commonMasters;
		}
		
		// setMasterItems(contractCode, commonMasters);
		List<String> commonMasterIds = commonMasters.stream().map(x -> x.getCommonMasterId())
				.collect(Collectors.toList());

		List<BsymtGpMasterItem> commonMasterItems = this.queryProxy()
				.query(GET_ITEM_BY_CONTRACT_CODE_AND_LIST_MASTER_ID, BsymtGpMasterItem.class)
				.setParameter("contractCode", contractCd).setParameter("commonMasterIds", commonMasterIds).getList();

		commonMasters.forEach(commonMaster -> {
			List<GroupCommonMasterItem> items = commonMasterItems.stream()
					.filter(item -> item.getCommonMasterId().equals(commonMaster.getCommonMasterId()))
					.map(item -> toItemDomain(item)).collect(Collectors.toList());
			commonMaster.setCommonMasterItems(items);
		});

		return commonMasters;
	}

}
