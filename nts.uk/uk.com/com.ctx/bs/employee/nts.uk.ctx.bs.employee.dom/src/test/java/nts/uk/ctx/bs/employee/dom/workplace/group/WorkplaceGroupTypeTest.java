package nts.uk.ctx.bs.employee.dom.workplace.group;

import static org.assertj.core.api.Assertions.*;

import java.util.HashMap;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.Test;

import lombok.val;

/**
 * Test for WorkplaceGroupType
 * @author kumiko_otake
 */
public class WorkplaceGroupTypeTest {

	/**
	 * Target	: isNeedHospitalOrBusinessOfficeInfo
	 */
	@Test
	public void test_isNeedHospitalOrBusinessOfficeInfo() {

		// 期待値
		@SuppressWarnings("serial")
		val expected = new HashMap<WorkplaceGroupType, Boolean>()
		{{
			put( WorkplaceGroupType.NORMAL,			false );	// 通常: false
			put( WorkplaceGroupType.MEDICAL_CARE,	true );		// 医療(病棟): true
			put( WorkplaceGroupType.CARE_OFFICE,	true );		// 介護事業所: true
		}};


		// 実行
		val result = Stream.of( WorkplaceGroupType.values() )
			.collect(Collectors.toMap( e -> e , WorkplaceGroupType::isNeedHospitalOrBusinessOfficeInfo));


		// 検証
		assertThat( result ).containsExactlyInAnyOrderEntriesOf( expected );

	}

}
