package tdsm;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tdsm.domain.Task;

import java.net.URI;

@ComponentScan
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api", produces = "application/json")
public class TaskController {

    @Slf4j
    private static class Logger {}

    public TaskController(TaskRepository taskRepo) {
        this.taskRepo = taskRepo;
    }

    @Value("${todoism.api.url}")
    private String API_URL;

    private TaskRepository taskRepo;

    @GetMapping("/task")
    public ResponseEntity<Iterable<Task>> findAllTasks() {
        Iterable<Task> tasks = taskRepo.findAll();
        Logger.log.info("Returning list of all tasks in TaskController");
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/task/{id}")
    public ResponseEntity<Task> findTaskById(@PathVariable String id) {
        Task existingTask = taskRepo.findById(id).orElse(null);
        if (existingTask == null) {
            return ResponseEntity.notFound().build();
        }
        Logger.log.info("Returning found task with id: " + id);
        return ResponseEntity.ok(existingTask);
    }

    @PostMapping("/task")
    public ResponseEntity<URI> createTask(@RequestBody Task task) {
        Logger.log.info("Saving task to the database");
        Task savedTask = taskRepo.save(task);
        URI createdResourceURI = URI.create(API_URL + "/task/" + savedTask.getTaskId());
        return ResponseEntity.created(createdResourceURI).build();
    }

    @PutMapping("/task/{id}")
    public ResponseEntity<String> updateTask(@PathVariable String id, @RequestBody Task taskPatch) {
        Task existingTask = taskRepo.findById(id).orElse(null);
        if (existingTask == null) {
            return ResponseEntity.notFound().build();
        }

        String taskId = existingTask.getTaskId();

        if (taskPatch.getTitle() != null) {
            Logger.log.info("Updating task title (id={}, newTitle={})", taskId, taskPatch.getTitle());
            existingTask.setTitle(taskPatch.getTitle());
        }

        if (taskPatch.getDescription() != null) {
            Logger.log.info("Updating task description (id={}, newDescription={})", taskId, taskPatch.getDescription());
            existingTask.setDescription(taskPatch.getDescription());
        }

        if (taskPatch.getPriority() != null) {
            Logger.log.info("Updating task priority (id={}, newPriority={})", taskId, taskPatch.getPriority());
            existingTask.setPriority(taskPatch.getPriority());
        }

        if (taskPatch.getDueDate() != null) {
            Logger.log.info("Updating task dueDate (id={}, newDueDate={})", taskId, taskPatch.getDueDate());
            existingTask.setDueDate(taskPatch.getDueDate());
        }

        if (taskPatch.getAssignedToUserId() != null) {
            Logger.log.info("Updating task assignedToUserId (id={}, newAssignedToUserId={})", taskId,
                    taskPatch.getAssignedToUserId());
            existingTask.setAssignedToUserId(taskPatch.getAssignedToUserId());
        }


        existingTask.setUpdatedAtToNow();

        Logger.log.info("Updating task with id={} to the database", taskPatch.getTaskId());
        taskRepo.save(existingTask);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/task/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable String taskId) {
        Task existingTask = taskRepo.findById(taskId).orElse(null);
        if (existingTask == null) {
            return ResponseEntity.notFound().build();
        }
        taskRepo.delete(existingTask);
        return ResponseEntity.ok().build();
    }
    
}