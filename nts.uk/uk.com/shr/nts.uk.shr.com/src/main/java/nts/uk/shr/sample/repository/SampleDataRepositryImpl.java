package nts.uk.shr.sample.repository;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.shr.sample.entity.SampleData;

@Stateless
public class SampleDataRepositryImpl extends JpaRepository {
	
	private static final String CONTRACT_CD = "";
	
	public void add() {
		commandProxy().insert(SampleData.fromDomain());
	}
	
}
