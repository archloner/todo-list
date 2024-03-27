package tdsm.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@AllArgsConstructor
public class TaskDTO {
    private String taskId;
    private boolean completionState;
    private String title;
    private String description;
    private TaskPriority priority;

    private Date dueDate;
    private String assignedToUserId;
}
