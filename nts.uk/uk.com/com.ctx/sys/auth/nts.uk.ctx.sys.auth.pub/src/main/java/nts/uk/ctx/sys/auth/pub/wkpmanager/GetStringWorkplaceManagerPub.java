package nts.uk.ctx.sys.auth.pub.wkpmanager;

import java.util.List;

import nts.arc.time.GeneralDate;

public interface GetStringWorkplaceManagerPub {
  //指定社員の管理職場をすべて取得する	
 List<String> getAllWorkplaceID (String empId , GeneralDate baseDate);
 }

