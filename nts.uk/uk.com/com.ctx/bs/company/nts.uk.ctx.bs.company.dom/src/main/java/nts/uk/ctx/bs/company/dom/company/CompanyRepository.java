/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.company.dom.company;

import java.util.List;
import java.util.Optional;

/**
 * The Interface CompanyRepository.
 */

public interface CompanyRepository {
		
	/**
	 * Find all company with isAbolition=0
	 * @return
	 */
	List<Company>  getAllCompany(String contractCd);
	
	/** 
	 * get all company from database
	 * @author: Hoang Yen
	 */
	List<Company> findAll(String contractCd);
	
	/** 
	 * get all company by listCid and contractcode
	 * @author: tutk
	 */
	List<Company> findAllByListCid(String contractCd,List<String> companyIds);
	
	/**
	 * find a company infor item by code 
	 * @param contractCd
	 * @param companyId
	 * @param companyCd
	 * @author: Hoang Yen
	 * @return
	 */
	Optional<Company> find(String companyId);
	
	/**
	 * get address
	 * @param companyId
	 * @return
	 * @author Hoang Yen
	 */
	Optional<AddInfor> findAdd(String companyId);
	
	/** 
	 * update a company
	 * @author: Hoang Yen
	 */
	void updateCom(Company company);
	
	/**
	 * update add infor
	 * @param addInfor
	 * @author: Hoang Yen
	 */
	void updateAdd(AddInfor addInfor);
	
	/** 
	 * insert a company 
	 * @author: Hoang Yen
	 */
	void insertCom(Company company);

	/**
	 * insert Address information company
	 * @param addInfor
	 * @author: Hoang Yen
	 */
	void insertAdd(AddInfor addInfor);
	
	/**
	 * delete a company item
	 * @param comId
	 * @param contractCd
	 * @param companyCode
	 * @author: Hoang Yen
	 */
	void deleteCom(String comId, String contractCd, String companyCode);
	
	/**
	 * RequestList #108.
	 *
	 * @param companyId the company id
	 * @return the comany
	 */
	Optional<Company> getComanyInfoByCid(String cid);
	
	/**
	 * check list company mustn't be abolished all 
	 * @param currentCompanyId
	 * @return
	 * @author yennth
	 */
	boolean checkAbolish(String currentCompanyId);
	
	// request list No.125
	Optional<Company> getComanyByCid(String cid);
	
	/**
	 * For request list No.289
	 * @param contractCd
	 * @return
	 */
	List<Company> getAllCompanyByContractCd(String contractCd);
	
	List<Company> getAllCompanyByContractCdandAboAtr(String contractCd, int isAbolition);
	
	List<String> getAllCompanyByContractCdAndAboAtr(String contractCd, int isAbolition);
	
	
	Optional<Company> getCompany(String cid);
	
	Optional<Company> getComanyNotAbolitionByCid(String cid);
	
	Optional<Company> getComanyInfoByCidContractCdAndAboAtr(String cid,String contractCd, int isAbolition);
}

