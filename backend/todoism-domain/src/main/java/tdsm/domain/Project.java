package tdsm.domain;

import jakarta.annotation.Generated;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@RequiredArgsConstructor
@Document
public class Project {

    public Project(String name, String description) {
        this.name = name;
        this.description = description;
        this.taskList = new ArrayList<>();
        this.createdAt = new Date();
    }

    @Id
    private String projectId;

    private String name;
    private String description;

    private List<Task> taskList;

    @CreatedDate
    private Date createdAt;

    public void addTask(Task task) {
        this.taskList.add(task);
    }

    public boolean removeTask(Task task) {
        return this.taskList.remove(task);
    }

//    private TodoUser ownerUser;

}
