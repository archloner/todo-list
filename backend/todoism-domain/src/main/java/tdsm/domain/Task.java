package tdsm.domain;

import lombok.*;
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
        this.createdAt = new Date();
        this.completionState = false;
    }

    @Id
    private String taskId;
    private boolean completionState;
    private String title;
    private String description;

    private TaskPriority priority;

    private Date dueDate;
    private Date createdAt;
    private Long ownerUserId;
    private Long assignedToUserId;

    private void setCreatedAtToNow() {
        this.createdAt = new Date();
    }

}
