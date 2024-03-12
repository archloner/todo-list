package tdsm.domain;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@RequiredArgsConstructor
@Document
public class Project {

    @Id
    private Long projectId;

    private String name;
    private String description;

    private List<Task> taskList;

    @CreatedDate
    private Date createdAt;

//    private TodoUser ownerUser;

}
