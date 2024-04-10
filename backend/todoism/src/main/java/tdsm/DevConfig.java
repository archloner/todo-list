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
import java.util.UUID;

@Configuration
public class DevConfig {

    @Slf4j
    public static class Logger {}

    @Bean
    public CommandLineRunner dataLoader(TaskRepository taskRepo, ProjectRepository projectRepo) {
        return args -> {
            Task taskOne = new Task("First test task", "This is first task persisted to Mongo Database",
                    TaskPriority.DEFAULT_PRIORITY, new Date(2024, Calendar.MAY, 20), "1");

            Task taskTwo = new Task("Second test task", "This is SECOND task persisted to Mongo Database during application startup",
                    TaskPriority.HIGH_PRIORITY, new Date(2024, Calendar.MAY, 20), "1");

            Task taskThree = new Task("Third task", "Third task persisted to MongoDB at application startup",
                    TaskPriority.LOW_PRIORITY, new Date(2024, Calendar.MAY, 19), "1");

            Project projectOne = new Project("Test Project", "This is first test project");

            projectOne.addTask(taskOne);
            projectOne.addTask(taskTwo);
            projectOne.addTask(taskThree);

//            Logger.log.info(UUID.randomUUID().toString().substring(0, 8));
//
//            Project proj = projectRepo.findById("66142b5182663e741c8dfec2").orElse(null);
//            proj.addTask(taskOne);
//            proj.addTask(taskTwo);
//            proj.addTask(taskThree);
//            for (Task task : proj.getTaskList()) {
//                task.regenerateId();
//            }
//            projectRepo.save(proj);

//            Logger.log.info("Saving tasks to the database");
//            taskRepo.saveAll(List.of(taskOne, taskTwo, taskThree));
//            Logger.log.info("Saving project to the database");
//            projectRepo.save(projectOne);
        };
    }

}
