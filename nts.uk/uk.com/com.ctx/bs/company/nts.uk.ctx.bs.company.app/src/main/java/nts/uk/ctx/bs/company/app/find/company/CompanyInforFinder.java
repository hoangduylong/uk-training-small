package nts.uk.ctx.bs.company.app.find.company;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
/**
 * find company information
 * @author yennth
 *
 */
import javax.inject.Inject;

import nts.uk.ctx.bs.company.dom.company.AddInfor;
import nts.uk.ctx.bs.company.dom.company.CompanyRepository;
import nts.uk.shr.com.context.AppContexts;
@Stateless
public class CompanyInforFinder {
	@Inject 
	private CompanyRepository comRep;
	
	/**
	 * convert from address domain to dto
	 * @param add
	 * @return
	 * author Hoang Yen
	 */
	private AddInforDto fromDomainAdd(Optional<AddInfor> add){
		AddInforDto adddto = new AddInforDto();
		if(!add.isPresent()){
			return null;
		}
		adddto.setCompanyId(add.get().getCompanyId());
		adddto.setFaxNum(add.get().getFaxNum().v());
		adddto.setAdd_1(add.get().getAdd_1().v());
		adddto.setAdd_2(add.get().getAdd_2().v());
		adddto.setAddKana_1(add.get().getAddKana_1().v());
		adddto.setAddKana_2(add.get().getAddKana_2().v());
		adddto.setPostCd(add.get().getPostCd() != null ? add.get().getPostCd().v() : "");
		adddto.setPhoneNum(add.get().getPhoneNum().v());
		return adddto;
	}
	
	/**
	 * find all company infor
	 * @return
	 * author: Hoang Yen
	 */
	public List<CompanyInforDto> findAll(){
		String contractCd = AppContexts.user().contractCode();
		return this.comRep.findAll(contractCd)
							.stream()
							.map(x -> {
								return new CompanyInforDto( x.getCompanyCode().v(),
																				   x.getCompanyName().v(),
																				   x.getCompanyId(),
																				   x.getStartMonth().value,
																				   x.getIsAbolition().value,
																				   x.getRepname().isPresent() ? x.getRepname().get().v() : null,
																				   x.getRepjob().isPresent() ? x.getRepjob().get().v() : null,
																				   x.getComNameKana().get().v(),
																				   x.getShortComName().get().v(),
																				   contractCd, 
																				   x.getTaxNo().isPresent() ? x.getTaxNo().get().v() : null,
																				   fromDomainAdd(x.getAddInfor()));
							}).collect(Collectors.toList());
	}
	
	/**
	 * Find company information by company id
	 * @param companyId company id
	 * @return company information
	 */
	public CompanyInforDto find(String companyId){
		return this.comRep.find(companyId).map(x -> {
			return new CompanyInforDto( x.getCompanyCode().v(), x.getCompanyName().v(),
					x.getCompanyId(), x.getStartMonth().value,
					x.getIsAbolition().value,
					x.getRepname().isPresent() ? x.getRepname().get().v() : null,
					x.getRepjob().isPresent() ? x.getRepjob().get().v() : null, 
					x.getComNameKana().isPresent( )? x.getComNameKana().get().v():null,
					x.getShortComName().isPresent() ? x.getShortComName().get().v() : null, 
					x.getContractCd().v(), 
					x.getTaxNo().isPresent() ? x.getTaxNo().get().v() : null, 
					fromDomainAdd(x.getAddInfor()));
		}).orElse(null);
	}
}
