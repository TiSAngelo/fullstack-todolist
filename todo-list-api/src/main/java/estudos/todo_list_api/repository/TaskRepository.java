package estudos.todo_list_api.repository;

import estudos.todo_list_api.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository <Task, Long> {
    List<Task> findByTypeId(Long typeId);
}
