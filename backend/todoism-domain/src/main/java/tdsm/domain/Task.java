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


    @Id
    private Long taskId;
    private boolean completionState;
    private String title;
    private String description;

    private TaskPriority priority;

    private Date dueDate;
    private Date createdAt;
    private Long ownerUserId;
    private Long assignedToUserId;

    private void createdAt() {
        this.createdAt = new Date();
    }

}
