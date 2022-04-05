package nts.uk.shr.sample;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.util.ArrayList;

import org.junit.Test;

import lombok.val;
import nts.arc.time.GeneralDate;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.shr.sample.history.jobposition.SampleJobPositionMain;

public class SampleJobPositionMainTest {

	@Test
	public void add() {
		
		val target = new SampleJobPositionMain("emp1", new ArrayList<>());
		
		target.add(new DateHistoryItem("1", new DatePeriod(GeneralDate.ymd(2000, 1, 1), GeneralDate.max())));
		target.add(new DateHistoryItem("2", new DatePeriod(GeneralDate.ymd(2010, 1, 1), GeneralDate.max())));

		assertThat(target.getHistoryItems().get(0).start(), is(GeneralDate.ymd(2000, 1, 1)));
		assertThat(target.getHistoryItems().get(0).end(),   is(GeneralDate.ymd(2009, 12, 31)));
		assertThat(target.getHistoryItems().get(1).start(), is(GeneralDate.ymd(2010, 1, 1)));
		assertThat(target.getHistoryItems().get(1).end(),   is(GeneralDate.ymd(9999, 12, 31)));
	}

	@Test
	public void remove() {
		
		val target = new SampleJobPositionMain("emp1", new ArrayList<>());
		
		target.add(new DateHistoryItem("1", new DatePeriod(GeneralDate.ymd(2000, 1, 1), GeneralDate.max())));
		val item2 = new DateHistoryItem("2", new DatePeriod(GeneralDate.ymd(2010, 1, 1), GeneralDate.max()));
		target.add(item2);
		
		target.remove(item2);

		assertThat(target.getHistoryItems().get(0).start(), is(GeneralDate.ymd(2000, 1, 1)));
		assertThat(target.getHistoryItems().get(0).end(),   is(GeneralDate.ymd(9999, 12, 31)));
		assertThat(target.getHistoryItems().size(), is(1));
	}

	@Test
	public void changeSpan() {
		
		val target = new SampleJobPositionMain("emp1", new ArrayList<>());
		
		target.add(new DateHistoryItem("1", new DatePeriod(GeneralDate.ymd(2000, 1, 1), GeneralDate.max())));
		val item2 = new DateHistoryItem("2", new DatePeriod(GeneralDate.ymd(2010, 1, 1), GeneralDate.max()));
		target.add(item2);
		
		target.changeSpan(item2, new DatePeriod(GeneralDate.ymd(2010, 4, 1), GeneralDate.max()));

		assertThat(target.getHistoryItems().get(0).start(), is(GeneralDate.ymd(2000, 1, 1)));
		assertThat(target.getHistoryItems().get(0).end(),   is(GeneralDate.ymd(2010, 3, 31)));
		assertThat(target.getHistoryItems().get(1).start(), is(GeneralDate.ymd(2010, 4, 1)));
		assertThat(target.getHistoryItems().get(1).end(),   is(GeneralDate.ymd(9999, 12, 31)));
	}
}
