package nts.uk.ctx.bs.employee.infra.entity.temporaryabsence;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsenceHistory;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@Entity
@Table(name = "BSYMT_TEMP_ABS_HIST")
@Getter
public class BsymtTempAbsHist extends ContractUkJpaEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "HIST_ID")
	public String histId;

	@Column(name = "CID")
	public String cid;

	@Column(name = "SID")
	public String sid;

	@Column(name = "START_DATE")
	public GeneralDate startDate;

	@Column(name = "END_DATE")
	public GeneralDate endDate;

	@Override
	protected Object getKey() {
		return this.histId;
	}

	public BsymtTempAbsHist() {
		super();
	}

	public BsymtTempAbsHist(String histId, String cid, String sid, GeneralDate startDate, GeneralDate endDate) {
		super();
		this.histId = histId;
		this.cid = cid;
		this.sid = sid;
		this.startDate = startDate;
		this.endDate = endDate;
	}
     
	public static List<BsymtTempAbsHist> toEntity(TempAbsenceHistory dom){
		List<BsymtTempAbsHist> listEntity = new ArrayList<>();
		List<DateHistoryItem> listDate = dom.getDateHistoryItems();
		listDate.stream().forEach( x ->{
			BsymtTempAbsHist data = new BsymtTempAbsHist(
					x.identifier(),
					dom.getCompanyId(),
					dom.getEmployeeId(),
					x.span().start(),
					x.span().end());
			listEntity.add(data);
		});	
		return listEntity;
	}
	
	public static Optional<TempAbsenceHistory> toDomainHis(List<BsymtTempAbsHist> lstEntity){
		if(lstEntity.isEmpty()){
			return Optional.empty();
		}
		List<DateHistoryItem> lstDateHis = lstEntity.stream().map(c-> new DateHistoryItem(c.getHistId(), new DatePeriod(c.getStartDate(),c.getEndDate()))).collect(Collectors.toList()); 
		TempAbsenceHistory dom = new TempAbsenceHistory(
				lstEntity.get(0).getCid(),
				lstEntity.get(0).getSid(),
				lstDateHis);
		return Optional.of(dom);
	}
	
}
