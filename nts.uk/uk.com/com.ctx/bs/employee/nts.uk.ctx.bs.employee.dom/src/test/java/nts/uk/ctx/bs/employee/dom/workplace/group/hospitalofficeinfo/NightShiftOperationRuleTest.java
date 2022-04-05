package nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;

import lombok.val;
import mockit.integration.junit4.JMockit;
import nts.arc.testing.assertion.NtsAssert;
import nts.arc.time.clock.ClockHourMinute;
import nts.arc.time.clock.ClockHourMinuteSpan;
import nts.uk.shr.com.enumcommon.NotUseAtr;

@RunWith(JMockit.class)
public class NightShiftOperationRuleTest {
	
	/**
	 * 		     夜勤時間帯標準: 22時00 ～ 29時00 
	 * input: 夜勤時間帯:		21時00 ～ 25時00
	 * output:　Msg_2090
	 */
	@Test
	public void createByNightShiftUse_throw_Msg_2090_1() {
		val shiftTime = new ClockHourMinuteSpan(ClockHourMinute.hm(21, 00), ClockHourMinute.hm(25, 00));
		NtsAssert.businessException("Msg_2090", () ->{
			NightShiftOperationRule.createByNightShiftUse(shiftTime);
		});
	}
	
	/**
	 * 		     夜勤時間帯標準: 22時00 ～ 29時00 
	 * input: 夜勤時間帯: 	23時00 ～ 28時00
	 * output:　Msg_2090
	 */
	@Test
	public void createByNightShiftUse_throw_Msg_2090_2() {
		val shiftTime = new ClockHourMinuteSpan(ClockHourMinute.hm(23, 00), ClockHourMinute.hm(28, 00));
		NtsAssert.businessException("Msg_2090", () ->{
			NightShiftOperationRule.createByNightShiftUse(shiftTime);
		});
	}
	
	/**
	 * 		     夜勤時間帯標準: 22時00 ～ 29時00
	 * input: 夜勤時間帯:     26時00 ～ 30時00
	 * output:　Msg_2090
	 */
	@Test
	public void createByNightShiftUse_throw_Msg_2090_3() {
		val shiftTime = new ClockHourMinuteSpan(ClockHourMinute.hm(26, 00), ClockHourMinute.hm(30, 00));
		NtsAssert.businessException("Msg_2090", () ->{
			NightShiftOperationRule.createByNightShiftUse(shiftTime);
		});
	}
	
	/**
	 * 		     夜勤時間帯標準: 22時00 ～ 29時00
	 * input: 夜勤時間帯:		20時00 ～  30時00
	 * output:　Msg_2090
	 */
	@Test
	public void createByNightShiftUse_throw_Msg_2090_4() {
		val shiftTime = new ClockHourMinuteSpan(ClockHourMinute.hm(20, 00), ClockHourMinute.hm(30, 00));
		NtsAssert.businessException("Msg_2090", () ->{
			NightShiftOperationRule.createByNightShiftUse(shiftTime);
		});
	}

	/**
	 * 		     夜勤時間帯標準: 22時00 ～ 29時00 を含む16時間	
	 * input: 夜勤時間帯:		15時00 ～  31時00
	 * output:　create success
	 */
	@Test
	public void createByNightShiftUse_sucess() {
		val shiftTime = new ClockHourMinuteSpan(ClockHourMinute.hm(15, 00), ClockHourMinute.hm(31, 00));
		val nightShiftOpeRule = NightShiftOperationRule.createByNightShiftUse(shiftTime);
		
		assertThat(nightShiftOpeRule.getNightShiftOperationAtr()).isEqualTo(NotUseAtr.USE);
		assertThat(nightShiftOpeRule.getShiftTime().get().start().v()).isEqualTo(shiftTime.start().v());
		assertThat(nightShiftOpeRule.getShiftTime().get().end().v()).isEqualTo(shiftTime.end().v());
		
	}
	
	@Test
	public void createByNightShiftNotUse_sucess() {
		val nightShiftOpeRule = NightShiftOperationRule.createByNightShiftNotUse();
		
		assertThat(nightShiftOpeRule.getNightShiftOperationAtr()).isEqualTo(NotUseAtr.NOT_USE);
		assertThat(nightShiftOpeRule.getShiftTime()).isEmpty();		
	}
}
