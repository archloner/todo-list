package tdsm;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tdsm.domain.Project;
import tdsm.domain.Task;
import tdsm.domain.TaskDTO;
import tdsm.service.TaskService;

import java.net.URI;

@RestController
@ComponentScan
@RequestMapping(path = "/api", produces = "application/json")
public class ProjectController {

    public ProjectController(ProjectRepository projectRepo, TaskService taskService) {
        this.projectRepo = projectRepo;
        this.taskService = taskService;
    }

    @Value("${todoism.api.url")
    private static String API_URL;

    @Slf4j
    private static class Logger {}

    private ProjectRepository projectRepo;

    private TaskService taskService;

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

    @GetMapping("/project/{id}/task")
    public ResponseEntity<Iterable<Task>> getProjectTasks(@PathVariable String id) {
        Project existingProject = projectRepo.findById(id).orElse(null);
        if (existingProject == null) {
            return ResponseEntity.notFound().build();
        }
        Iterable<Task> tasks = existingProject.getTaskList();
        if (tasks == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/project")
    public ResponseEntity<String> createProject(@RequestBody Project project) {
        Project savedProject = projectRepo.save(project);
        return ResponseEntity.created(URI.create(API_URL + "/project/" + savedProject.getProjectId())).build();
    }

    @PutMapping("/project/{id}")
    public ResponseEntity<String> updateProject(@PathVariable String id, @RequestBody Project projectPatch) {
        Project existingProject = projectRepo.findById(id).orElse(null);
        if (existingProject == null) {
            return ResponseEntity.notFound().build();
        }
        if (projectPatch.getName() != null) {
            existingProject.setName(projectPatch.getName());
        }
        if (projectPatch.getDescription()!= null) {
            existingProject.setDescription(projectPatch.getDescription());
        }
        if (projectPatch.getTaskList() != null && projectPatch.getTaskList() != existingProject.getTaskList()) {
            existingProject.setTaskList(projectPatch.getTaskList());
        }
        existingProject.setUpdatedAtToNow();
        projectRepo.save(existingProject);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/project/{id}/task")
    public ResponseEntity<String> createTask(@PathVariable String id, @RequestBody TaskDTO task) {
        Project project = projectRepo.findById(id).orElse(null);
        if (project == null) {
            return ResponseEntity.notFound().build();
        }
        project.addTask(new Task(task.getTitle(), task.getDescription(), task.getPriority(), task.getDueDate(),
                task.getOwnerUserId(), task.getAssignedToUserId()));
        projectRepo.save(project);
        URI createdResourceURI = URI.create(API_URL + "/task/" + task.getTaskId());
        return ResponseEntity.created(createdResourceURI).build();
    }

    @DeleteMapping("/project/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable String id) {
        Project existingProject = projectRepo.findById(id).orElse(null);
        if (existingProject == null) {
            return ResponseEntity.notFound().build();
        }
        // Remove project tasks
        Logger.log.info("Removing project's associated tasks...");
        Iterable<Task> tasks = existingProject.getTaskList();
        if (tasks != null) {
            taskService.deleteTasks(tasks);
        }
        // Remove project
        Logger.log.info("Removing project...");
        projectRepo.delete(existingProject);
        return ResponseEntity.ok().build();
    }

}
