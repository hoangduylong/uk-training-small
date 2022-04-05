package nts.uk.ctx.sys.portal.dom.generalsearch;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;

import nts.arc.testing.assertion.NtsAssert;
public class GeneralSearchHistoryTest {

	private static GeneralSearchHistoryDto mockDto = GeneralSearchHistoryHelper.getMockDto();
	
	@Test
	public void getters() {
		//When
		GeneralSearchHistory domain = GeneralSearchHistory.createFromMemento(mockDto);
		//Then
		NtsAssert.invokeGetters(domain);
	}
	
	@Test
	public void setMemento() {
		//Given
		GeneralSearchHistoryDto dto = GeneralSearchHistoryDto.builder().build();
		GeneralSearchHistory domain = GeneralSearchHistory.createFromMemento(GeneralSearchHistoryTest.mockDto);
		//When
		domain.setMemento(dto);
		
		//Then
		assertThat(domain.getCompanyID()).isEqualTo(mockDto.getCompanyID());
		assertThat(domain.getSearchCategory().value).isEqualTo(mockDto.getSearchCategory());
		assertThat(domain.getSearchDate()).isEqualTo(mockDto.getSearchDate());
		assertThat(domain.getUserID()).isEqualTo(mockDto.getUserID());
		assertThat(domain.getContents().v()).isEqualTo(mockDto.getContents());
	}
	
	@Test
	public void getMementoNull() {
		//Given
		GeneralSearchHistoryDto dtoNull = GeneralSearchHistoryDto.builder().build();
		
		//When
		GeneralSearchHistory domain = GeneralSearchHistory.createFromMemento(dtoNull);
		
		//Then
		NtsAssert.invokeGetters(domain);
	}
}
