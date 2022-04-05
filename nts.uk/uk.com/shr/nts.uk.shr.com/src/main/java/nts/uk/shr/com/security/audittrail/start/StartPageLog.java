package nts.uk.shr.com.security.audittrail.start;

import java.util.Optional;

import lombok.Getter;
import nts.uk.shr.com.context.ScreenIdentifier;
import nts.uk.shr.com.security.audittrail.basic.LogBasicInformation;

@Getter
public class StartPageLog {
	
	private LogBasicInformation basicInfo;
	
	private Optional<ScreenIdentifier> startPageBeforeInfo;
	
	private StartPageLog(ScreenIdentifier beforeScreen, LogBasicInformation basicInfo){
		this.startPageBeforeInfo = Optional.ofNullable(beforeScreen); 
		this.basicInfo = basicInfo;
	}
	
	public static StartPageLog specialStarted(LogBasicInformation basicInfo){
		return new StartPageLog(null, basicInfo);
	}
	
	public static StartPageLog pageStarted(ScreenIdentifier beforeScreen, LogBasicInformation basicInfo){
		return new StartPageLog(beforeScreen, basicInfo);
	}
}
