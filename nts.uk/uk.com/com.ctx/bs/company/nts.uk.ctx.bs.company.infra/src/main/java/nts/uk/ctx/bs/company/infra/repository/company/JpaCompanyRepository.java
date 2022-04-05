/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.company.infra.repository.company;

//import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
//import java.util.stream.Collector;
//import java.util.stream.Collectors;

import javax.ejb.Stateless;

import lombok.val;
import nts.arc.layer.infra.data.JpaRepository;
import nts.gul.text.StringUtil;
import nts.uk.ctx.bs.company.dom.company.AddInfor;
import nts.uk.ctx.bs.company.dom.company.Company;
import nts.uk.ctx.bs.company.dom.company.CompanyRepository;
import nts.uk.ctx.bs.company.infra.entity.company.BcmmtAddInfor;
import nts.uk.ctx.bs.company.infra.entity.company.BcmmtAddInforPK;
import nts.uk.ctx.bs.company.infra.entity.company.BcmmtCompanyInfor;
import nts.uk.ctx.bs.company.infra.entity.company.BcmmtCompanyInforPK;

/**
 * The Class JpaCompanyRepository.
 */
@Stateless
public class JpaCompanyRepository extends JpaRepository implements CompanyRepository {

	private static final String GETALLCOMPANY;

	public static final String SELECT_BY_CID = "SELECT c FROM BcmmtCompanyInfor c WHERE c.bcmmtCompanyInforPK.companyId = :cid" + " AND c.isAbolition = 0 ";
	
	public static final String SELECT_BY_CID_CONTRACTCD_ABOLITIATR = "SELECT c FROM BcmmtCompanyInfor c "
			+ " WHERE c.bcmmtCompanyInforPK.companyId = :cid "
			+ " AND c.contractCd = :contractCd "
			+ " AND c.isAbolition = :isAbolition "
			+ " ORDER BY c.companyCode ASC ";

	public static final String GET_COMPANY_BY_CID = "SELECT c FROM BcmmtCompanyInfor c WHERE c.bcmmtCompanyInforPK.companyId = :cid ";
	
	public static final String GET_COMPANY_BY_LIST_CID = "SELECT c FROM BcmmtCompanyInfor c WHERE c.bcmmtCompanyInforPK.companyId IN :listCid AND c.contractCd = :contractCd";
	
	static {
		StringBuilder builderString = new StringBuilder();
		builderString = new StringBuilder();
		builderString.append("SELECT e");
		builderString.append(" FROM BcmmtCompanyInfor e");
		builderString.append(" WHERE e.isAbolition = 0 ");
		builderString.append(" AND e.contractCd = :contractCd");
		builderString.append(" ORDER BY e.companyCode ");
		GETALLCOMPANY = builderString.toString();
	}
	/**
	 * Bcmmt Company Infor author: Hoang Yen
	 */
	private static final String SELECT_NO_WHERE = "SELECT c FROM BcmmtCompanyInfor c ";
	// bcmmt add infor
	private static final String COUNT_ALL = "SELECT COUNT(c.bcmmtCompanyInforPK.companyId) FROM BcmmtCompanyInfor c ";
	private static final String COUNT_ABOLISH = "SELECT COUNT(c.bcmmtCompanyInforPK.companyId) FROM BcmmtCompanyInfor c WHERE c.isAbolition = 1 AND c.bcmmtCompanyInforPK.companyId != :companyId ";
	
//	private final String SELECT_ADD_NO_WHERE = "SELECT  c FROM BcmmtAddInfor c ";
//	private final String SELECT_ADD = SELECT_ADD_NO_WHERE + "WHERE c.bcmmtAddInforPK.companyId = :companyId AND c.bcmmtAddInforPK.companyCode = :companyCode AND c.bcmmtAddInforPK.contractCd = :contractCd";

	
	private static final String GET_BY_CID = SELECT_NO_WHERE + " WHERE c.bcmmtCompanyInforPK.companyId = :cid AND c.isAbolition = 0 ";
	
	private static final String GET_ALL_COMPANY_BY_CONTRACT_CD = SELECT_NO_WHERE + " WHERE c.contractCd = :contractCd ORDER BY c.companyCode ASC ";
	
	private static final String GET_ALL_COMPANY_BY_CONTRACTCD_AND_ABOLITIATR = 
			SELECT_NO_WHERE
			+ " WHERE c.contractCd = :contractCd "
			+ " AND c.isAbolition = :isAbolition "
			+ " ORDER BY c.companyCode ASC ";
	private static final String GET_ALL_COMPANY_BY_CONTRACTCD_AND_ABOATR= 
			"SELECT c.bcmmtCompanyInforPK.companyId FROM BcmmtCompanyInfor c "
			+ " WHERE c.contractCd = :contractCd "
			+ " AND c.isAbolition = :isAbolition "
			+ " ORDER BY c.companyCode ASC ";
	
	private static final String GET_NOT_ABOLITION_BY_CID = "SELECT c, d FROM BcmmtCompanyInfor c"
			+ " LEFT JOIN  BcmmtAddInfor d "
			+ " ON c.bcmmtCompanyInforPK.companyId = d.bcmmtAddInforPK.companyId"
			+ " WHERE c.bcmmtCompanyInforPK.companyId = :cid AND c.isAbolition = 0 ";
//	/**
//	 * @param entity
//	 * @return new Company(companyCode,companyName,companyId,isAboltiton)
//	 */
//	private static Company toSimpleDomain(BcmmtCompany entity) {
//		Company domain = Company.createFromJavaType(entity.getCcd(), entity.getCompanyName(), entity.getCid(),
//				entity.getAbolitionAtr(), entity.getPersonSystem(), entity.getEmploymentSystem(),
//				entity.getPayrollSystem());
//
//		return domain;
//	}

//	/*
//	 * (non-Javadoc)
//	 * 
//	 * @see
//	 * nts.uk.ctx.basic.dom.company.CompanyRepository#getComanyId(java.lang.
//	 * String)
//	 */
//	@Override
//	public Optional<Company> getComanyById(String companyId) {
//		return this.queryProxy().find(companyId, BcmmtCompany.class).map(company -> this.toDomain(company));
//	}

//	/**
//	 * To domain.
//	 *
//	 * @param entity
//	 *            the entity
//	 * @return the company
//	 */
//	private Company toDomain(BcmmtCompany entity) {
//		return new Company(new JpaCompanyGetMemento(entity));
//	}

	@Override
	public List<Company> getAllCompany(String contractCd) {
		return this.queryProxy().query(GETALLCOMPANY, BcmmtCompanyInfor.class)
				.setParameter("contractCd",contractCd)
				.getList(c -> toDomainCom(c));
	}
	
	@Override
	public List<Company> findAllByListCid(String contractCd, List<String> companyIds) {
		return this.queryProxy().query(GET_COMPANY_BY_LIST_CID, BcmmtCompanyInfor.class)
				.setParameter("listCid", companyIds)
				.setParameter("contractCd",contractCd)
				.getList(c -> toDomainCom(c));
	}

	/**
	 * for RequestList 108
	 */
	@Override
	public Optional<Company> getComanyInfoByCid(String cid) {
		BcmmtCompanyInfor entity = this.queryProxy().query(SELECT_BY_CID, BcmmtCompanyInfor.class).setParameter("cid", cid)
				.getSingleOrNull();
		Company company = new Company();
		if (entity != null) {
			company = toDomainCom(entity);
		}
		return Optional.of(company);
	}

	/**
	 * convert from entity to domain
	 * @param entity
	 * @return 
	 * @author yennth
	 */
	private Company toDomainCom(BcmmtCompanyInfor entity) {
		AddInfor add = entity.bcmmtAddInfor == null ? null : toDomainAdd(entity.bcmmtAddInfor);
		Company domain = Company.createFromJavaType(entity.companyCode,
				entity.companyName, entity.startMonth, entity.isAbolition,
				entity.repname, entity.repost, entity.comNameKana, entity.shortComName,
				entity.contractCd, entity.taxNo != null ? entity.taxNo.toString() : null, add);
		return domain;
	}

	/**
	 * convert to domain address
	 * @param entity  
	 * @return
	 * @author yennth
	 */
	private static AddInfor toDomainAdd(BcmmtAddInfor entity) {
		AddInfor domain = AddInfor.createFromJavaType(entity.bcmmtAddInforPK.companyId, entity.faxNum, entity.add_1,
				entity.add_2, entity.addKana_1, entity.addKana_2, entity.postCd, entity.phoneNum);
		return domain;
	}

	/**
	 * change from company domain to company entity
	 * @param domain
	 * @return
	 * @author yennth
	 */
	private static BcmmtCompanyInfor toEntityCom(Company domain) {
		val entity = new BcmmtCompanyInfor();
		entity.bcmmtCompanyInforPK = new BcmmtCompanyInforPK(domain.getCompanyId());
		entity.companyCode = domain.getCompanyCode().v();
		entity.contractCd = domain.getContractCd().v();
		entity.repname = domain.getRepname().isPresent() ? domain.getRepname().get().v() : null;
		entity.repost = domain.getRepjob().isPresent() ? domain.getRepjob().get().v() : null;
		entity.companyName = domain.getCompanyName().v();
		entity.comNameKana = domain.getComNameKana().isPresent() ? domain.getComNameKana().get().v() : null;
		entity.shortComName = domain.getShortComName().isPresent() ? domain.getShortComName().get().v() : null;
		entity.isAbolition = domain.getIsAbolition().value;
		entity.startMonth = domain.getStartMonth().value;
		entity.taxNo = domain.getTaxNo().isPresent() && !StringUtil.isNullOrEmpty(domain.getTaxNo().get().v(), true) ? domain.getTaxNo().get().v() : null;
		if (domain.getAddInfor().isPresent()) {
			entity.bcmmtAddInfor = toEntityAdd(domain.getAddInfor().get());
		}
		return entity;
	}
	
	/**
	 * convert from domain address to entity address
	 * @param domain
	 * @return
	 * @author yennth
	 */
	private static BcmmtAddInfor toEntityAdd(AddInfor domain) {
		val entity = new BcmmtAddInfor();
		entity.bcmmtAddInforPK = new BcmmtAddInforPK(domain.getCompanyId());
		entity.faxNum = domain.getFaxNum().v();
		entity.add_1 = domain.getAdd_1().v();
		entity.add_2 = domain.getAdd_2().v();
		entity.addKana_1 = domain.getAddKana_1().v();
		entity.addKana_2 = domain.getAddKana_2().v();
		entity.postCd = domain.getPostCd() != null ? domain.getPostCd().v() : "";
		entity.phoneNum = domain.getPhoneNum().v();
		return entity;
	}

	/**
	 * get all company in database 
	 * @author yennth
	 */
	@Override
	public List<Company> findAll(String contractCd) {
		return this.queryProxy().query(GET_ALL_COMPANY_BY_CONTRACT_CD, BcmmtCompanyInfor.class)
				.setParameter("contractCd", contractCd)
				.getList(c -> toDomainCom(c));
	}

	/**
	 * find company information by code 
	 * @author yennth
	 */
	@Override
	public Optional<Company> find(String companyId) {
		Optional<BcmmtAddInfor> addInforOptional = this.queryProxy().find(new BcmmtAddInforPK(companyId), BcmmtAddInfor.class);
		return this.queryProxy().find(new BcmmtCompanyInforPK(companyId), BcmmtCompanyInfor.class).map(x -> {
			x.bcmmtAddInfor = addInforOptional.orElse(null);
			return toDomainCom(x);
		});
	}
	
	/**
	 * update a company 
	 * @author yennth
	 */
	@Override
	public void updateCom(Company company) {
		BcmmtCompanyInfor entity = toEntityCom(company);
		BcmmtCompanyInfor oldEntity = this.queryProxy().find(entity.bcmmtCompanyInforPK, BcmmtCompanyInfor.class).get();
		oldEntity.repname = entity.repname;
		oldEntity.repost = entity.repost;
		oldEntity.companyName = entity.companyName;
		oldEntity.comNameKana = entity.comNameKana;
		oldEntity.shortComName = entity.shortComName;
		oldEntity.isAbolition = entity.isAbolition;
		oldEntity.startMonth = entity.startMonth;
		oldEntity.taxNo = entity.taxNo;
		this.commandProxy().update(oldEntity);
		
		BcmmtAddInforPK bcmmtAddInforPK = new BcmmtAddInforPK(entity.bcmmtCompanyInforPK.companyId);
		Optional<BcmmtAddInfor> oldAddEntityOpt = this.queryProxy().find(bcmmtAddInforPK, BcmmtAddInfor.class);
		BcmmtAddInfor newAddEntity = entity.bcmmtAddInfor;
		if (oldAddEntityOpt.isPresent() && newAddEntity != null) {
			BcmmtAddInfor oldAddEntity = oldAddEntityOpt.get();
			oldAddEntity.add_1 = newAddEntity.add_1;
			oldAddEntity.add_2 = newAddEntity.add_2;
			oldAddEntity.addKana_1 = newAddEntity.addKana_1;
			oldAddEntity.addKana_2 = newAddEntity.addKana_2;
			oldAddEntity.faxNum = newAddEntity.faxNum;
			oldAddEntity.phoneNum = newAddEntity.phoneNum;
			oldAddEntity.postCd = newAddEntity.postCd;
			this.commandProxy().update(oldAddEntity);
		} else if (newAddEntity != null) {
			this.commandProxy().insert(newAddEntity);
		} else if (oldAddEntityOpt.isPresent()) {
			this.commandProxy().remove(oldAddEntityOpt.get());
		}
	}

	/**
	 * insert a company
	 * @author yennth
	 */
	@Override
	public void insertCom(Company company) {
		BcmmtCompanyInfor entity = toEntityCom(company);
		this.commandProxy().insert(entity);
	}

	/**
	 * delete a company item 
	 * @author yennth
	 */
	@Override
	public void deleteCom(String companyId, String contractCd, String companyCode) {
		BcmmtCompanyInforPK bcmmtCompanyInforPK = new BcmmtCompanyInforPK(companyId);
		this.commandProxy().remove(BcmmtCompanyInfor.class, bcmmtCompanyInforPK);
	}

	/**
	 * find Address 
	 * @author yennth
	 */
	@Override
	public Optional<AddInfor> findAdd(String companyId) {
		val pk = new BcmmtAddInforPK(companyId);
		return this.queryProxy().find(pk, BcmmtAddInfor.class).map(c -> toDomainAdd(c));
	}

	/**
	 * update address item 
	 * @author yennth
	 */
	@Override
	public void updateAdd(AddInfor addInfor) {
		BcmmtAddInfor entity = toEntityAdd(addInfor);
		BcmmtAddInfor oldEntity = this.queryProxy().find(entity.bcmmtAddInforPK, BcmmtAddInfor.class).get();
		oldEntity.faxNum = entity.faxNum;
		oldEntity.add_1 = entity.add_1;
		oldEntity.add_2 = entity.add_2;
		oldEntity.addKana_1 = entity.addKana_1;
		oldEntity.addKana_2 = entity.addKana_2;
		oldEntity.postCd = entity.postCd;
		oldEntity.phoneNum = entity.phoneNum;
	}

	/**
	 * insert address item 
	 * @author yennth
	 */
	@Override
	public void insertAdd(AddInfor addInfor) {
		BcmmtAddInfor entity = toEntityAdd(addInfor);
		this.commandProxy().insert(entity);
	}

	/**
	 * check list company mustn't be abolished all 
	 * @param currentCompanyId
	 * @return
	 * @author yennth
	 */
	@Override
	public boolean checkAbolish(String currentCompanyId) {
		// get all company
		long totalCompany = this.queryProxy().query(COUNT_ALL, Long.class).getSingle().get();
		// filter by current company and abolish=true -> size 
		long listTrueSize = this.queryProxy().query(COUNT_ABOLISH, Long.class)
				.setParameter("companyId", currentCompanyId).getSingle().get();
		return listTrueSize == totalCompany - 1;
	}

	@Override
	public Optional<Company> getComanyByCid(String cid) {
		BcmmtCompanyInfor entity = this.queryProxy().query(GET_BY_CID, BcmmtCompanyInfor.class)
				.setParameter("cid", cid).getSingleOrNull();

		Company company = new Company();
		if (entity != null) {
			company = toDomainCom(entity);
			return Optional.of(company);

		} else {
			return Optional.empty();
		}
	}

	@Override
	public List<Company> getAllCompanyByContractCd(String contractCd) {
		return this.queryProxy().query(GET_ALL_COMPANY_BY_CONTRACT_CD, BcmmtCompanyInfor.class)
				.setParameter("contractCd", contractCd)
				.getList(c -> toDomainCom(c));
	}

	@Override
	public List<Company> getAllCompanyByContractCdandAboAtr(String contractCd, int isAbolition) {
		return this.forTenantDatasource(contractCd, em ->{
			return this.queryProxy(em).query(GET_ALL_COMPANY_BY_CONTRACTCD_AND_ABOLITIATR, BcmmtCompanyInfor.class)
					.setParameter("contractCd", contractCd)
					.setParameter("isAbolition", isAbolition)
					.getList(c -> toDomainCom(c));	
		});
	}

	@Override
	public Optional<Company> getCompany(String cid) {
		BcmmtCompanyInfor entity = this.queryProxy().query(GET_COMPANY_BY_CID, BcmmtCompanyInfor.class)
				.setParameter("cid", cid).getSingleOrNull();

		Company company = new Company();
		if (entity != null) {
			company = toDomainCom(entity);
			return Optional.of(company);

		} else {
			return Optional.empty();
		}
	}

	@Override
	public List<String> getAllCompanyByContractCdAndAboAtr(String contractCd, int isAbolition) {
		List<String> lstCompanyId = this.queryProxy().query(GET_ALL_COMPANY_BY_CONTRACTCD_AND_ABOATR, String.class)
				.setParameter("contractCd", contractCd)
				.setParameter("isAbolition", isAbolition)
				.getList();
	 return lstCompanyId;
	}
	
	@Override
	public Optional<Company> getComanyNotAbolitionByCid(String cid) {
		Object[] entity = this.queryProxy().query(GET_NOT_ABOLITION_BY_CID, Object[].class)
				.setParameter("cid", cid).getSingleOrNull();

		Company company = new Company();
		
		if (entity != null) {
			
			BcmmtCompanyInfor entityCompany = null;
			
			if(entity.length > 0) {
				
			  entityCompany = (BcmmtCompanyInfor) entity[0];
			  
			}
			
			if(entity.length > 1) {
				
				entityCompany.bcmmtAddInfor = (BcmmtAddInfor) entity[1];
				
			}
			
			company = toDomainCom(entityCompany);
			
			return Optional.of(company);
			

		} else {
			
			return Optional.empty();
			
		}
	}

	@Override
	public Optional<Company> getComanyInfoByCidContractCdAndAboAtr(String cid, String contractCd, int isAbolition) {
		BcmmtCompanyInfor entity = this.queryProxy().query(SELECT_BY_CID_CONTRACTCD_ABOLITIATR, BcmmtCompanyInfor.class)
				.setParameter("cid", cid)
				.setParameter("contractCd", contractCd)
				.setParameter("isAbolition", isAbolition)
				.getSingleOrNull();
		Company company = new Company();
		if (entity != null) {
			company = toDomainCom(entity);
		}
		return Optional.of(company);
	}

	
}

