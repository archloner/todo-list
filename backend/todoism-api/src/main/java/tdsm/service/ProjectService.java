package tdsm.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tdsm.ProjectRepository;
import tdsm.domain.Project;

@Service
public class ProjectService {

    @Slf4j
    private static class Logger {}

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    ProjectRepository projectRepository;

    public Project completeAllTasks(String projectId) {
        Project project = projectRepository.findById(projectId).orElse(null);
        if (project == null) {
            throw new IllegalArgumentException("Project not found: " + projectId);
        }
        Logger.log.info("Setting all tasks as completed in project with id {}", project.getProjectId());
        project.getTaskList()
                .forEach(task -> {
                    task.setCompleted(true);
                    task.setUpdatedAtToNow();
                });
        project.setUpdatedAtToNow();
        projectRepository.save(project);
        return project;
    }

    public void deleteAllTasks(String projectId) {
        Project project = projectRepository.findById(projectId).orElse(null);
        if (project == null) {
            throw new IllegalArgumentException("Project not found: " + projectId);
        }
        Logger.log.warn("Removing all tasks from project with id {}", project.getProjectId());
        project.getTaskList().removeAll(project.getTaskList());

        project.setUpdatedAtToNow();
        projectRepository.save(project);
    }

}
