package nts.uk.ctx.sys.gateway.ws.url;

import java.util.Map;

import lombok.AllArgsConstructor;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.gateway.app.command.login.password.CheckChangePassDto;

/**
 * 
 * @author Doan Duy Hung
 *
 */
@AllArgsConstructor
public class UrlResult {
	
	public String programID;
	
	public String screenID;
	
	public String embeddedId;
    
	public String cID;
    
	public String loginID;
    
	public String contractCD;
    
	public GeneralDateTime expiredDate;
    
	public GeneralDateTime issueDate;
    
	public String sID;
    
	public String sCD;
	
	public Map<String, String> urlTaskValueList;
	
//	public String successMsg; da day vao trong obj changePw
	public String webAppID;
	public CheckChangePassDto changePw;
	
	public boolean smpDevice;
	
}
