package nts.uk.ctx.sys.portal.dom.layout;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;

import org.junit.Test;

import mockit.Mocked;
import nts.arc.testing.assertion.NtsAssert;

public class LayoutTest {
	@Mocked
	private static LayoutDto mockDto = LayoutDto.builder()
		.widgetSettings(Arrays.asList(new WidgetSetting(WidgetType.valueOf(0), 0)))
		.topPageCode("TopPageCode")
		.layoutNo(0)
		.layoutType(0)
		.cid("cid")
		.flowMenuCd("flowMenuCd")
		.flowMenuUpCd("flowMenuUpCd")
		.url("url")
		.build();

	@Test
	public void createFromMementoAndGetMemento() {
		//When
		Layout domain = Layout.createFromMemento(mockDto);
		//Then
		assertThat(domain.getCid()).isEqualTo(mockDto.getCid());
		assertThat(domain.getWidgetSettings()).isEqualTo(mockDto.getWidgetSettings());
		assertThat(domain.getWidgetSettings().get(0).getWidgetType()).isEqualTo(mockDto.getWidgetSettings().get(0).getWidgetType());
		assertThat(domain.getWidgetSettings().get(0).getOrder()).isEqualTo(mockDto.getWidgetSettings().get(0).getOrder());
		assertThat(domain.getTopPageCode().v()).isEqualTo(mockDto.getTopPageCode());
		assertThat(domain.getLayoutNo().v()).isEqualTo(mockDto.getLayoutNo());
		assertThat(domain.getLayoutType().value).isEqualTo(mockDto.getLayoutType().intValue());
		assertThat(domain.getCid()).isEqualTo(mockDto.getCid());
		assertThat(domain.getFlowMenuCd().get().v()).isEqualTo(mockDto.getFlowMenuCd());
		assertThat(domain.getFlowMenuUpCd().get().v()).isEqualTo(mockDto.getFlowMenuUpCd());
		assertThat(domain.getUrl().get()).isEqualTo(mockDto.getUrl());
	}
	
	@Test
	public void testSetMemeto() {
		//Given
		LayoutDto dto = LayoutDto.builder().build();
		Layout domain = Layout.createFromMemento(mockDto);
		
		//When
		domain.setMemento(dto);
		
		//Then
		assertThat(domain.getCid()).isEqualTo(mockDto.getCid());
		assertThat(domain.getWidgetSettings()).isEqualTo(mockDto.getWidgetSettings());
		assertThat(domain.getWidgetSettings().get(0).getWidgetType()).isEqualTo(mockDto.getWidgetSettings().get(0).getWidgetType());
		assertThat(domain.getWidgetSettings().get(0).getOrder()).isEqualTo(mockDto.getWidgetSettings().get(0).getOrder());
		assertThat(domain.getTopPageCode().v()).isEqualTo(mockDto.getTopPageCode());
		assertThat(domain.getLayoutNo().v()).isEqualTo(mockDto.getLayoutNo());
		assertThat(domain.getLayoutType().value).isEqualTo(mockDto.getLayoutType().intValue());
		assertThat(domain.getCid()).isEqualTo(mockDto.getCid());
		assertThat(domain.getFlowMenuCd().get().v()).isEqualTo(mockDto.getFlowMenuCd());
		assertThat(domain.getFlowMenuUpCd().get().v()).isEqualTo(mockDto.getFlowMenuUpCd());
		assertThat(domain.getUrl().get()).isEqualTo(mockDto.getUrl());
	}
	
	@Test
	public void getters() {
		//When
		Layout domain = Layout.createFromMemento(mockDto);
		// then
		NtsAssert.invokeGetters(domain);
	}
	
	@Test
	public void gettersNull() {
		//given
		LayoutDto mockDtoNull = LayoutDto.builder().build();
		//when
		Layout domain =  new Layout();
		domain.getMemento(mockDtoNull);
		//then
		NtsAssert.invokeGetters(domain);
	}
}
