/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.ac.find.login;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.company.pub.company.CompanyExport;
import nts.uk.ctx.bs.company.pub.company.ICompanyPub;
import nts.uk.ctx.sys.shared.dom.company.CompanyInforImport;
import nts.uk.ctx.sys.shared.dom.company.CompanyInformationAdapter;
import nts.uk.ctx.sys.shared.dom.company.CompanyInformationImport;

/**
 * The Class CompanyInformationAdapterImpl.
 */
@Stateless
public class CompanyInformationAdapterImpl implements CompanyInformationAdapter {

	@Inject
	private ICompanyPub iCompanyPub;

	@Override
	public String createCompanyId(String tenantCode, String companyCode) {
		return iCompanyPub.createCompanyId(companyCode, tenantCode);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.gateway.dom.adapter.CompanyInformationAdapter#
	 * findByContractCode(java.lang.String)
	 */
	@Override
	public List<CompanyInformationImport> findLstCompany(String contractCode) {
//		【条件】
//		　「会社情報.廃止区分」＝廃止しない
//		　　契約CD　＝　LocalStorage.契約CD
		List<CompanyExport> lstReciveCompany = iCompanyPub.getLstComByContractAbo(contractCode, 0);
		return lstReciveCompany.stream().map(c -> new CompanyInformationImport(
				c.getCompanyId(), 
				c.getCompanyCode(), 
				c.getCompanyName())).collect(Collectors.toList());
	}
	
	@Override
	public List<CompanyInformationImport> findByContract(String contractCode) {
		List<CompanyExport> lstReciveCompany = iCompanyPub.getAllCompanyByContract(contractCode);

		List<CompanyInformationImport> lstCompany = new ArrayList<>();
		lstReciveCompany.stream().map(c -> {
			return lstCompany.add(new CompanyInformationImport(c.getCompanyId(), c.getCompanyCode(), c.getCompanyName()));
		}).collect(Collectors.toList());
		return lstCompany;
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.login.adapter.CompanyInformationAdapter#findById(java.lang.String)
	 */
	@Override
	public CompanyInformationImport findById(String companyId) {

		CompanyExport companyExport = iCompanyPub.getCompanyByCid(companyId);
		
		CompanyInformationImport companyInformationImport = new CompanyInformationImport(companyExport.getCompanyId(),
				companyExport.getCompanyCode(), companyExport.getCompanyName());
		return companyInformationImport;
	}
	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.login.adapter.CompanyInformationAdapter#findComById(java.lang.String)
	 */
	@Override
	public CompanyInforImport findComById(String companyId) {

		CompanyExport companyExport = iCompanyPub.getCompany(companyId);
		
		return new CompanyInforImport(companyExport.getCompanyId(),
				companyExport.getCompanyCode(), companyExport.getCompanyName(), companyExport.getIsAbolition());
	}
}
