package nts.uk.ctx.bs.employee.infra.repository.jobtitle.approver;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;

import org.apache.logging.log4j.util.Strings;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsResultSet;
import nts.uk.ctx.bs.employee.dom.jobtitle.approver.ApproverGInfo;
import nts.uk.ctx.bs.employee.dom.jobtitle.approver.ApproverGroup;
import nts.uk.ctx.bs.employee.dom.jobtitle.approver.ApproverGroupRepository;
import nts.uk.ctx.bs.employee.dom.jobtitle.approver.ApproverJob;
import nts.uk.ctx.bs.employee.dom.jobtitle.approver.ApproverName;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleCode;
import nts.uk.ctx.bs.employee.infra.entity.jobtitle.approver.BsympApproverGroup;
import nts.uk.ctx.bs.employee.infra.entity.jobtitle.approver.BsymtApproverGroup;

@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class JpaApproverGroupRepository extends JpaRepository implements ApproverGroupRepository {
	
	private static final String FIND_ALL;
	
	private static final String FIND_BY_CODE;
	
	static {
		StringBuilder builderString = new StringBuilder();
		builderString = new StringBuilder();
		builderString.append("SELECT * FROM BSYMT_APPROVER_GROUP a LEFT JOIN BSYMT_APPROVER_G_LIST_JOB b ");
		builderString.append("on a.CID = b.CID and a.APPROVER_G_CD = b.APPROVER_G_CD ");
		builderString.append("where a.CID = 'companyID'");
		FIND_ALL = builderString.toString();
		
		builderString = new StringBuilder();
		builderString.append("SELECT * FROM BSYMT_APPROVER_GROUP a LEFT JOIN BSYMT_APPROVER_G_LIST_JOB b ");
		builderString.append("on a.CID = b.CID and a.APPROVER_G_CD = b.APPROVER_G_CD ");
		builderString.append("where a.CID = 'companyID' AND a.APPROVER_G_CD = 'approverGCD'");
		FIND_BY_CODE = builderString.toString();
	}
	
	private static final String GET_ALL = "SELECT c FROM BsymtApproverGroup c"
			+ " WHERE c.pk.companyID = :companyID"
			+ " ORDER BY c.pk.approverGroupCD ASC";
	private static final String FIND_BY_CD = "SELECT c FROM BsymtApproverGroup c"
			+ " WHERE c.pk.companyID = :companyID"
			+ " AND c.pk.approverGroupCD IN :jobGCd";
	
	@AllArgsConstructor
	@Getter
	private class FullJoin {
	    private String companyID;
	    private String approverGroupCD;
	    private String approverGroupName;
	    private String jobID;
	    private Integer order;
	}
	
	private List<FullJoin> createFullJoin(NtsResultSet rs){
		return 	rs
				.getList(x -> {
					return new FullJoin(
							x.getString("CID"), 
							x.getString("APPROVER_G_CD"), 
							x.getString("APPROVER_G_NAME"), 
							x.getString("JOB_ID"),
							x.getInt("DISPLAY_ORDER"));
				});
	}
	
	private List<ApproverGroup> toDomain(List<FullJoin> listFullJoin) {
		return listFullJoin.stream().collect(Collectors.groupingBy(FullJoin::getApproverGroupCD))
			.entrySet().stream().map(x -> {
				List<ApproverJob> approverLst = x.getValue().stream()
						.filter(y -> Strings.isNotBlank(y.getJobID()))
						.map(y -> new ApproverJob(y.getJobID(), y.getOrder()))
						.sorted(Comparator.comparing(ApproverJob::getOrder))
						.collect(Collectors.toList());
				return new ApproverGroup(
						x.getValue().get(0).getCompanyID(), 
						new JobTitleCode(x.getValue().get(0).getApproverGroupCD()), 
						new ApproverName(x.getValue().get(0).getApproverGroupName()), 
						approverLst);
			})
			.sorted(Comparator.comparing(ApproverGroup::getApproverGroupCD))
			.collect(Collectors.toList());
	}

	@Override
	public List<ApproverGroup> findAll(String companyID) {
		String sql = FIND_ALL.replace("companyID", companyID);
		try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
			
			return toDomain(createFullJoin(new NtsResultSet(stmt.executeQuery())));
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public void insert(ApproverGroup approverGroup) {
		commandProxy().insert(BsymtApproverGroup.fromDomain(approverGroup));
	}

	@Override
	public void update(ApproverGroup approverGroup) {
		commandProxy().update(BsymtApproverGroup.fromDomain(approverGroup));
	}

	@Override
	public void delete(ApproverGroup approverGroup) {
		commandProxy().remove(BsymtApproverGroup.class, new BsympApproverGroup(approverGroup.getCompanyID(), approverGroup.getApproverGroupCD().v()));
	}

	@Override
	public List<ApproverGInfo> getAll(String companyID) {
		return this.queryProxy().query(GET_ALL, BsymtApproverGroup.class)
				.setParameter("companyID", companyID)
				.getList(c -> new ApproverGInfo(c.getPk().getApproverGroupCD(), c.getApproverGroupName()));
	}

	@Override
	public List<ApproverGInfo> findByCd(String companyID, List<String> jobGCd) {
		if(jobGCd.isEmpty()) return new ArrayList<>();
		return this.queryProxy().query(FIND_BY_CD, BsymtApproverGroup.class)
				.setParameter("companyID", companyID)
				.setParameter("jobGCd", jobGCd)
				.getList(c -> new ApproverGInfo(c.getPk().getApproverGroupCD(), c.getApproverGroupName()));
	}

	@Override
	public void insertAll(List<ApproverGroup> approverGroupLst) {
		commandProxy().insertAll(approverGroupLst.stream().map(x -> BsymtApproverGroup.fromDomain(x)).collect(Collectors.toList()));
	}

	@Override
	public Optional<ApproverGroup> findByCode(String companyID, String approverGroupCD) {
		
		String sql = FIND_BY_CODE.replace("companyID", companyID).replace("approverGCD", approverGroupCD);
		try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
			
			List<ApproverGroup> approverGroupLst = toDomain(createFullJoin(new NtsResultSet(stmt.executeQuery())));
			if(approverGroupLst.isEmpty()) {
				return Optional.empty();
			} else {
				return Optional.of(approverGroupLst.get(0));
			}
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}

}
