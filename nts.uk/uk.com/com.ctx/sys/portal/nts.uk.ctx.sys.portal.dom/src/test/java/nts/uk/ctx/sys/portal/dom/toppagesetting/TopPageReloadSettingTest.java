package nts.uk.ctx.sys.portal.dom.toppagesetting;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;

import org.junit.Test;

import mockit.Mocked;
import nts.arc.testing.assertion.NtsAssert;
import nts.uk.ctx.sys.portal.dom.toppage.TopPageReloadSetting;

public class TopPageReloadSettingTest {
	private static final String COMPANY_ID = "companyId";
	@Mocked
	private static TopPageReloadSettingDto mockDto = TopPageReloadSettingDto.builder()
		.cid(COMPANY_ID)
		.reloadInterval(BigDecimal.valueOf(0))
		.build();

	@Test
	public void createFromMementoAndGetMemento() {
		//When
		TopPageReloadSetting domain = TopPageReloadSetting.createFromMemento(mockDto);
		//Then
		assertThat(domain.getCid()).isEqualTo(mockDto.getCid());
	}
	
	@Test
	public void testSetMemeto() {
		//Given
		TopPageReloadSettingDto dto = TopPageReloadSettingDto.builder().build();
		TopPageReloadSetting domain = TopPageReloadSetting.createFromMemento(mockDto);
		
		//When
		domain.setMemento(dto);
		
		//Then
		assertThat(domain.getCid()).isEqualTo(mockDto.getCid());
		assertThat(domain.getReloadInterval().value).isEqualTo(mockDto.getReloadInterval().intValue());
	}
	
	@Test
	public void testToDomain() {
		
		//When
		TopPageReloadSetting domain = TopPageReloadSetting.toDomain(mockDto.getCid(), mockDto.getReloadInterval().intValue());
		
		//Then
		assertThat(domain.getCid()).isEqualTo(mockDto.getCid());
		assertThat(domain.getReloadInterval().value).isEqualTo(mockDto.getReloadInterval().intValue());
	}
	
	@Test
	public void getters() {
		//When
		TopPageReloadSetting domain = TopPageReloadSetting.createFromMemento(mockDto);
		// then
		NtsAssert.invokeGetters(domain);
	}
	
	@Test
	public void gettersNull() {
		//given
		TopPageReloadSettingDto mockDtoNull = TopPageReloadSettingDto.builder().build();
		//when
		TopPageReloadSetting domain =  new TopPageReloadSetting();
		domain.getMemento(mockDtoNull);
		//then
		NtsAssert.invokeGetters(domain);
	}
}
