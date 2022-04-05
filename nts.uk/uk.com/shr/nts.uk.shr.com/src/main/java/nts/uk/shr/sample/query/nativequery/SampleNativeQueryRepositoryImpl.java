package nts.uk.shr.sample.query.nativequery;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;

@Stateless
public class SampleNativeQueryRepositoryImpl extends JpaRepository{

	public void test() {
		Object obj = this.getEntityManager().createNativeQuery(
				"select e.SCD, p.PERSON_NAME" +
				" from BSYMT_EMPLOYEE e inner join BPSMT_PERSON p on e.PID = p.PID" +
				" where e.SCD = '000000000005'",
				SampleNativeQueryResult.class).getSingleResult();
		
		obj.toString();
	}
}
