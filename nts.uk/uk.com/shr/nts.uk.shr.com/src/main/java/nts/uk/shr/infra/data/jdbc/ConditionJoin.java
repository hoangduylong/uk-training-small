package nts.uk.shr.infra.data.jdbc;

public enum ConditionJoin {

	AND(0, "AND"), OR(1, "OR");

	public final int value;
	
	public final String description;

	ConditionJoin(int value, String des) {
		this.value = value;
		this.description = des;
	}
}
