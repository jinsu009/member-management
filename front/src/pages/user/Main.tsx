import { CheckCircle2, Plus } from "lucide-react";
import { useState } from "react";

import "./Main.css";

interface TodoItem {
  id: number;
  title: string;
  time: string;
  completed: boolean;
  type: "WORK" | "STUDY" | "HOUSE";
}

interface TodoType {
  type: TodoItem["type"];
  label: string;
}

const todoTypes: TodoType[] = [
  { type: "WORK", label: "업무" },
  { type: "STUDY", label: "공부" },
  { type: "HOUSE", label: "집안일" },
];

const initialTodoList: TodoItem[] = [
  {
    id: 1,
    title: "프로젝트 기획안 작성",
    time: "09:00",
    completed: true,
    type: "WORK",
  },
  {
    id: 2,
    title: "UI 디자인 시안 검토",
    time: "11:00",
    completed: false,
    type: "WORK",
  },
  {
    id: 3,
    title: "React Router 공부",
    time: "19:00",
    completed: true,
    type: "STUDY",
  },
  {
    id: 4,
    title: "Spring Security 정리",
    time: "21:00",
    completed: false,
    type: "STUDY",
  },
  {
    id: 5,
    title: "빨래하기",
    time: "20:00",
    completed: true,
    type: "HOUSE",
  },
];

function Main() {
  const [todoList, setTodoList] = useState<TodoItem[]>(initialTodoList);

  // 현재 Todo 추가 중인 카테고리
  const [addingType, setAddingType] = useState<TodoItem["type"] | null>(null);

  // 새 Todo 입력값
  const [newTodoTitle, setNewTodoTitle] = useState("");

  // 카테고리별 완료 항목 숨김 여부
  const [hideCompleted, setHideCompleted] = useState({
    WORK: false,
    STUDY: false,
    HOUSE: false,
  });

  // Todo 입력창 열기
  const openAddTodo = (type: TodoItem["type"]) => {
    setAddingType(type);
    setNewTodoTitle("");
  };

  // Todo 입력 취소
  const cancelAddTodo = () => {
    setAddingType(null);
    setNewTodoTitle("");
  };

  // Todo 저장
  const saveTodo = (type: TodoItem["type"]) => {
    if (!newTodoTitle.trim()) {
      alert("할 일을 입력해주세요.");
      return;
    }

    const newTodo: TodoItem = {
      id: Date.now(),
      title: newTodoTitle.trim(),
      time: "",
      completed: false,
      type,
    };

    setTodoList((prev) => [...prev, newTodo]);

    setNewTodoTitle("");
    setAddingType(null);
  };

  return (
    <main className="main-page">
      <section className="main-content">
        <section className="todo-type-section">
          {todoTypes.map((todoType) => {
            // 해당 카테고리 전체 Todo
            const typeTodoList = todoList.filter(
              (todo) => todo.type === todoType.type,
            );

            // 완료 Todo 개수
            const completedCount = typeTodoList.filter(
              (todo) => todo.completed,
            ).length;

            // 실제 화면에 보여줄 목록
            const filteredTodoList = hideCompleted[todoType.type]
              ? typeTodoList.filter((todo) => !todo.completed)
              : typeTodoList;

            return (
              <article className="todo-type-card" key={todoType.type}>
                {/* Header */}
                <div className="todo-type-card__header">
                  <div className="todo-type-card__title">
                    <CheckCircle2
                      size={21}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />

                    <h2>{todoType.label}</h2>
                  </div>

                  <div className="todo-type-card__header-right">
                    <label className="todo-filter__label">
                      <input
                        type="checkbox"
                        checked={hideCompleted[todoType.type]}
                        onChange={(e) =>
                          setHideCompleted((prev) => ({
                            ...prev,
                            [todoType.type]: e.target.checked,
                          }))
                        }
                      />

                      <span>완료 숨김</span>
                    </label>

                    <div className="todo-type-card__count">
                      <strong>{completedCount}</strong>
                      <span>/</span>
                      <span>{typeTodoList.length}</span>
                    </div>
                  </div>
                </div>

                {/* Todo 목록 */}
                <ul className="todo-type-list">
                  {filteredTodoList.map((todo) => (
                    <li className="todo-type-list__item" key={todo.id}>
                      <div className="todo-type-list__content">
                        <input
                          id={`todo-${todo.id}`}
                          type="checkbox"
                          checked={todo.completed}
                          readOnly
                        />

                        <label htmlFor={`todo-${todo.id}`}>{todo.title}</label>
                      </div>

                      {todo.time && <time>{todo.time}</time>}
                    </li>
                  ))}

                  {filteredTodoList.length === 0 && (
                    <li className="todo-type-list__empty">
                      {typeTodoList.length > 0
                        ? "진행 중인 할 일이 없습니다."
                        : "등록된 할 일이 없습니다."}
                    </li>
                  )}
                </ul>

                {/* Todo 입력 영역 */}
                {addingType === todoType.type && (
                  <div className="todo-add-area">
                    <input
                      type="text"
                      className="todo-add-input"
                      value={newTodoTitle}
                      placeholder="할 일을 입력해주세요."
                      onChange={(e) => setNewTodoTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveTodo(todoType.type);
                        }
                      }}
                      autoFocus
                    />

                    <div className="todo-add-actions">
                      <button
                        type="button"
                        className="todo-add-cancel"
                        onClick={cancelAddTodo}
                      >
                        취소
                      </button>

                      <button
                        type="button"
                        className="todo-add-save"
                        onClick={() => saveTodo(todoType.type)}
                      >
                        저장
                      </button>
                    </div>
                  </div>
                )}

                {/* Todo 추가 버튼 */}
                {addingType !== todoType.type && (
                  <button
                    type="button"
                    className="todo-add-button"
                    onClick={() => openAddTodo(todoType.type)}
                    aria-label={`${todoType.label} 할 일 추가`}
                  >
                    <Plus size={21} />
                  </button>
                )}
              </article>
            );
          })}

          {/* 추후 Todo 등록 / Category 추가 */}
          <article className="todo-type-card todo-type-card--add">
            <button
              type="button"
              className="todo-category-add-button"
              aria-label="Todo 또는 카테고리 추가"
            >
              <Plus size={38} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </article>
        </section>
      </section>
    </main>
  );
}

export default Main;
