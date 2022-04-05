package nts.uk.shr.infra.arc.task.persist;

import java.sql.PreparedStatement;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import lombok.SneakyThrows;
import lombok.val;
import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsResultSet;
import nts.arc.task.AsyncTaskError;
import nts.arc.task.AsyncTaskInfo;
import nts.arc.task.AsyncTaskInfoRepository;
import nts.arc.task.AsyncTaskStatus;
import nts.arc.task.data.AsyncTaskData;
import nts.arc.time.GeneralDateTime;
import nts.gul.collection.CollectionUtil;
import nts.gul.util.Nullable;

@Stateless
public class JpaAsyncTaskInfoRepository extends JpaRepository implements AsyncTaskInfoRepository {
	private static final String DELETE_ALL_TASK_DATA = "DELETE FROM CisdtAsyncTaskData e where e.pk.taskId =:taskId";
	private static final String SELECT_ALL_TASK_DATA = "SELECT e FROM CisdtAsyncTaskData e where e.pk.taskId =:taskId";

	@Override
	public Optional<AsyncTaskInfo> find(String id) {
		Optional<AsyncTaskInfo> result = this.queryProxy().find(id, CisdtAsyncTask.class).map(e -> toDomain(e));
		Logger.getLogger(this.getClass()).debug(result);

		return result;
	}

	@Override
	public void add(AsyncTaskInfo taskInfo) {
		this.commandProxy().insert(toEntity(taskInfo));
		this.getEntityManager().flush();
	}

	@Override
	public void update(AsyncTaskInfo taskInfo) {
		this.commandProxy().update(toEntity(taskInfo));
	}

	private static AsyncTaskInfo toDomain(CisdtAsyncTask entity) {
		return new AsyncTaskInfo(entity.taskId, EnumAdaptor.valueOf(entity.taskSts, AsyncTaskStatus.class),
				entity.createdAt, entity.startedAt, entity.finishedAt,
				Nullable.get(entity.abort, d -> toDomainAbort(d)));
	}

	private static AsyncTaskError toDomainAbort(CisdtAsyncTaskAbort entity) {
		return new AsyncTaskError(entity.errorType == 1, entity.errorMessage, entity.messageId);
	}

	private static CisdtAsyncTask toEntity(AsyncTaskInfo taskInfo) {
		val entity = new CisdtAsyncTask();
		entity.taskSts = taskInfo.getStatus().value;
		entity.taskId = taskInfo.getId();
		entity.createdAt = taskInfo.getCreatedAt();
		entity.startedAt = taskInfo.getStartedAt();
		entity.finishedAt = taskInfo.getFinishedAt();
		entity.abort = Nullable.get(taskInfo.getError(), d -> toEntityAbort(taskInfo.getId(), d));

		return entity;
	}

	private static CisdtAsyncTaskAbort toEntityAbort(String id, AsyncTaskError domain) {
		val entity = new CisdtAsyncTaskAbort();
		entity.taskId = id;
		entity.errorType = domain.isBusinessException() ? 1 : 0;
		entity.messageId = (domain.getMessageId() != null) ? StringUtils.substring(domain.getMessageId(), 0, 20) : null;
		entity.errorMessage = (domain.getMessage() != null) ? StringUtils.substring(domain.getMessage(), 0, 200) : null;
		return entity;
	}

	@Override
	public void removeAllTaskData(String taskId) {
		this.getEntityManager().createQuery(DELETE_ALL_TASK_DATA).setParameter("taskId", taskId).executeUpdate();

	}

	@Override
	public void removeTaskData(String taskId, String key) {
		Optional<CisdtAsyncTaskData> data = this.queryProxy().find(new CisdtAsyncTaskDataKey(taskId, key),
				CisdtAsyncTaskData.class);
		if (data.isPresent()) {
			this.commandProxy().remove(data.get());
		}
	}

	@Override
	public void insertTaskData(String taskId, AsyncTaskData data) {
		this.commandProxy().insert(convertToTaskDataEntity(taskId, data));
	}

	@Override
	public void updateTaskData(String taskId, AsyncTaskData data) {
		Optional<CisdtAsyncTaskData> en = this.queryProxy().find(new CisdtAsyncTaskDataKey(taskId, data.getKey()),
				CisdtAsyncTaskData.class);
		if (en.isPresent()) {
			CisdtAsyncTaskData updated = en.get();
			updated.value = data.getValueAsString();

			this.commandProxy().update(updated);
		}

	}

	@Override
	public List<AsyncTaskData> getTaskData(String taskId) {
		List<CisdtAsyncTaskData> result = this.getEntityManager()
				.createQuery(SELECT_ALL_TASK_DATA, CisdtAsyncTaskData.class).setParameter("taskId", taskId)
				.getResultList();
		return result.stream().map(x -> {
			return convertToTaskDataDom(x);
		}).collect(Collectors.toList());
	}

	private CisdtAsyncTaskData convertToTaskDataEntity(String taskId, AsyncTaskData data) {
		CisdtAsyncTaskData en = new CisdtAsyncTaskData();
		en.pk = new CisdtAsyncTaskDataKey(taskId, data.getKey());
		en.value = data.getValueAsString();
		return en;
	}

	private AsyncTaskData convertToTaskDataDom(CisdtAsyncTaskData en) {
		return new AsyncTaskData(en.pk.dataKey, en.value);
	}

	@Override
	public void removeOldTasks(GeneralDateTime baseDateTime) {
		
		String toCorrectIds = "SELECT e FROM CisdtAsyncTask e"
				+ " WHERE e.finishedAt < :baseDateTime";
		val targetTaskIds = this.queryProxy().query(toCorrectIds, CisdtAsyncTask.class)
				.setParameter("baseDateTime", baseDateTime)
				.getList(e -> e.taskId);
		
		String toDeleteData = "DELETE FROM CisdtAsyncTaskData e"
				+ " WHERE e.pk.taskId IN :targetTaskIds";
		
		CollectionUtil.split(targetTaskIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, ids -> {
			this.getEntityManager().createQuery(toDeleteData)
					.setParameter("targetTaskIds", ids);
		});
		this.getEntityManager().flush();
		
		this.commandProxy().removeAll(CisdtAsyncTask.class, targetTaskIds);
	}

	@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
	@SneakyThrows
	@Override
	public AsyncTaskStatus getStatus(String taskId) {

		String sql = "select TASK_ID, TASK_STS from CISDT_ASYNC_TASK"
				+ " where TASK_ID = ?";
		
		try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
			stmt.setString(1, taskId);
			
			return new NtsResultSet(stmt.executeQuery())
					.getSingle(r -> AsyncTaskStatus.of(r.getInt("TASK_STS")))
					.get();
		}
	}

}
