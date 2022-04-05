package nts.uk.ctx.bs.company.dom.company;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;

import mockit.Expectations;
import mockit.Injectable;
import mockit.integration.junit4.JMockit;
import nts.arc.testing.assertion.NtsAssert;
import nts.arc.time.YearMonth;
import nts.arc.time.calendar.period.YearMonthPeriod;
import nts.uk.ctx.bs.company.dom.company.primitive.ContractCd;

@RunWith(JMockit.class)
public class GetThePeriodOfTheYearTest {

	@Injectable
	private GetThePeriodOfTheYear.Require require;

	private static String CID = "000000000000-0001";

	@Test
	public void getter() {
		GetThePeriodOfTheYear periodOfTheYear = new GetThePeriodOfTheYear();
		NtsAssert.invokeGetters(periodOfTheYear);
	}
	
	@Test
	public void getData() {
		new Expectations() {
			{
				require.getComanyInfoByCid(CID);
				result = Optional.ofNullable(new Company(new CompanyCode(""), null, MonthStr.ONE, null, null, null,
						null, null, new ContractCd(""), null, null));

			}
		};

		YearMonthPeriod ym = GetThePeriodOfTheYear.getPeriodOfTheYear(require, CID, 2020);

		assertThat(ym).isEqualTo(new YearMonthPeriod(new YearMonth(202001), new YearMonth(202012)));
	}

}
