package tdsm.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@AllArgsConstructor
@Document
public class Task {

    public Task(String title, String description, TaskPriority priority, Date dueDate, String assignedToUserId) {
        this.taskId = UUID.randomUUID().toString().substring(0, 8);
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.assignedToUserId = assignedToUserId;
        this.completed = false;
        this.setCreatedAtToNow();
        this.setUpdatedAtToNow();
    }

    @Id
    private String taskId;

    private boolean completed;
    private String title;
    private String description;
    private TaskPriority priority;

    private Date dueDate;
    private Date createdAt;
    private Date updatedAt;
    private String assignedToUserId;

    public void setCreatedAtToNow() {
        this.createdAt = new Date();
    }

    public void setUpdatedAtToNow() {
        this.updatedAt = new Date();
    }

    public void regenerateId() {
        this.taskId = UUID.randomUUID().toString().substring(0, 8);
        this.setUpdatedAtToNow();
    }

    public boolean toggleCompleted() {
        this.completed = !this.completed;
        this.setUpdatedAtToNow();
        return this.completed;
    }

}
