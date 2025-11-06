package estudos.todo_list_api.repository;

import estudos.todo_list_api.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository <Task, Long> {
    @Query(value = "SELECT * FROM todo WHERE type_id = :typeId", nativeQuery = true)
    List<Task> findByTypeId(Long typeId);
}
