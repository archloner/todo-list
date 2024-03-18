package tdsm.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@AllArgsConstructor
@Document
public class Task {

    public Task(String title, String description, TaskPriority priority, Date dueDate, Long ownerUserId, Long assignedToUserId) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.ownerUserId = ownerUserId;
        this.assignedToUserId = assignedToUserId;
        this.completionState = false;
        this.setCreatedAtToNow();
        this.setUpdatedAtToNow();
    }

    @Id
    private String taskId;
    private boolean completionState;
    private String title;
    private String description;
    private TaskPriority priority;

    private Date dueDate;
    private Date createdAt;
    private Date updatedAt;
    private Long ownerUserId;
    private Long assignedToUserId;

    private String projectId;

    public void setCreatedAtToNow() {
        this.createdAt = new Date();
    }

    public void setUpdatedAtToNow() {
        this.updatedAt = new Date();
    }

    public boolean isCompleted() {
        return this.completionState;
    }

    public void setCompleted(boolean b) {
        this.completionState = b;
    }

}
