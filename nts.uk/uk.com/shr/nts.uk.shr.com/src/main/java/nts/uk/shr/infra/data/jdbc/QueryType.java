package nts.uk.shr.infra.data.jdbc;

public enum QueryType {
	
	SELECT(0, "SELECT"), INSERT(1, "INSERT"), UPDATE(2, "UPDATE"), DELETE(3, "DELETE");

	public final int value;
	public final String description;

	QueryType(int value, String des) {
		this.value = value;
		this.description = des;
	}
}
