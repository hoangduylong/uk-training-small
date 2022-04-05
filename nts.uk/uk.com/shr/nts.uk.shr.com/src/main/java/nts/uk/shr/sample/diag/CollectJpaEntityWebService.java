package nts.uk.shr.sample.diag;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import lombok.val;

/**
 * CollectJpaEntityの結果をCSV形式で出力する
 */
@Path("/sample/diag/entity")
@Produces(MediaType.TEXT_PLAIN)
public class CollectJpaEntityWebService {

	@GET
	@Path("collect")
	public String collect() {
		
		StringBuilder sb = new StringBuilder();
		
		sb.append("entity,table,column,type");
		sb.append(System.lineSeparator());
		
		val tables = CollectJpaEntity.collect();
		
		for (val table : tables) {
			
			for (val column : table.columns) {
				sb.append(table.entity);
				sb.append(",");
				sb.append(table.name);
				sb.append(",");
				sb.append(column.name);
				sb.append(",");
				sb.append(column.type);
				sb.append(System.lineSeparator());
			}
		}
		
		return sb.toString();
	}
}
