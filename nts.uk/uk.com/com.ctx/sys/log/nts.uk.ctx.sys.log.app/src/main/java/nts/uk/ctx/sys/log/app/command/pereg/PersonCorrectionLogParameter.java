package nts.uk.ctx.sys.log.app.command.pereg;

import java.io.Serializable;
import java.util.List;

import lombok.Value;
import nts.gul.text.IdentifierUtil;
import nts.uk.shr.com.security.audittrail.correction.content.UserInfo;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.CategoryCorrectionLog;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.PersonInfoCorrectionLog;
import nts.uk.shr.com.security.audittrail.correction.content.pereg.PersonInfoProcessAttr;

@Value
public class PersonCorrectionLogParameter implements IPeregCorrection, Serializable {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	public final String hashID;
	public final String userId;
	public final String employeeId;
	public final String userName;
	public PersonInfoProcessAttr processAttr;
	public final String remark;

	public PersonCorrectionLogParameter(String userId, String employeeId, String userName,
			PersonInfoProcessAttr processAttr, String remark) {
		this.userId = userId;
		this.employeeId = employeeId;
		this.userName = userName;
		this.processAttr = processAttr;
		this.remark = remark;
		// RANDOM_ID
		hashID = IdentifierUtil.randomUniqueId();
	}

	public PersonInfoCorrectionLog toPersonInfoCorrection(String operationId, String remark,
			List<CategoryCorrectionLog> ctgLog) {
		return new PersonInfoCorrectionLog(operationId, processAttr,
				new UserInfo(this.userId, this.employeeId, this.userName), ctgLog, remark);
	}

	@Override
	public String getHashID() {
		return "PERSON_" + this.hashID;
	}
}