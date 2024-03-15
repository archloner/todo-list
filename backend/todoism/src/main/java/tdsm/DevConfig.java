package tdsm;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tdsm.domain.Project;
import tdsm.domain.Task;
import tdsm.domain.TaskPriority;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Configuration
public class DevConfig {

    @Slf4j
    public static class TodoismLogger {}

    @Bean
    public CommandLineRunner dataLoader(TaskRepository taskRepo, ProjectRepository projectRepo) {
        return (args) -> {
            Task taskOne = new Task("First test task", "This is first task persisted to Mongo Database",
                    TaskPriority.DEFAULT_PRIORITY, new Date(2024, Calendar.MAY, 20), 1L, 1L);

            Task taskTwo = new Task("Second test task", "This is SECOND task persisted to Mongo Database during application startup",
                    TaskPriority.HIGHT_PRIORITY, new Date(2024, Calendar.MAY, 20),1L, 1L);

            Task taskThree = new Task("Third task", "Third task persisted to MongoDB at application startup",
                    TaskPriority.LOW_PRIORITY, new Date(2024, Calendar.MAY, 19), 1L, 1L);

            Project projectOne = new Project("Test Project", "This is first test project");

            projectOne.addTask(taskOne);
            projectOne.addTask(taskTwo);
            projectOne.addTask(taskThree);

//            TodoismLogger.log.info("Saving tasks to the database");
//            taskRepo.saveAll(List.of(taskOne, taskTwo, taskThree));
//            TodoismLogger.log.info("Saving project to the database");
//            projectRepo.save(projectOne);
        };
    }

}
