package tdsm;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tdsm.domain.Task;

@ComponentScan
@RestController
@RequestMapping(path = "/api", produces = "application/json")
public class TaskController {

    @Slf4j
    private static class TaskControllerLogger {}

    public TaskController(TaskRepository taskRepo) {
        this.taskRepo = taskRepo;
    }

    public TaskRepository taskRepo;

    @GetMapping("/task")
    public ResponseEntity<Iterable<Task>> findAllTasks() {
        TaskControllerLogger.log.info("Returning list of all tasks in TaskController");
        return ResponseEntity.ok(taskRepo.findAll());
    }

}