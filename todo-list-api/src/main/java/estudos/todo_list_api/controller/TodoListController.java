package estudos.todo_list_api.controller;
import estudos.todo_list_api.dto.TaskDto;
import estudos.todo_list_api.facade.TaskFacade;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/todo", produces = MediaType.APPLICATION_JSON_VALUE)
@Slf4j
public class TodoListController {
    @Autowired
    private TaskFacade taskFacade;

    @PostMapping
    @ResponseBody
    public TaskDto create (@RequestBody TaskDto taskDto) {
        return taskFacade.create(taskDto);
    }

    @PutMapping("/{taskId}")
    @ResponseBody
    public TaskDto update (@PathVariable("taskId") Long taskId, @RequestBody TaskDto taskDto) {
        return taskFacade.update(taskDto, taskId);
    }

    @GetMapping
    @ResponseBody
    public List<TaskDto> getAll() {
        return taskFacade.getAll();
    }

    @GetMapping("/by-type/{typeId}")
    @ResponseBody
    public List<TaskDto> getByTypeId (@PathVariable("typeId") Long typeId) {
        return taskFacade.getByType(typeId);
    }

    @DeleteMapping("/{taskId}")
    @ResponseBody
    public String delete (@PathVariable("taskId") Long taskId) {
        return taskFacade.delete(taskId);
    }
}
