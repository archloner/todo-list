package tdsm;

import org.springframework.data.repository.CrudRepository;
import tdsm.domain.Project;

public interface ProjectRepository extends CrudRepository<Project, Long> {
}
