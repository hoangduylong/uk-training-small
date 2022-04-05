package nts.uk.ctx.bs.employee.dom.workplace.group.domainservice;

import static org.assertj.core.api.Assertions.*;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.Test;

import lombok.val;
import nts.arc.testing.assertion.NtsAssert;
import nts.uk.ctx.bs.employee.dom.employee.service.EmployeeReferenceRangeImport;

public class ScopeReferWorkplaceGroupTest {

	@Test
	public void getters() {
		ScopeReferWorkplaceGroup data = ScopeReferWorkplaceGroup.of(0);
		NtsAssert.invokeGetters(data);
	}

	/**
	 * Target	: of
	 */
	@Test
	public void testOf() {

		// Assertion
		assertThat( ScopeReferWorkplaceGroup.of(0) ).isEqualTo( ScopeReferWorkplaceGroup.ALL_EMPLOYEE );
		assertThat( ScopeReferWorkplaceGroup.of(1) ).isEqualTo( ScopeReferWorkplaceGroup.ONLY_ME );

	}

	/**
	 * Target	: 参照範囲を判定する
	 */
	@Test
	public void testDetermineTheReferenceRange() {

		// Execute
		val result = Stream.of( EmployeeReferenceRangeImport.values() )
						.collect(Collectors.toMap(
								e -> e
							,	e -> ScopeReferWorkplaceGroup.determineTheReferenceRange( e )
						));

		// Assertion
		assertThat( result.get( EmployeeReferenceRangeImport.ONLY_MYSELF ) )
			.isEqualTo( ScopeReferWorkplaceGroup.ONLY_ME );

		assertThat( result.entrySet() )
			.filteredOn( e -> e.getKey() != EmployeeReferenceRangeImport.ONLY_MYSELF )
			.extracting( e -> e.getValue() )
			.containsOnly( ScopeReferWorkplaceGroup.ALL_EMPLOYEE );

	}
}
