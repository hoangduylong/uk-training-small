package nts.uk.ctx.sys.auth.infra.entity.wplmanagementauthority;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.NoArgsConstructor;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.DailyPerformanceFunctionNo;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.FeatureDescriptionOfDailyPerformance;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.FeatureNameOfDailyPerformance;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceFunction;
import nts.uk.shr.infra.data.entity.UkJpaEntity;


@NoArgsConstructor
@Entity
@Table(name = "SACCT_WKP_FUNCTION")
public class SacctWkpFunction extends UkJpaEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "FUNCTION_NO")
	public int functionNo;
	
	@Column(name = "INITIAL_VALUE")
	public boolean initialValue;
	
	@Column(name = "DISPLAY_NAME")
	public String displayName;
	
	@Column(name = "DISPLAY_ORDER")
	public int displayOrder;
	
	@Column(name = "DESCRIPTION")
	public String description;

	@Override
	protected Object getKey() {
		return this.functionNo;
	}

	public SacctWkpFunction(int functionNo, boolean initialValue, String displayName, int displayOrder,
			String description) {
		super();
		this.functionNo = functionNo;
		this.initialValue = initialValue;
		this.displayName = displayName;
		this.displayOrder = displayOrder;
		this.description = description;
	}
	
	public static SacctWkpFunction toEntity(WorkPlaceFunction domain) {
		return new SacctWkpFunction(
					Integer.parseInt(domain.getFunctionNo().toString()),
					domain.isInitialValue(),
					domain.getDisplayName().v(),
					domain.getDisplayOrder(),
					domain.getDescription().v()
				);
	}
	
	public WorkPlaceFunction toDomain() {
		return new WorkPlaceFunction(
				new DailyPerformanceFunctionNo(this.functionNo),
				this.initialValue,
				new FeatureNameOfDailyPerformance(this.displayName),
				this.displayOrder,
				new FeatureDescriptionOfDailyPerformance(this.description)
				);
		
	}
}
