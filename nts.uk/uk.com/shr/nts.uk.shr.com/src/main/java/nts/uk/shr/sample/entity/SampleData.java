package nts.uk.shr.sample.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;



@Entity
@Table(name = "SAMPLE_DATA")
@AllArgsConstructor
@NoArgsConstructor
public class SampleData extends ContractUkJpaEntity {
	
	@EmbeddedId
	public SampleDataPK pk;
	
//	@Column(name = "DATE")
//	public GeneralDate date;
//	
//	@Column(name = "SID")
//	public String sId;
	
	@Column(name = "DATA1")
	public String data1;
	
	@Column(name = "DATA2")
	public String data2;
	
	@Override
	protected Object getKey() {
		// TODO 自動生成されたメソッド・スタブ
		return pk;
	}
	
	public static SampleData fromDomain() {
		return new SampleData(
				new SampleDataPK(
				GeneralDate.today(), 
				AppContexts.user().employeeId()), 
				"Data1", 
				"Data2");
	}

}
