package estudos.todo_list_api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskDto {
    private Long id;
    private Long typeId;
    private String name;
    private String description;
}
