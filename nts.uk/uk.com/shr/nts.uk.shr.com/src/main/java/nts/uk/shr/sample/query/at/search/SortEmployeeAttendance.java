package nts.uk.shr.sample.query.at.search;

import java.util.List;
import java.util.stream.Collectors;

import nts.uk.shr.sample.query.com.search.EmployeeToSortBase;
import nts.uk.shr.sample.query.com.search.SortEmployeeBase;

/**
 * 社員の並び替え（就業）
 * @author m_kitahira
 *
 */
public class SortEmployeeAttendance extends SortEmployeeBase {

	
	
	public List<EmployeeToSortAttendance> sortAttendance(List<EmployeeToSortAttendance> source) {
		
		return this.sort(
				source.stream().map(e -> (EmployeeToSortBase)e).collect(Collectors.toList()),
				(a, b) -> {
					return 0;
				}).stream()
				.map(e -> (EmployeeToSortAttendance)e)
				.collect(Collectors.toList());
	}
}
