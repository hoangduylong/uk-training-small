/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.algorithm;

import java.util.List;

import nts.arc.time.GeneralDate;

public interface AcquireListWorkplaceByEmpIDService {
  List<String> getListWorkPlaceID(String employeeID , int empRange , GeneralDate referenceDate);
  
  
  /**
   * Gets the list work place ID no wkp admin.
   *
   * @param employeeID the employee ID
   * @param empRange the emp range
   * @param referenceDate the reference date
   * @return the list work place ID no wkp admin
   */
  // 指定社員が参照可能な職場リストを取得する（職場管理者なし）
  List<String> getListWorkPlaceIDNoWkpAdmin(String employeeID , int empRange , GeneralDate referenceDate);
}
