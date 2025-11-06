package estudos.todo_list_api.service;
import estudos.todo_list_api.dto.TaskDto;
import estudos.todo_list_api.entity.Task;
import estudos.todo_list_api.repository.TaskRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public TaskDto create (TaskDto taskDto) {
        Task task = Task.builder()
                .typeId(taskDto.getTypeId())
                .description(taskDto.getDescription())
                .name(taskDto.getName())
                .build();
        repository.save(task);
        taskDto.setId(task.getId());
        return taskDto;
    }

    public TaskDto update (TaskDto taskDto, Long taskId) {
        Task task = repository.findById(taskId).orElseThrow(RuntimeException::new);
        task.setTypeId(taskDto.getTypeId());
        task.setName(taskDto.getName());
        task.setDescription(taskDto.getDescription());
        taskDto.setId(task.getId());

        repository.save(task);
        return taskDto;
    }

    public TaskDto converter (Task task) {
        return TaskDto.builder()
                .id(task.getId())
                .typeId(task.getTypeId())
                .name(task.getName())
                .description(task.getDescription())
                .build();
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
                .toList();
    }

    public void delete (Long taskId) {
        repository.deleteById(taskId);
    }
}
