package estudos.todo_list_api.controller;
import estudos.todo_list_api.dto.TaskDto;
import estudos.todo_list_api.service.TaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/todo", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
public class TodoListController {

    private final TaskService taskService;

    public TodoListController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<TaskDto> create (@RequestBody TaskDto taskDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(taskService.create(taskDto));
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<TaskDto> update (@PathVariable("taskId") Long taskId, @RequestBody TaskDto taskDto) {
        return ResponseEntity.ok(taskService.update(taskDto, taskId));
    }

    @GetMapping
    public ResponseEntity <List<TaskDto>> getAll() {
        return ResponseEntity.ok(taskService.getAll());
    }

    @GetMapping("/by-type/{typeId}")
    public ResponseEntity <List<TaskDto>> getByTypeId (@PathVariable("typeId") Long typeId) {
        return ResponseEntity.ok(taskService.getByType(typeId));
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity <Void> delete (@PathVariable("taskId") Long taskId) {
        taskService.delete(taskId);
        return ResponseEntity.noContent().build();
    }
}
