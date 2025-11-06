package estudos.todo_list_api.facade;
import estudos.todo_list_api.dto.TaskDto;
import estudos.todo_list_api.entity.Task;
import estudos.todo_list_api.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskFacade {
    @Autowired
    private TaskRepository repository;

    public TaskDto create (TaskDto taskDto) {
        Task task = new Task();
        task.setTypeId(taskDto.getTypeId());
        task.setDescription(taskDto.getDescription());
        task.setName(taskDto.getName());
        repository.save(task);
        taskDto.setId(task.getId());
        return taskDto;
    }

    public TaskDto update (TaskDto taskDto, Long taskId) {
        Task todoTask = repository.findById(taskId).orElseThrow(RuntimeException::new);
        todoTask.setTypeId(taskDto.getTypeId());
        todoTask.setName(taskDto.getName());
        todoTask.setDescription(taskDto.getDescription());
        taskDto.setId(todoTask.getId());
        repository.save(todoTask);
        return taskDto;
    }

    public TaskDto converter (Task task) {
        TaskDto result = new TaskDto();
        result.setId(task.getId());
        result.setTypeId(task.getTypeId());
        result.setName(task.getName());
        result.setDescription(task.getDescription());
        return result;
    }

    public List<TaskDto> getAll () {
        return repository
                .findAll()
                .stream()
                .map(this::converter).collect(Collectors.toList());
    }

    public List <TaskDto> getByType(Long typeId) {
        return repository
                .findByTypeId(typeId)
                .stream()
                .map(this::converter)
                .collect(Collectors.toList());

    }

    public String delete (Long taskId) {
        repository.deleteById(taskId);
        return "DELETED";
    }
}
