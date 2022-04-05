package nts.uk.shr.infra.file.csv;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CSVFileData {
	
	private String fileName;
	
	private List<String> headers;
	
	private List<Map<String, Object>> datas;
}
