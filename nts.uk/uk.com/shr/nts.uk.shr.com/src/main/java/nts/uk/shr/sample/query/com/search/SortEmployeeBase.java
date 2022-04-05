package nts.uk.shr.sample.query.com.search;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 社員の並び替え
 * @author m_kitahira
 *
 */
public class SortEmployeeBase {

	/** ソート条件 */
	private List<EmployeeSortType> sortTypes;

	public List<EmployeeToSortBase> sort(List<EmployeeToSortBase> source) {
		
		return source.stream().sorted((a, b) -> {
			for (EmployeeSortType sortType : this.sortTypes) {
				int result = a.compareTo(b, sortType);
				if (result != 0) {
					return result;
				}
			}
			return 0;
		}).collect(Collectors.toList());
	}

	public List<EmployeeToSortBase> sort(
			List<EmployeeToSortBase> source,
			Comparator<EmployeeToSortBase> extendComparator) {
		
		return source.stream().sorted((a, b) -> {
			for (EmployeeSortType sortType : this.sortTypes) {
				int result = a.compareTo(b, sortType);
				if (result != 0) {
					return result;
				}
			}
			
			return extendComparator.compare(a, b);
		}).collect(Collectors.toList());
	}
}
