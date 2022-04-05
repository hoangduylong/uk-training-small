package nts.uk.shr.sample.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;

@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class SampleDataPK {
	
	@Column(name = "DATE")
	public GeneralDate date;
	
	@Column(name = "SID")
	public String sId;
}
