package nts.uk.ctx.sys.auth.dom.algorithm;

import nts.arc.time.GeneralDate;

public interface DetermineEmpCanReferService {
  /**参照可能な社員かを判定する（職場）*/
	boolean checkDetermineEmpCanRefer(GeneralDate date ,String employeeID , int roleType );
}
