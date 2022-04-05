package nts.uk.shr.sample.query.nativequery;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class SampleNativeQueryResult {

	@Id
	@Column(name = "SCD")
	public String employeeCode;
	
	@Column(name = "PERSON_NAME")
	public String name;
	
}
