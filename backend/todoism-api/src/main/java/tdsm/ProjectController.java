package tdsm;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tdsm.domain.Project;

@RestController
@ComponentScan
@RequestMapping(path = "/api", produces = "application/json")
public class ProjectController {

    public ProjectController(ProjectRepository projectRepo) {
        this.projectRepo = projectRepo;
    }

    private ProjectRepository projectRepo;

    @GetMapping("/project")
    public ResponseEntity<Iterable<Project>> getAllProjects() {
        return ResponseEntity.ok(projectRepo.findAll());
    }

    @GetMapping("/project/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable String id) {
        Project project = projectRepo.findById(id).orElse(null);
        if (project == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(project);
    }

}
