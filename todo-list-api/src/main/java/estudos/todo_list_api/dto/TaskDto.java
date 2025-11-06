package estudos.todo_list_api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class TaskDto {
    private Long id;
    private Long typeId;
    private String name;
    private String description;
}
