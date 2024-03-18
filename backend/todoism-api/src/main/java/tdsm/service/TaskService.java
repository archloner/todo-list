package tdsm.service;

import org.springframework.stereotype.Service;
import tdsm.TaskRepository;
import tdsm.domain.Task;

@Service
public class TaskService {

    private TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public void deleteTasks(Iterable<Task> tasks) {
        for (Task task : tasks) {
            taskRepository.delete(task);
        }
    }

}
