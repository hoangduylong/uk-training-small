package nts.uk.ctx.bs.employee.infra.entity.temporaryabsence;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsenceHisItem;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameNo;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.state.GenericString;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;


@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "BSYMT_TEMP_ABS_HIST_ITEM")
public class BsymtTempAbsHistItem extends ContractUkJpaEntity implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Basic(optional = false)
	@Id
	@Column(name = "HIST_ID")
	public String histId;

	@Basic(optional = false)
	@Column(name = "SID")
	public String sid;
	
	@Basic(optional = false)
	@Column(name = "TEMP_ABS_FRAME_NO")
	public int tempAbsFrameNo;

	@Basic(optional = true)
	@Column(name = "REMARKS")
	public String remarks;
	
	@Basic(optional = true)
	@Column(name = "SO_INS_PAY_CATEGORY")
	public Integer soInsPayCategory;
	
	// -------------- extend object ----------------------
	
	@Basic(optional = true)
	@Column(name = "MULTIPLE")
	public Integer multiple;

	@Basic(optional = true)
	@Column(name = "FAMILY_MEMBER_ID")
	public String familyMemberId;
	
	@Basic(optional = true)
	@Column(name = "SAME_FAMILY")
	public Integer sameFamily;
	
	@Basic(optional = true)
	@Column(name = "CHILD_TYPE")
	public Integer childType;

	@Basic(optional = true)
	@Column(name = "CREATE_DATE")
	public GeneralDate createDate;

	@Basic(optional = true)
	@Column(name = "SPOUSE_IS_LEAVE")
	public Integer spouseIsLeave;
	
	@Basic(optional = true)
	@Column(name = "SAME_FAMILY_DAYS")
	public Integer sameFamilyDays;
	
	@Override
	protected Object getKey() {
		return histId;
	}
	/**
	 * createLeave
	 * createSickLeave
	 * createAnyLeave
	 * @param historyId
	 * @param employeeId
	 * @param remarks
	 * @param soInsPayCategory
	 */
	public BsymtTempAbsHistItem (String historyId, String employeeId, int tempAbsFrameNo, String remarks,
			Integer soInsPayCategory) {
		this.histId = historyId;
		this.sid = employeeId;
		this.tempAbsFrameNo = tempAbsFrameNo;
		this.remarks = remarks;
		this.soInsPayCategory = soInsPayCategory;
	}
	/**
	 * createMidweekClosure
	 * @param historyId
	 * @param employeeId
	 * @param remarks
	 * @param soInsPayCategory
	 * @param multiple
	 */
	public BsymtTempAbsHistItem (String historyId, String employeeId, int tempAbsFrameNo, String remarks,
			Integer soInsPayCategory, Boolean multiple) {
		this.histId = historyId;
		this.sid = employeeId;
		this.tempAbsFrameNo = tempAbsFrameNo;
		this.remarks = remarks;
		this.soInsPayCategory = soInsPayCategory;
		if (multiple != null){
			this.multiple = multiple ? 1: 0;
		}
	}
	/**
	 * createAfterChildbirth
	 * @param historyId
	 * @param employeeId
	 * @param remarks
	 * @param soInsPayCategory
	 * @param familyMemberId
	 */
	public BsymtTempAbsHistItem (String historyId, String employeeId, int tempAbsFrameNo, String remarks,
			Integer soInsPayCategory, String familyMemberId) {
		this.histId = historyId;
		this.sid = employeeId;
		this.tempAbsFrameNo = tempAbsFrameNo;
		this.remarks = remarks;
		this.soInsPayCategory = soInsPayCategory;
		this.familyMemberId = familyMemberId;
	}
	/**
	 * createChildCareHoliday
	 * @param historyId
	 * @param employeeId
	 * @param remarks
	 * @param soInsPayCategory
	 * @param sameFamily
	 * @param childType
	 * @param familyMemberId
	 * @param createDate
	 * @param spouseIsLeave
	 */
	public BsymtTempAbsHistItem (String historyId, String employeeId, int tempAbsFrameNo, String remarks,
			Integer soInsPayCategory, Boolean sameFamily, Integer childType, String familyMemberId,
			GeneralDate createDate, Boolean spouseIsLeave) {
		this.histId = historyId;
		this.sid = employeeId;
		this.tempAbsFrameNo = tempAbsFrameNo;
		this.remarks = remarks;
		this.soInsPayCategory = soInsPayCategory;
		if (sameFamily != null){
			this.sameFamily = sameFamily ? 1: 0;
		}
		this.childType = childType;
		this.familyMemberId = familyMemberId;
		this.createDate = createDate;
		if (spouseIsLeave != null){
			this.spouseIsLeave = spouseIsLeave ? 1 : 0;
		}
	}
	/**
	 * createCareHoliday
	 * @param historyId
	 * @param employeeId
	 * @param remarks
	 * @param soInsPayCategory
	 * @param sameFamily
	 * @param sameFamilyDays
	 * @param familyMemberId
	 */
	public BsymtTempAbsHistItem (String historyId, String employeeId, int tempAbsFrameNo, String remarks,
			Integer soInsPayCategory, Boolean sameFamily, Integer sameFamilyDays, String familyMemberId) {
		this.histId = historyId;
		this.sid = employeeId;
		this.tempAbsFrameNo = tempAbsFrameNo;
		this.remarks = remarks;
		if (soInsPayCategory != null){
			this.soInsPayCategory = soInsPayCategory;
		}
		if (sameFamily != null){
			this.sameFamily = sameFamily ? 1: 0;
		}
		this.familyMemberId = familyMemberId;
		this.sameFamilyDays = sameFamilyDays;
	}
	
	public static BsymtTempAbsHistItem toEntity (TempAbsenceHisItem dom){

		BsymtTempAbsHistItem entity = new BsymtTempAbsHistItem(
				dom.getHistoryId(),
				dom.getEmployeeId(), 
				dom.getTempAbsenceFrNo().v().intValue(), 
				dom.getRemarks().v(), 
				dom.getSoInsPayCategory().intValue(),
				dom.getFamilyMemberId());
		
				return entity;
	
	}
	public static TempAbsenceHisItem toDomainHistItem(BsymtTempAbsHistItem entity){
		TempAbsenceHisItem data = new TempAbsenceHisItem(
				new TempAbsenceFrameNo(BigDecimal.valueOf(entity.tempAbsFrameNo)),
				entity.histId,
				entity.sid, 
			    new GenericString(entity.remarks)	,
			    entity.soInsPayCategory == null ? null : entity.soInsPayCategory.intValue(),
				entity.familyMemberId);
		return data;
	}
}
