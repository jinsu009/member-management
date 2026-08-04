import { CalendarDays, ChevronDown, ClipboardCheck } from "lucide-react";

import "@/assets/css/Main.css";

interface TodoItem {
  id: number;
  title: string;
  time: string;
  completed: boolean;
}

const todoList: TodoItem[] = [
  {
    id: 1,
    title: "프로젝트 기획안 작성",
    time: "09:00",
    completed: false,
  },
  {
    id: 2,
    title: "UI 디자인 시안 검토",
    time: "11:00",
    completed: false,
  },
  {
    id: 3,
    title: "팀 미팅",
    time: "14:00",
    completed: false,
  },
  {
    id: 4,
    title: "개발 일정 정리",
    time: "17:00",
    completed: false,
  },
];

function Main() {
  return (
    <main className="main-page">
      <section className="main-content">
        <div className="main-summary-grid">
          <article className="summary-card">
            <h2 className="summary-card-title">전체 투두</h2>

            <div className="summary-card-content">
              <div className="summary-icon-circle">
                <ClipboardCheck size={74} strokeWidth={1.6} />
              </div>

              <div className="summary-number">
                <strong>12</strong>
                <span>개</span>
              </div>

              <p>전체 등록된 투두 수</p>
            </div>
          </article>

          <article className="summary-card">
            <h2 className="summary-card-title">달력</h2>

            <div className="summary-card-content">
              <div className="summary-icon-circle">
                <CalendarDays size={72} strokeWidth={1.6} />
              </div>

              <button className="calendar-button" type="button">
                달력 보기
              </button>
            </div>
          </article>
        </div>

        <section className="today-card">
          <h2 className="today-card-title">Today TodoList</h2>

          <ul className="today-list">
            {todoList.map((todo) => (
              <li className="today-list-item" key={todo.id}>
                <div className="today-list-content">
                  <input
                    id={`todo-${todo.id}`}
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                  />

                  <label htmlFor={`todo-${todo.id}`}>{todo.title}</label>
                </div>

                <time>{todo.time}</time>
              </li>
            ))}
          </ul>

          <button className="today-more-button" type="button">
            <span>더보기</span>
            <ChevronDown size={20} aria-hidden="true" />
          </button>
        </section>
      </section>
    </main>
  );
}

export default Main;
