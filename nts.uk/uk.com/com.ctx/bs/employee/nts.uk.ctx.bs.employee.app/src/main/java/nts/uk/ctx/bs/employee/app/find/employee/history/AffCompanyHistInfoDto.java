package nts.uk.ctx.bs.employee.app.find.employee.history;

import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHist;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistByEmployee;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistItem;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyInfo;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.find.dto.PeregDomainDto;

@Setter
@NoArgsConstructor
public class AffCompanyHistInfoDto extends PeregDomainDto {
	@PeregItem("IS00020")
	private GeneralDate jobEntryDate;

	@PeregItem("IS00021")
	private GeneralDate retirementDate;

	@PeregItem("IS00022")
	private GeneralDate adoptionDate;

	@PeregItem("IS00023")
	private String recruitmentClassification;

	@PeregItem("IS00024")
	private GeneralDate retirementAllowanceCalcStartDate;

	public AffCompanyHistInfoDto(String recordId, GeneralDate jobEntryDate, GeneralDate retirementDate,
			GeneralDate adoptionDate, String recruitmentClassification, GeneralDate retirementAllowanceCalcStartDate, boolean isCps013) {
		super(recordId);
		this.jobEntryDate = jobEntryDate;
		if(isCps013 == true) {
			this.retirementDate = retirementDate;
		}else {
			this.retirementDate = retirementDate.equals(GeneralDate.max())?null:retirementDate;
		}
		
		this.adoptionDate = adoptionDate;
		this.recruitmentClassification = recruitmentClassification;
		this.retirementAllowanceCalcStartDate = retirementAllowanceCalcStartDate;
	}

	public static AffCompanyHistInfoDto fromDomain(AffCompanyHist domain, AffCompanyInfo info) {
		if (domain == null || info == null) {
			return null;
		}

		AffCompanyHistByEmployee empHist = domain.getLstAffCompanyHistByEmployee().get(0);

		if (empHist == null) {
			return null;
		}

		AffCompanyHistItem histItem = empHist.getLstAffCompanyHistoryItem().get(0);

		if (histItem == null) {
			return null;
		}

		return new AffCompanyHistInfoDto(histItem.getHistoryId(), histItem.getDatePeriod().start(),
				histItem.getDatePeriod().end(), info.getAdoptionDate(), info.getRecruitmentClassification().v(),
				info.getRetirementAllowanceCalcStartDate(), false);
	}
	
	public static AffCompanyHistInfoDto fromDomain(AffCompanyHistItem histItem, AffCompanyInfo info) {
		if (histItem == null) {
			return null;
		}

		return new AffCompanyHistInfoDto(histItem.getHistoryId(), histItem.getDatePeriod().start(),
				histItem.getDatePeriod().end(), info.getAdoptionDate(), info.getRecruitmentClassification().v(),
				info.getRetirementAllowanceCalcStartDate(), false);
	}

	public static PeregDomainDto fromDomainForCPS013(AffCompanyHistItem histItem,
			AffCompanyInfo info) {
		if (histItem == null) {
			return null;
		}

		return new AffCompanyHistInfoDto(histItem.getHistoryId(), histItem.getDatePeriod().start(),
				histItem.getDatePeriod().end() == null ? GeneralDate.max() : histItem.getDatePeriod().end(), info.getAdoptionDate(), info.getRecruitmentClassification().v(),
				info.getRetirementAllowanceCalcStartDate(), true);
	}
}
