package nts.uk.ctx.bs.dom.adapter.employee;

/** 社員IDから個人社員基本情報を取得のAdapter */
public interface EmployeeBasicInfoAdapter {

	EmployeeBasicInfoImport get(String sid);
}
