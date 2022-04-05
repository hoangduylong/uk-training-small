package nts.uk.shr.find.employment.processing.yearmonth;

import javax.ejb.Stateless;
import java.util.List;

@Stateless
public interface IPaydayProcessingFinder {
	List<PaydayProcessingDto> getPaydayProcessing(String companyCode); 
	
	List<PaydayProcessingDto> getPaydayProcessing();
}
