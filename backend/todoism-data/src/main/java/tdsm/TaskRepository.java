package tdsm;

import org.springframework.data.repository.CrudRepository;
import tdsm.domain.Task;

public interface TaskRepository extends CrudRepository<Task, Long> {
}
