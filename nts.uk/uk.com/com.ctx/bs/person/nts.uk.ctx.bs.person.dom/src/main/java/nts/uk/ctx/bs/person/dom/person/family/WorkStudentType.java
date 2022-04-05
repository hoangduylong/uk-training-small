package nts.uk.ctx.bs.person.dom.person.family;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum WorkStudentType {
	// 0: 勤労学生(WorkStudent)
	WorkStudent(0),
	// 1: 勤労学生ではない(NotWorkStudent)
	NotWorkStudent(1);

	public final int value;
}
