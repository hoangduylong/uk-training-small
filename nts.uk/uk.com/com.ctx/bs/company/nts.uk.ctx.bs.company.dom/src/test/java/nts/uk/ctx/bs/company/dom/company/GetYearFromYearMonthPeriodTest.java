package nts.uk.ctx.bs.company.dom.company;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;

import mockit.Expectations;
import mockit.Injectable;
import mockit.integration.junit4.JMockit;
import nts.arc.testing.assertion.NtsAssert;
import nts.arc.time.YearMonth;
import nts.arc.time.calendar.Year;
import nts.uk.ctx.bs.company.dom.company.primitive.ContractCd;

@RunWith(JMockit.class)
public class GetYearFromYearMonthPeriodTest {

	@Injectable
	private GetYearFromYearMonthPeriod.Require require;

	private static String CID = "000000000000-0001";

	@Test
	public void getter() {
		GetYearFromYearMonthPeriod monthPeriod = new GetYearFromYearMonthPeriod();
		NtsAssert.invokeGetters(monthPeriod);
	}

	@Test
	public void getYearFromYearMonthPeriodWhenCurrentYear() {

		new Expectations() {
			{
				require.find(CID);
				result = Optional.ofNullable(new Company(new CompanyCode(""), null, MonthStr.ONE, null, null, null,
						null, null, new ContractCd(""), null, null));

			}
		};

		List<YearMonth> yearMonths = Arrays.asList(new YearMonth(202001), new YearMonth(202101));
		List<Year> years = GetYearFromYearMonthPeriod.getYearFromYearMonthPeriod(require, CID, yearMonths);

		assertThat(years).isEqualTo(Arrays.asList(new Year(2020), new Year(2021)));

	}
	
	@Test
	public void getYearFromYearMonthPeriodOneYear() {

		new Expectations() {
			{
				require.find(CID);
				result = Optional.ofNullable(new Company(new CompanyCode(""), null, MonthStr.FOUR, null, null, null,
						null, null, new ContractCd(""), null, null));

			}
		};

		List<YearMonth> yearMonths = Arrays.asList(new YearMonth(202012), new YearMonth(202101));
		List<Year> years = GetYearFromYearMonthPeriod.getYearFromYearMonthPeriod(require, CID, yearMonths);

		assertThat(years).isEqualTo(Arrays.asList(new Year(2020)));

	}
	
	@Test
	public void getYearFromYearMonthPeriodPreviousAndCurrentYear() {

		new Expectations() {
			{
				require.find(CID);
				result = Optional.ofNullable(new Company(new CompanyCode(""), null, MonthStr.FOUR, null, null, null,
						null, null, new ContractCd(""), null, null));

			}
		};

		List<YearMonth> yearMonths = Arrays.asList(new YearMonth(202103), new YearMonth(202104));
		List<Year> years = GetYearFromYearMonthPeriod.getYearFromYearMonthPeriod(require, CID, yearMonths);

		assertThat(years).isEqualTo(Arrays.asList(new Year(2020), new Year(2021)));
		

	}	
	
	@Test
	public void getDataWhenCompanyNull() {

		List<YearMonth> yearMonths = Arrays.asList(new YearMonth(202001), new YearMonth(202102), new YearMonth(202103));
		List<Year> years = GetYearFromYearMonthPeriod.getYearFromYearMonthPeriod(require, CID, yearMonths);

		assertThat(years).isEmpty();

	}
	
	@Test
	public void getDataWhenYMEmpty() {

		List<YearMonth> yearMonths = Collections.emptyList();
		List<Year> years = GetYearFromYearMonthPeriod.getYearFromYearMonthPeriod(require, CID, yearMonths);

		assertThat(years).isEmpty();

	}

}
