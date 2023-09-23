package archloner.todo.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@AllArgsConstructor
@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long taskId;
    private boolean completionState;
    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private TaskPriority priority;

    private Date dueDate;
    private Date createdAt;
    private Long ownerUserId;
    private Long assignedToUserId;

    @PrePersist
    private void createdAt() {
        this.createdAt = new Date();
    }

}
