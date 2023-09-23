package archloner.todo;

import archloner.todo.data.ProjectRepository;
import archloner.todo.data.TaskRepository;
import archloner.todo.data.UserRepository;
import archloner.todo.model.Task;
import archloner.todo.model.TaskPriority;
import archloner.todo.model.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;

@SpringBootApplication
public class TodoApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
	}

	@Bean
	public CommandLineRunner dataLoader(TaskRepository taskRepo, UserRepository userRepo, PasswordEncoder passwordEncoder,
										ProjectRepository projectRepo) {
		return args -> {

			User admin = new User(0L, "admin", "John", "Lennon",
					passwordEncoder.encode("beatle"), "john@applecorp.com", new Date());

			userRepo.save(admin);

			taskRepo.save(new Task(0L, false, "First task",
					"Most important task to complete at the moment, THE first task on this task list",
					TaskPriority.DEFAULT_PRIORITY, new Date(), new Date(),
					admin.getUserId(), admin.getUserId()));
		};
	}

}
