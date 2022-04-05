//package nts.uk.ctx.bs.company.dom.company;
//
//import java.math.BigDecimal;
//import java.util.List;
//
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import nts.arc.enums.EnumAdaptor;
//import nts.arc.error.BusinessException;
//import nts.arc.layer.dom.AggregateRoot;
//import nts.uk.ctx.bs.company.dom.company.primitive.ABName;
//import nts.uk.ctx.bs.company.dom.company.primitive.ContractCd;
//import nts.uk.ctx.bs.company.dom.company.primitive.KNName;
//import nts.uk.ctx.bs.company.dom.company.primitive.RepJob;
//import nts.uk.ctx.bs.company.dom.company.primitive.RepName;
//import nts.uk.ctx.bs.company.dom.company.primitive.TaxNo;
//
//
//@Getter
//@AllArgsConstructor
//@NoArgsConstructor
//public class CompanyInforNew extends AggregateRoot {
//	/** The company code. */
//	// 会社コード
//	private CCD companyCode;
//
//	/** The company code. */
//	// 会社名
//	private Name companyName;
//
//	/** The company id. */
//	// 会社ID
//	private String companyId;
//
//	/** The start month. */
//	// 期首月
//	private MonthStr startMonth;
//
//	/** The Abolition */
//	// 廃止区分
//	private AbolitionAtr isAbolition;
//
//	/** 代表者名 */
//	private RepName repname;
//
//	/** 代表者職位 */
//	private RepJob repjob;
//
//	/** 会社名カナ */
//	private KNName comNameKana;
//
//	/** 会社略名 */
//	private ABName shortComName;
//
//	/** 契約コード */
//	private ContractCd contractCd;
//
//	/** 法人マイナンバー */
//	private TaxNo taxNo;
//
//	private AddInfor addInfor;
//
//	public CompanyInforNew(CCD companyCode, Name companyName, MonthStr startMonth, AbolitionAtr isAbolition,
//			RepName repname, RepJob repjob, KNName comNameKana, ABName shortComName, ContractCd contractCd, TaxNo taxNo,
//			AddInfor addInfor) {
//		super();
//		this.companyCode = companyCode;
//		this.companyName = companyName;
//		this.startMonth = startMonth;
//		this.isAbolition = isAbolition;
//		this.repname = repname;
//		this.repjob = repjob;
//		this.comNameKana = comNameKana;
//		this.shortComName = shortComName;
//		this.contractCd = contractCd;
//		this.taxNo = taxNo;
//		this.addInfor = addInfor;
//		this.companyId = createCompanyId(this.companyCode.v(), this.contractCd.v());
//	}
//	
//	public static CompanyInforNew createFromJavaType(String companyCode, String companyName, int startMonth,
//			int isAbolition, String repname, String repjob, String comNameKana, String shortComName, String contractCd,
//			BigDecimal taxNo, AddInfor addInfor) {
//		return new CompanyInforNew(new CCD(companyCode), new Name(companyName),
//				EnumAdaptor.valueOf(startMonth, MonthStr.class),
//				EnumAdaptor.valueOf(isAbolition, AbolitionAtr.class), new RepName(repname), new RepJob(repjob),
//				new KNName(comNameKana), new ABName(shortComName), new ContractCd(contractCd), new TaxNo(taxNo),
//				addInfor);
//	}
//
//	public static String createCompanyId(String companyCode, String contractCd) {
//		return contractCd + "-" + companyCode;
//	}
//
//	@Override
//	public void validate() {
//		super.validate();
//		// company code: 0000
//		if("0000".equals(this.companyCode.v())){
//			throw new BusinessException("Msg_809");
//		}
//	}
//	/** check number company discarded, can't discard all list company */
//	public void checkAbolition(Boolean check){
//		if(check){ 
//			throw new BusinessException("Msg_810");
//		}		
//	}
//	/** if company be discarded: true-1: be discarded, false-0: be not discarded*/
//	public boolean isAbolition() {
//		return AbolitionAtr.ABOLITION == this.isAbolition;
//	}
//
//}
